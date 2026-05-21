import { describe, it, expect, beforeEach } from 'vitest'
import { useStore } from '../store'

describe('Editor Store', () => {
  beforeEach(() => {
    const store = useStore.getState()
    store.projects.forEach(p => {
      if (p.id) {
        useStore.setState({
          projects: store.projects.filter(proj => proj.id !== p.id),
          currentProjectId: null
        })
      }
    })
  })

  describe('Project Management', () => {
    it('should create a new project', () => {
      const { createProject, projects } = useStore.getState()
      
      createProject('New Project')
      
      const updatedProjects = useStore.getState().projects
      expect(updatedProjects.length).toBe(projects.length + 1)
      expect(updatedProjects[updatedProjects.length - 1].name).toBe('New Project')
    })

    it('should set current project after creation', () => {
      const { createProject } = useStore.getState()
      
      createProject('Test Project')
      
      const state = useStore.getState()
      expect(state.currentProjectId).not.toBeNull()
      expect(state.currentProjectId).toBe(state.projects[state.projects.length - 1]?.id)
    })
  })

  describe('Tool Selection', () => {
    it('should change current tool', () => {
      const { selectTool } = useStore.getState()
      
      selectTool('rectangle')
      
      expect(useStore.getState().currentTool).toBe('rectangle')
    })

    it('should support all tool types', () => {
      const tools = ['select', 'rectangle', 'ellipse', 'polygon', 'line', 'pen', 'text', 'frame', 'hand', 'zoom'] as const
      const { selectTool } = useStore.getState()
      
      tools.forEach(tool => {
        selectTool(tool)
        expect(useStore.getState().currentTool).toBe(tool)
      })
    })
  })

  describe('Layer Operations', () => {
    it('should add a layer to project', () => {
      const { createProject, addLayer } = useStore.getState()
      createProject('Layer Test')
      const projectId = useStore.getState().projects[0].id
      
      const layer = {
        id: 'new-layer',
        type: 'rectangle' as const,
        name: 'Test Layer',
        parentId: null,
        children: [],
        transform: { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, skewX: 0, skewY: 0 },
        style: { fills: [], strokes: [], effects: [] },
        locked: false,
        visible: true,
        opacity: 1,
        blendMode: 'normal' as const,
        metadata: { width: 100, height: 100 }
      }
      
      addLayer(projectId, layer)
      
      const updatedProject = useStore.getState().projects.find(p => p.id === projectId)
      expect(updatedProject?.layers.length).toBeGreaterThan(0)
    })
  })

  describe('History', () => {
    it('should initialize with empty history', () => {
      const { history, historyIndex } = useStore.getState()
      
      expect(history).toEqual([])
      expect(historyIndex).toBe(-1)
    })

    it('should track actions after layer creation', () => {
      const { createProject, addLayer } = useStore.getState()
      createProject('History Test')
      const projectId = useStore.getState().projects[0].id
      
      const layer = {
        id: 'history-layer',
        type: 'rectangle' as const,
        name: 'History Layer',
        parentId: null,
        children: [],
        transform: { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, skewX: 0, skewY: 0 },
        style: { fills: [], strokes: [], effects: [] },
        locked: false,
        visible: true,
        opacity: 1,
        blendMode: 'normal' as const,
        metadata: {}
      }
      
      addLayer(projectId, layer)
      
      const state = useStore.getState()
      expect(state.history.length).toBeGreaterThan(0)
      expect(state.historyIndex).toBe(0)
    })
  })
})
