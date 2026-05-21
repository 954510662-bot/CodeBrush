# CodeBrush 组件文档

本文档提供 CodeBrush 设计工具核心组件的使用说明和 API 参考。

---

## 📋 目录

1. [组件概览](#组件概览)
2. [核心组件](#核心组件)
   - [Editor](#editor)
   - [Toolbar](#toolbar)
   - [LayersPanel](#layerspanel)
3. [UI 组件](#ui-组件)
   - [Button](#button)
   - [Input](#input)
4. [自定义 Hooks](#自定义-hooks)
5. [状态管理](#状态管理)

---

## 组件概览

### 组件架构

```
App
├── Toolbar                    # 工具栏
├── MainLayout
│   ├── LayersPanel           # 图层面板
│   └── MainContent
│       ├── Editor            # 画布编辑器
│       └── PropertiesPanel   # 属性面板
└── ExportModal               # 导出模态框
```

---

## 核心组件

### Editor

画布编辑器是应用的核心，负责渲染设计画布和处理用户交互。

#### 文件位置

```
src/components/Editor.tsx
```

#### 功能特性

- Canvas 渲染引擎
- 图层绘制（矩形、椭圆、文本、图片）
- 鼠标事件处理
- 拖拽创建图形
- 视口缩放和平移

#### 使用示例

```tsx
import { Editor } from './components/Editor'

function App() {
  return (
    <div className="h-screen">
      <Editor />
    </div>
  )
}
```

#### Props

| 属性 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `className` | `string` | 否 | 自定义样式类 |

#### 内部状态

- 当前项目图层列表
- 视口位置和缩放
- 当前选中的图层
- 鼠标状态（按下、位置）

#### 生命周期

1. **挂载时**：初始化 Canvas 上下文，读取当前项目
2. **图层变更时**：重新渲染 Canvas
3. **卸载时**：清理事件监听器

---

### Toolbar

工具栏组件，提供绘图工具选择和常用操作。

#### 文件位置

```
src/components/Toolbar.tsx
```

#### 功能特性

- 工具选择（选择、矩形、椭圆、多边形等）
- 撤销/重做操作
- 新建项目
- 导出功能（PNG、SVG、JSON）

#### 使用示例

```tsx
import Toolbar from './components/Toolbar'

function App() {
  return (
    <div className="flex h-screen">
      <Toolbar />
      <Editor />
    </div>
  )
}
```

#### 工具列表

| 工具 | 图标 | 快捷键 | 说明 |
|------|------|--------|------|
| 选择工具 | MousePointer2 | V | 选择和移动图层 |
| 矩形工具 | Square | R | 绘制矩形 |
| 椭圆工具 | Circle | O | 绘制椭圆 |
| 多边形工具 | Triangle | Y | 绘制多边形 |
| 线条工具 | Minus | L | 绘制直线 |
| 钢笔工具 | PenTool | P | 贝塞尔曲线 |
| 文本工具 | Type | T | 添加文本 |
| 画板工具 | LayoutGrid | F | 创建画板 |
| 手型工具 | Hand | H | 平移画布 |
| 缩放工具 | ZoomIn | Z | 缩放视图 |

#### 快捷键

| 快捷键 | 操作 |
|--------|------|
| Ctrl+Z | 撤销 |
| Ctrl+Y | 重做 |
| Ctrl+S | 保存项目 |
| Delete | 删除选中图层 |
| Ctrl+G | 编组选中图层 |
| Ctrl+Shift+G | 取消编组 |

---

### LayersPanel

图层面板，显示和管理项目中的所有图层。

#### 文件位置

```
src/components/LayersPanel.tsx
```

#### 功能特性

- 图层列表显示
- 图层选择
- 图层可见性切换
- 图层锁定
- 图层重命名
- 图层排序（拖拽）
- 图层删除

#### 使用示例

```tsx
import LayersPanel from './components/LayersPanel'

function App() {
  return (
    <div className="flex h-screen">
      <LayersPanel />
      <Editor />
    </div>
  )
}
```

#### 图层操作

| 操作 | 方法 | 说明 |
|------|------|------|
| 选择图层 | `selectLayers(ids)` | 选中指定图层 |
| 显示/隐藏 | `layer.visible` | 切换可见性 |
| 锁定/解锁 | `layer.locked` | 切换锁定状态 |
| 删除 | `deleteLayer(id)` | 删除图层 |

---

## UI 组件

### Button

通用按钮组件。

#### 文件位置

```
src/components/ui/Button.tsx
```

#### 功能特性

- 多种变体（primary、secondary、outline、ghost、danger）
- 多种尺寸（sm、md、lg）
- 支持禁用状态
- 支持加载状态

#### 使用示例

```tsx
import { Button } from './components/ui/Button'

// 基本用法
<Button>点击我</Button>

// 主要按钮
<Button variant="primary">主要操作</Button>

// 禁用按钮
<Button disabled>不可点击</Button>

// 危险操作
<Button variant="danger">删除</Button>

// 带图标
<Button icon={<SaveIcon />}>保存</Button>
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | 按钮样式变体 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 按钮尺寸 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `loading` | `boolean` | `false` | 加载状态 |
| `icon` | `ReactNode` | - | 按钮图标 |
| `iconPosition` | `'left' \| 'right'` | `'left'` | 图标位置 |

---

### Input

输入框组件。

#### 文件位置

```
src/components/ui/Input.tsx
```

#### 功能特性

- 文本输入
- 标签显示
- 错误提示
- 禁用状态
- 自定义样式

#### 使用示例

```tsx
import { Input } from './components/ui/Input'

// 基本输入框
<Input placeholder="请输入内容" />

// 带标签
<Input label="用户名" placeholder="请输入用户名" />

// 错误状态
<Input 
  label="邮箱" 
  error="请输入有效的邮箱地址"
  placeholder="example@email.com" 
/>

// 禁用状态
<Input label="只读" disabled value="不可修改" />
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | `string` | - | 输入框标签 |
| `placeholder` | `string` | - | 占位文本 |
| `error` | `string` | - | 错误信息 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `value` | `string` | - | 输入值（受控） |
| `onChange` | `(e: ChangeEvent) => void` | - | 值变化回调 |
| `className` | `string` | - | 自定义样式 |

---

## 自定义 Hooks

### useShortcuts

键盘快捷键管理。

#### 文件位置

```
src/hooks/useShortcuts.ts
```

#### 使用示例

```tsx
import { useShortcuts } from './hooks/useShortcuts'

function MyComponent() {
  useShortcuts({
    onUndo: () => undo(),
    onRedo: () => redo(),
    onDelete: () => deleteSelection(),
    onCopy: () => copySelection(),
    onPaste: () => pasteSelection(),
    onSelectAll: () => selectAll(),
    onGroup: () => groupSelection(),
    onUngroup: () => ungroupSelection()
  })
  
  return <div>使用快捷键</div>
}
```

#### 参数

| 属性 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `onUndo` | `() => void` | 否 | 撤销回调 |
| `onRedo` | `() => void` | 否 | 重做回调 |
| `onDelete` | `() => void` | 否 | 删除回调 |
| `onCopy` | `() => void` | 否 | 复制回调 |
| `onPaste` | `() => void` | 否 | 粘贴回调 |
| `onSelectAll` | `() => void` | 否 | 全选回调 |
| `onGroup` | `() => void` | 否 | 编组回调 |
| `onUngroup` | `() => void` | 否 | 取消编组回调 |

---

### useWebVitals

Web Vitals 性能监控。

#### 文件位置

```
src/hooks/useWebVitals.ts
```

#### 使用示例

```tsx
import { useWebVitals } from './hooks/useWebVitals'

function App() {
  useWebVitals()
  
  return <Editor />
}
```

#### 监控指标

| 指标 | 说明 | 目标值 |
|------|------|--------|
| LCP | 最大内容绘制 | < 2.5s |
| FID | 首次输入延迟 | < 100ms |
| CLS | 累积布局偏移 | < 0.1 |
| FCP | 首次内容绘制 | < 1.8s |
| TTFB | 首字节时间 | < 800ms |
| INP | 交互到下一帧 | < 200ms |

---

## 状态管理

### useStore

全局状态管理，使用 Zustand 实现。

#### 文件位置

```
src/store/index.ts
```

#### 使用示例

```tsx
import { useStore } from './store'

function MyComponent() {
  const { 
    projects,           // 项目列表
    currentTool,        // 当前工具
    selectTool,         // 选择工具
    createProject,       // 创建项目
    addLayer,           // 添加图层
    updateLayer,         // 更新图层
    deleteLayer,        // 删除图层
    undo,               // 撤销
    redo                // 重做
  } = useStore()
  
  // 使用状态和方法
}
```

#### 项目管理

```tsx
// 创建项目
createProject('新项目')

// 获取当前项目
const currentProject = projects.find(p => p.id === currentProjectId)

// 获取项目中的图层
const layers = currentProject?.layers || []
```

#### 图层操作

```tsx
// 添加图层
addLayer(projectId, {
  id: 'layer-1',
  type: 'rectangle',
  name: '矩形 1',
  transform: { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, skewX: 0, skewY: 0 },
  style: { fills: [], strokes: [], effects: [] },
  metadata: { width: 100, height: 100 }
})

// 更新图层
updateLayer(projectId, layerId, { 
  transform: { x: 100, y: 100 } 
})

// 删除图层
deleteLayer(projectId, layerId)

// 选择图层
selectLayers(projectId, ['layer-1', 'layer-2'])

// 编组
groupLayers(projectId, ['layer-1', 'layer-2'])

// 取消编组
ungroupLayer(projectId, groupId)

// 复制图层
duplicateLayer(projectId, layerId)
```

---

## 类型定义

### LayerType

支持的图层类型：

```typescript
type LayerType = 
  | 'frame'     // 画板
  | 'group'     // 编组
  | 'rectangle' // 矩形
  | 'ellipse'   // 椭圆
  | 'polygon'   // 多边形
  | 'line'      // 直线
  | 'path'      // 路径
  | 'text'      // 文本
  | 'image'     // 图片
  | 'component' // 组件
  | 'boolean'   // 布尔运算
```

### ToolType

支持的工具类型：

```typescript
type ToolType = 
  | 'select'    // 选择
  | 'rectangle' // 矩形
  | 'ellipse'   // 椭圆
  | 'polygon'   // 多边形
  | 'line'      // 直线
  | 'pen'       // 钢笔
  | 'text'      // 文本
  | 'frame'     // 画板
  | 'hand'      // 手型
  | 'zoom'      // 缩放
```

---

**最后更新**: 2026-05-12
