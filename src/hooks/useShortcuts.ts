import { useEffect, useCallback, useState } from 'react'
import { Shortcut, defaultShortcuts } from '../types/shortcuts'
import { ToolType } from '../types'

interface ShortcutActions {
  onUndo: () => void
  onRedo: () => void
  onDelete: () => void
  onGroup: () => void
  onUngroup: () => void
  onDuplicate: () => void
  onSelectTool: (tool: ToolType) => void
  onSelectAll: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomReset: () => void
  onCancel: () => void
}

export function useShortcuts(actions: ShortcutActions) {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(() => {
    const saved = localStorage.getItem('codebrush-shortcuts')
    return saved ? JSON.parse(saved) : defaultShortcuts
  })

  const saveShortcuts = useCallback((newShortcuts: Shortcut[]) => {
    setShortcuts(newShortcuts)
    localStorage.setItem('codebrush-shortcuts', JSON.stringify(newShortcuts))
  }, [])

  const updateShortcut = useCallback((shortcutId: string, newKeys: string[]) => {
    setShortcuts(prev => {
      const updated = prev.map(s => 
        s.id === shortcutId ? { ...s, keys: newKeys } : s
      )
      localStorage.setItem('codebrush-shortcuts', JSON.stringify(updated))
      return updated
    })
  }, [])

  const resetShortcuts = useCallback(() => {
    setShortcuts(defaultShortcuts)
    localStorage.setItem('codebrush-shortcuts', JSON.stringify(defaultShortcuts))
  }, [])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const activeElement = document.activeElement
    if (activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA') {
      return
    }

    const pressedKeys: string[] = []
    if (event.ctrlKey || event.metaKey) pressedKeys.push('ctrl')
    if (event.shiftKey) pressedKeys.push('shift')
    if (event.altKey) pressedKeys.push('alt')
    
    const key = event.key.toLowerCase()
    const keyMap: Record<string, string> = {
      ' ': 'space',
      'delete': 'delete',
      'backspace': 'backspace',
      'escape': 'escape',
      'enter': 'enter',
      'tab': 'tab',
      'arrowup': 'arrow-up',
      'arrowdown': 'arrow-down',
      'arrowleft': 'arrow-left',
      'arrowright': 'arrow-right'
    }
    pressedKeys.push(keyMap[key] || key)

    const matchingShortcut = shortcuts.find(s => {
      if (s.keys.length !== pressedKeys.length) return false
      return s.keys.every(k => pressedKeys.includes(k))
    })

    if (matchingShortcut) {
      event.preventDefault()
      
      switch (matchingShortcut.action) {
        case 'undo':
          actions.onUndo()
          break
        case 'redo':
          actions.onRedo()
          break
        case 'delete':
          actions.onDelete()
          break
        case 'group':
          actions.onGroup()
          break
        case 'ungroup':
          actions.onUngroup()
          break
        case 'duplicate':
          actions.onDuplicate()
          break
        case 'select-all':
          actions.onSelectAll()
          break
        case 'zoom-in':
          actions.onZoomIn()
          break
        case 'zoom-out':
          actions.onZoomOut()
          break
        case 'zoom-100':
          actions.onZoomReset()
          break
        case 'escape':
          actions.onCancel()
          break
        case 'tool-select':
          actions.onSelectTool('select')
          break
        case 'tool-rectangle':
          actions.onSelectTool('rectangle')
          break
        case 'tool-ellipse':
          actions.onSelectTool('ellipse')
          break
        case 'tool-text':
          actions.onSelectTool('text')
          break
        case 'tool-pen':
          actions.onSelectTool('pen')
          break
        case 'tool-hand':
          actions.onSelectTool('hand')
          break
      }
    }
  }, [shortcuts, actions])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return {
    shortcuts,
    saveShortcuts,
    updateShortcut,
    resetShortcuts
  }
}