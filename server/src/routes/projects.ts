import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

interface Project {
  id: string;
  name: string;
  description?: string;
  data: any;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  collaborators: string[];
}

const projects: Map<string, Project> = new Map();

router.post('/', (req: Request, res: Response) => {
  try {
    const { name, description, data, ownerId } = req.body;
    
    const project: Project = {
      id: uuidv4(),
      name,
      description,
      data,
      ownerId,
      collaborators: [ownerId],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    projects.set(project.id, project);
    
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create project' });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  const project = projects.get(req.params.id);
  
  if (!project) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }
  
  res.json({ success: true, data: project });
});

router.put('/:id', (req: Request, res: Response) => {
  const project = projects.get(req.params.id);
  
  if (!project) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  const { name, description, data } = req.body;
  
  if (name) project.name = name;
  if (description !== undefined) project.description = description;
  if (data) project.data = data;
  project.updatedAt = new Date().toISOString();

  res.json({ success: true, data: project });
});

router.delete('/:id', (req: Request, res: Response) => {
  const deleted = projects.delete(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }
  
  res.json({ success: true, message: 'Project deleted' });
});

router.get('/', (req: Request, res: Response) => {
  const allProjects = Array.from(projects.values());
  res.json({ success: true, data: allProjects });
});

router.post('/:id/collaborators', (req: Request, res: Response) => {
  const project = projects.get(req.params.id);
  
  if (!project) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  const { userId } = req.body;
  
  if (!project.collaborators.includes(userId)) {
    project.collaborators.push(userId);
    project.updatedAt = new Date().toISOString();
  }
  
  res.json({ success: true, data: project });
});

router.delete('/:id/collaborators/:userId', (req: Request, res: Response) => {
  const project = projects.get(req.params.id);
  
  if (!project) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  project.collaborators = project.collaborators.filter(id => id !== req.params.userId);
  project.updatedAt = new Date().toISOString();
  
  res.json({ success: true, data: project });
});

export { router as projectRoutes };
