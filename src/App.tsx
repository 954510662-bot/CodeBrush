import { useStore } from './store'
import Editor from './components/Editor'
import Toolbar from './components/Toolbar'
import LayersPanel from './components/LayersPanel'
import PropertiesPanel from './components/PropertiesPanel'
import { useShortcuts } from './hooks/useShortcuts'

function App() {
  const { 
    undo, 
    redo, 
    deleteLayer, 
    groupLayers, 
    ungroupLayer, 
    duplicateLayer,
    selectTool,
    selectLayers,
    currentProjectId,
    projects,
    updateViewport
  } = useStore()

  const handleDelete = () => {
    if (!currentProjectId) return
    const project = projects.find(p => p.id === currentProjectId)
    if (project?.selectedLayerIds.length) {
      project.selectedLayerIds.forEach(id => deleteLayer(currentProjectId!, id))
    }
  }

  const handleGroup = () => {
    if (!currentProjectId) return
    const project = projects.find(p => p.id === currentProjectId)
    if (project && project.selectedLayerIds.length > 1) {
      groupLayers(currentProjectId, project.selectedLayerIds)
    }
  }

  const handleUngroup = () => {
    if (!currentProjectId) return
    const project = projects.find(p => p.id === currentProjectId)
    if (project?.selectedLayerIds.length === 1) {
      ungroupLayer(currentProjectId, project.selectedLayerIds[0])
    }
  }

  const handleDuplicate = () => {
    if (!currentProjectId) return
    const project = projects.find(p => p.id === currentProjectId)
    project?.selectedLayerIds.forEach(id => duplicateLayer(currentProjectId!, id))
  }

  const handleSelectAll = () => {
    if (!currentProjectId) return
    const project = projects.find(p => p.id === currentProjectId)
    if (project) {
      selectLayers(currentProjectId, project.layers.map(l => l.id))
    }
  }

  const handleZoomIn = () => {
    if (!currentProjectId) return
    updateViewport(currentProjectId, { 
      zoom: Math.min(3, (projects.find(p => p.id === currentProjectId)?.viewport.zoom || 1) + 0.25) 
    })
  }

  const handleZoomOut = () => {
    if (!currentProjectId) return
    updateViewport(currentProjectId, { 
      zoom: Math.max(0.25, (projects.find(p => p.id === currentProjectId)?.viewport.zoom || 1) - 0.25) 
    })
  }

  const handleZoomReset = () => {
    if (!currentProjectId) return
    updateViewport(currentProjectId, { zoom: 1 })
  }

  const handleCancel = () => {
    if (!currentProjectId) return
    selectLayers(currentProjectId, [])
  }

  useShortcuts({
    onUndo: undo,
    onRedo: redo,
    onDelete: handleDelete,
    onGroup: handleGroup,
    onUngroup: handleUngroup,
    onDuplicate: handleDuplicate,
    onSelectTool: selectTool,
    onSelectAll: handleSelectAll,
    onZoomIn: handleZoomIn,
    onZoomOut: handleZoomOut,
    onZoomReset: handleZoomReset,
    onCancel: handleCancel
  })

  return (
    <div className="flex h-screen bg-gray-100">
      <Toolbar />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <LayersPanel />
        </div>
        
        <Editor />
        
        <div className="w-72 bg-white border-l border-gray-200 flex-shrink-0">
          <PropertiesPanel />
        </div>
      </div>
    </div>
  )
}

export default App