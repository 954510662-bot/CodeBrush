import { Router } from 'express';
import { projectRoutes } from './projects';
import { fileRoutes } from './files';
import { pluginRoutes } from './plugins';

const router = Router();

router.use('/projects', projectRoutes);
router.use('/files', fileRoutes);
router.use('/plugins', pluginRoutes);

export { router as apiRouter };
