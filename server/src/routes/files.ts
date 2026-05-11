import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import { logger } from '../utils/logger';

const router = Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
}

const files: Map<string, UploadedFile> = new Map();

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const fileId = uuidv4();
    const ext = path.extname(req.file.originalname);
    const key = `uploads/${fileId}${ext}`;

    if (process.env.AWS_BUCKET) {
      const result = await s3.upload({
        Bucket: process.env.AWS_BUCKET,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      }).promise();

      const file: UploadedFile = {
        id: fileId,
        filename: key,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: result.Location,
        uploadedAt: new Date().toISOString()
      };

      files.set(fileId, file);
      logger.info(`File uploaded to S3: ${file.originalName}`);
      
      return res.json({ success: true, data: file });
    } else {
      const localUrl = `/api/files/${fileId}`;
      
      const file: UploadedFile = {
        id: fileId,
        filename: key,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: localUrl,
        uploadedAt: new Date().toISOString()
      };

      files.set(fileId, file);
      logger.info(`File stored locally: ${file.originalName}`);
      
      return res.json({ success: true, data: file });
    }
  } catch (error) {
    logger.error('Upload error:', error);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  const file = files.get(req.params.id);
  
  if (!file) {
    return res.status(404).json({ success: false, error: 'File not found' });
  }
  
  res.json({ success: true, data: file });
});

router.delete('/:id', async (req: Request, res: Response) => {
  const file = files.get(req.params.id);
  
  if (!file) {
    return res.status(404).json({ success: false, error: 'File not found' });
  }

  if (process.env.AWS_BUCKET) {
    try {
      await s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: file.filename
      }).promise();
      
      logger.info(`File deleted from S3: ${file.originalName}`);
    } catch (error) {
      logger.error('S3 delete error:', error);
    }
  }

  files.delete(req.params.id);
  
  res.json({ success: true, message: 'File deleted' });
});

router.get('/', (req: Request, res: Response) => {
  const allFiles = Array.from(files.values());
  res.json({ success: true, data: allFiles });
});

export { router as fileRoutes };
