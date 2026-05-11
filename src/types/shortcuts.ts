export interface Shortcut {
  id: string
  name: string
  description: string
  keys: string[]
  action: string
  category: ShortcutCategory
}

export type ShortcutCategory = 
  | 'edit'
  | 'view'
  | 'navigation'
  | 'file'
  | 'tools'
  | 'other'

export interface ShortcutConfig {
  shortcuts: Shortcut[]
}

export interface KeyBinding {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  meta?: boolean
}

export const defaultShortcuts: Shortcut[] = [
  {
    id: 'undo',
    name: '撤销',
    description: '撤销上一步操作',
    keys: ['ctrl', 'z'],
    action: 'undo',
    category: 'edit'
  },
  {
    id: 'redo',
    name: '重做',
    description: '重做上一步撤销的操作',
    keys: ['ctrl', 'shift', 'z'],
    action: 'redo',
    category: 'edit'
  },
  {
    id: 'cut',
    name: '剪切',
    description: '剪切选中的图层',
    keys: ['ctrl', 'x'],
    action: 'cut',
    category: 'edit'
  },
  {
    id: 'copy',
    name: '复制',
    description: '复制选中的图层',
    keys: ['ctrl', 'c'],
    action: 'copy',
    category: 'edit'
  },
  {
    id: 'paste',
    name: '粘贴',
    description: '粘贴剪贴板内容',
    keys: ['ctrl', 'v'],
    action: 'paste',
    category: 'edit'
  },
  {
    id: 'delete',
    name: '删除',
    description: '删除选中的图层',
    keys: ['delete'],
    action: 'delete',
    category: 'edit'
  },
  {
    id: 'select-all',
    name: '全选',
    description: '选中所有图层',
    keys: ['ctrl', 'a'],
    action: 'select-all',
    category: 'edit'
  },
  {
    id: 'group',
    name: '组合',
    description: '将选中的图层组合',
    keys: ['ctrl', 'g'],
    action: 'group',
    category: 'edit'
  },
  {
    id: 'ungroup',
    name: '取消组合',
    description: '取消图层组合',
    keys: ['ctrl', 'shift', 'g'],
    action: 'ungroup',
    category: 'edit'
  },
  {
    id: 'duplicate',
    name: '复制图层',
    description: '复制并粘贴选中的图层',
    keys: ['ctrl', 'd'],
    action: 'duplicate',
    category: 'edit'
  },
  {
    id: 'zoom-in',
    name: '放大',
    description: '放大视图',
    keys: ['ctrl', '+'],
    action: 'zoom-in',
    category: 'view'
  },
  {
    id: 'zoom-out',
    name: '缩小',
    description: '缩小视图',
    keys: ['ctrl', '-'],
    action: 'zoom-out',
    category: 'view'
  },
  {
    id: 'zoom-100',
    name: '100%显示',
    description: '恢复100%视图',
    keys: ['ctrl', '0'],
    action: 'zoom-100',
    category: 'view'
  },
  {
    id: 'pan',
    name: '平移',
    description: '启用平移工具',
    keys: ['space'],
    action: 'pan',
    category: 'navigation'
  },
  {
    id: 'escape',
    name: '取消选择',
    description: '取消当前选择',
    keys: ['escape'],
    action: 'escape',
    category: 'navigation'
  },
  {
    id: 'save',
    name: '保存',
    description: '保存项目',
    keys: ['ctrl', 's'],
    action: 'save',
    category: 'file'
  },
  {
    id: 'export',
    name: '导出',
    description: '导出项目',
    keys: ['ctrl', 'e'],
    action: 'export',
    category: 'file'
  },
  {
    id: 'tool-select',
    name: '选择工具',
    description: '切换到选择工具',
    keys: ['v'],
    action: 'tool-select',
    category: 'tools'
  },
  {
    id: 'tool-rectangle',
    name: '矩形工具',
    description: '切换到矩形工具',
    keys: ['r'],
    action: 'tool-rectangle',
    category: 'tools'
  },
  {
    id: 'tool-ellipse',
    name: '椭圆工具',
    description: '切换到椭圆工具',
    keys: ['e'],
    action: 'tool-ellipse',
    category: 'tools'
  },
  {
    id: 'tool-text',
    name: '文本工具',
    description: '切换到文本工具',
    keys: ['t'],
    action: 'tool-text',
    category: 'tools'
  },
  {
    id: 'tool-pen',
    name: '钢笔工具',
    description: '切换到钢笔工具',
    keys: ['p'],
    action: 'tool-pen',
    category: 'tools'
  },
  {
    id: 'tool-hand',
    name: '手型工具',
    description: '切换到手型工具',
    keys: ['h'],
    action: 'tool-hand',
    category: 'tools'
  }
]