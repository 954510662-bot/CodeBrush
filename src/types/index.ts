/**
 * Core type definitions for CodeBrush design editor
 * @module types
 */

/**
 * Metadata storage for layer-specific properties
 * @interface LayerMetadata
 * @property {number} [width] - Layer width in pixels
 * @property {number} [height] - Layer height in pixels
 * @property {number} [radius] - Corner radius for rectangles
 * @property {number} [sides] - Number of sides for polygon shapes
 * @property {number} [endX] - End X coordinate for lines
 * @property {number} [endY] - End Y coordinate for lines
 * @property {string} [componentId] - Reference to component definition
 * @property {string} [variantId] - Reference to component variant
 * @property {boolean} [isInstance] - Whether this layer is a component instance
 * @property {string} [text] - Text content for text layers
 * @property {number} [fontSize] - Font size for text layers
 * @property {string} [fontFamily] - Font family for text layers
 * @property {string} [imageData] - Base64 encoded image data
 */
export interface LayerMetadata {
  width?: number
  height?: number
  radius?: number
  sides?: number
  endX?: number
  endY?: number
  componentId?: string
  variantId?: string
  isInstance?: boolean
  text?: string
  fontSize?: number
  fontFamily?: string
  imageData?: string
  [key: string]: unknown
}

/**
 * Represents a single design layer in the canvas
 * @interface Layer
 * @property {string} id - Unique identifier for the layer
 * @property {LayerType} type - Type of layer (rectangle, text, image, etc.)
 * @property {string} name - Display name of the layer
 * @property {string | null} parentId - Parent layer ID for nested structures
 * @property {string[]} children - Array of child layer IDs
 * @property {Transform} transform - Position and transformation data
 * @property {LayerStyle} style - Visual styling (fills, strokes, effects)
 * @property {boolean} locked - Whether the layer is editable
 * @property {boolean} visible - Whether the layer is visible
 * @property {number} opacity - Layer opacity (0-1)
 * @property {BlendMode} blendMode - Blending mode for layer composition
 * @property {LayerMetadata} metadata - Layer-specific properties
 */
export interface Layer {
  id: string
  type: LayerType
  name: string
  parentId: string | null
  children: string[]
  transform: Transform
  style: LayerStyle
  locked: boolean
  visible: boolean
  opacity: number
  blendMode: BlendMode
  metadata: LayerMetadata
  isMask?: boolean
  maskId?: string
  clipContent?: boolean
}

/**
 * Supported layer types in the editor
 * @typedef {string} LayerType
 * @description Each type represents a different shape or content type
 */
export type LayerType = 
  | 'frame'     /** Container for design artboards */
  | 'group'     /** Logical grouping of layers */
  | 'rectangle' /** Rectangular shape */
  | 'ellipse'   /** Elliptical/circular shape */
  | 'polygon'   /** Multi-sided polygon */
  | 'line'      /** Straight line segment */
  | 'path'      /** Custom bezier path */
  | 'text'      /** Text content */
  | 'image'     /** Raster image */
  | 'component' /** Component instance */
  | 'boolean'   /** Boolean operation result */

/**
 * 2D transformation data for positioning and scaling
 * @interface Transform
 * @property {number} x - X position in pixels
 * @property {number} y - Y position in pixels
 * @property {number} scaleX - Horizontal scale factor
 * @property {number} scaleY - Vertical scale factor
 * @property {number} rotation - Rotation angle in degrees
 * @property {number} skewX - Horizontal skew angle
 * @property {number} skewY - Vertical skew angle
 */
export interface Transform {
  x: number
  y: number
  scaleX: number
  scaleY: number
  rotation: number
  skewX: number
  skewY: number
}

/**
 * Visual styling properties for layers
 * @interface LayerStyle
 * @property {Fill[]} fills - Array of fill layers
 * @property {Stroke[]} strokes - Array of stroke layers
 * @property {Effect[]} effects - Array of visual effects
 */
export interface LayerStyle {
  fills: Fill[]
  strokes: Stroke[]
  effects: Effect[]
}

/**
 * Fill layer for solid, gradient, or pattern fills
 * @interface Fill
 * @property {'solid' | 'gradient' | 'pattern'} type - Fill type
 * @property {RGBA} [color] - Solid color value
 * @property {Gradient} [gradient] - Gradient configuration
 * @property {Pattern} [pattern] - Pattern configuration
 * @property {boolean} visible - Whether the fill is visible
 */
export interface Fill {
  type: 'solid' | 'gradient' | 'pattern'
  color?: RGBA
  gradient?: Gradient
  pattern?: Pattern
  visible: boolean
}

/**
 * Stroke/border styling for layers
 * @interface Stroke
 * @property {RGBA} color - Stroke color
 * @property {number} width - Stroke width in pixels
 * @property {'solid' | 'dashed' | 'dotted'} style - Stroke dash style
 * @property {'butt' | 'round' | 'square'} cap - Line cap style
 * @property {'miter' | 'round' | 'bevel'} join - Line join style
 * @property {'inside' | 'outside' | 'center'} position - Stroke position
 */
export interface Stroke {
  color: RGBA
  width: number
  style: 'solid' | 'dashed' | 'dotted'
  cap: 'butt' | 'round' | 'square'
  join: 'miter' | 'round' | 'bevel'
  position: 'inside' | 'outside' | 'center'
}

/**
 * Visual effect applied to layers
 * @interface Effect
 * @property {'shadow' | 'blur' | 'overlay'} type - Effect type
 * @property {ShadowParams | BlurParams | OverlayParams} params - Effect parameters
 * @property {boolean} visible - Whether the effect is visible
 */
export interface Effect {
  type: 'shadow' | 'blur' | 'overlay'
  params: ShadowParams | BlurParams | OverlayParams
  visible: boolean
}

/**
 * Red-Green-Blue-Alpha color representation
 * @interface RGBA
 * @property {number} r - Red component (0-255)
 * @property {number} g - Green component (0-255)
 * @property {number} b - Blue component (0-255)
 * @property {number} a - Alpha/opacity (0-1)
 */
export interface RGBA {
  r: number
  g: number
  b: number
  a: number
}

/**
 * Gradient color configuration
 * @interface Gradient
 * @property {'linear' | 'radial' | 'angle'} type - Gradient type
 * @property {GradientStop[]} stops - Array of color stops
 */
export interface Gradient {
  type: 'linear' | 'radial' | 'angle'
  stops: GradientStop[]
}

/**
 * Color stop in a gradient
 * @interface GradientStop
 * @property {number} offset - Position in gradient (0-1)
 * @property {RGBA} color - Color at this stop
 */
export interface GradientStop {
  offset: number
  color: RGBA
}

/**
 * Pattern fill configuration
 * @interface Pattern
 * @property {string} src - Pattern image source URL or data URI
 * @property {number} scale - Pattern scale factor
 */
export interface Pattern {
  src: string
  scale: number
}

/**
 * Shadow effect parameters
 * @interface ShadowParams
 * @property {RGBA} color - Shadow color
 * @property {number} blur - Blur radius in pixels
 * @property {number} offsetX - Horizontal offset
 * @property {number} offsetY - Vertical offset
 * @property {boolean} inner - Whether this is an inner shadow
 */
export interface ShadowParams {
  color: RGBA
  blur: number
  offsetX: number
  offsetY: number
  inner: boolean
}

/**
 * Blur effect parameters
 * @interface BlurParams
 * @property {number} radius - Blur radius
 * @property {'gaussian' | 'motion'} type - Blur type
 */
export interface BlurParams {
  radius: number
  type: 'gaussian' | 'motion'
}

/**
 * Overlay effect parameters
 * @interface OverlayParams
 * @property {RGBA} color - Overlay color
 * @property {BlendMode} blendMode - Blend mode for overlay
 */
export interface OverlayParams {
  color: RGBA
  blendMode: BlendMode
}

/**
 * Supported blend modes for layer composition
 * @typedef {string} BlendMode
 */
export type BlendMode = 
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity'

/**
 * Available tool types in the editor
 * @typedef {string} ToolType
 */
export type ToolType = 
  | 'select'    /** Selection tool */
  | 'rectangle' /** Rectangle drawing tool */
  | 'ellipse'   /** Ellipse drawing tool */
  | 'polygon'   /** Polygon drawing tool */
  | 'line'      /** Line drawing tool */
  | 'pen'       /** Pen/bezier tool */
  | 'text'      /** Text creation tool */
  | 'frame'     /** Frame/artboard tool */
  | 'hand'      /** Pan/hand tool */
  | 'zoom'      /** Zoom tool */

/**
 * Design project containing multiple layers
 * @interface Project
 * @property {string} id - Unique project identifier
 * @property {string} name - Project name
 * @property {string} [description] - Project description
 * @property {Layer[]} layers - Array of design layers
 * @property {string[]} selectedLayerIds - Currently selected layer IDs
 * @property {Viewport} viewport - Current viewport state
 */
export interface Project {
  id: string
  name: string
  description?: string
  layers: Layer[]
  selectedLayerIds: string[]
  viewport: Viewport
}

/**
 * Viewport/camera state for the canvas
 * @interface Viewport
 * @property {number} x - Horizontal pan offset
 * @property {number} y - Vertical pan offset
 * @property {number} zoom - Zoom level (1 = 100%)
 */
export interface Viewport {
  x: number
  y: number
  zoom: number
}

/**
 * History action for undo/redo functionality
 * @interface HistoryAction
 * @property {string} id - Unique action identifier
 * @property {'create' | 'update' | 'delete' | 'move' | 'group' | 'ungroup'} type - Action type
 * @property {string} [layerId] - Primary layer affected
 * @property {string[]} [layerIds] - Multiple layers affected
 * @property {Layer} [previousState] - State before action
 * @property {Layer} [newState] - State after action
 * @property {string} [groupId] - Group created or modified
 */
export interface HistoryAction {
  id: string
  type: 'create' | 'update' | 'delete' | 'move' | 'group' | 'ungroup'
  layerId?: string
  layerIds?: string[]
  previousState?: Layer
  newState?: Layer
  groupId?: string
}

/**
 * Text formatting properties
 * @interface TextStyle
 * @property {string} fontFamily - Font family name
 * @property {number} fontSize - Font size in pixels
 * @property {'normal' | 'bold' | 'light' | 'medium' | 'semibold'} fontWeight - Font weight
 * @property {'left' | 'center' | 'right' | 'justify'} textAlign - Text alignment
 * @property {number | 'auto'} lineHeight - Line height
 * @property {number} letterSpacing - Letter spacing
 * @property {'none' | 'underline' | 'line-through'} textDecoration - Text decoration
 * @property {'top' | 'middle' | 'bottom'} verticalAlign - Vertical alignment
 * @property {RGBA} color - Text color
 */
export interface TextStyle {
  fontFamily: string
  fontSize: number
  fontWeight: 'normal' | 'bold' | 'light' | 'medium' | 'semibold'
  textAlign: 'left' | 'center' | 'right' | 'justify'
  lineHeight: number | 'auto'
  letterSpacing: number
  textDecoration: 'none' | 'underline' | 'line-through'
  verticalAlign: 'top' | 'middle' | 'bottom'
  color: RGBA
}

/**
 * Frame/artboard configuration
 * @interface FrameInfo
 * @property {number} width - Frame width
 * @property {number} height - Frame height
 * @property {Fill} background - Frame background fill
 * @property {Guide[]} guides - Array of guide lines
 */
export interface FrameInfo {
  width: number
  height: number
  background: Fill
  guides: Guide[]
}

/**
 * Guide line for alignment
 * @interface Guide
 * @property {string} id - Guide identifier
 * @property {'horizontal' | 'vertical'} type - Guide orientation
 * @property {number} position - Position in pixels
 */
export interface Guide {
  id: string
  type: 'horizontal' | 'vertical'
  position: number
}

/**
 * SVG path data structure
 * @interface PathData
 * @property {PathCommand[]} commands - Array of SVG path commands
 */
export interface PathData {
  commands: PathCommand[]
}

/**
 * SVG path command
 * @interface PathCommand
 * @property {'M' | 'L' | 'C' | 'Q' | 'Z'} type - Command type
 * @property {number[]} points - Command coordinates
 */
export interface PathCommand {
  type: 'M' | 'L' | 'C' | 'Q' | 'Z'
  points: number[]
}

/**
 * Reusable component definition
 * @interface Component
 * @property {string} id - Component identifier
 * @property {string} name - Component name
 * @property {string} [description] - Component description
 * @property {string} [thumbnail] - Preview image URL
 * @property {ComponentVariant[]} variants - Component variants
 * @property {string} baseLayerId - Base layer ID
 * @property {number} createdAt - Creation timestamp
 * @property {number} updatedAt - Last update timestamp
 */
export interface Component {
  id: string
  name: string
  description?: string
  thumbnail?: string
  variants: ComponentVariant[]
  baseLayerId: string
  createdAt: number
  updatedAt: number
}

/**
 * Component variant with property overrides
 * @interface ComponentVariant
 * @property {string} id - Variant identifier
 * @property {string} name - Variant name
 * @property {Record<string, string>} propertyValues - Property overrides
 * @property {string} layerId - Layer ID for this variant
 */
export interface ComponentVariant {
  id: string
  name: string
  propertyValues: Record<string, string>
  layerId: string
}

/**
 * Component property definition
 * @interface ComponentProperty
 * @property {string} id - Property identifier
 * @property {string} name - Property name
 * @property {'text' | 'number' | 'boolean' | 'select'} type - Property type
 * @property {string[]} [options] - Options for select type
 * @property {string | number | boolean} defaultValue - Default value
 */
export interface ComponentProperty {
  id: string
  name: string
  type: 'text' | 'number' | 'boolean' | 'select'
  options?: string[]
  defaultValue: string | number | boolean
}

/**
 * Component instance configuration
 * @interface Instance
 * @property {string} componentId - Referenced component ID
 * @property {string} [variantId] - Selected variant ID
 * @property {Record<string, string | number | boolean | unknown>} overrides - Property overrides
 */
export interface Instance {
  componentId: string
  variantId?: string
  overrides: Record<string, string | number | boolean | unknown>
}
