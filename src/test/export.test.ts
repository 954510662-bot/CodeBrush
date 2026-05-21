import { describe, it, expect } from 'vitest'
import { generateSVG, exportToJSON, downloadFile } from '../utils/export'
import type { Project } from '../types'

describe('export utilities', () => {
  const mockProject: Project = {
    id: 'test-project-1',
    name: 'Test Project',
    layers: [
      {
        id: 'layer-1',
        type: 'rectangle',
        name: 'Rectangle 1',
        parentId: null,
        children: [],
        transform: { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, skewX: 0, skewY: 0 },
        style: {
          fills: [{ type: 'solid', color: { r: 255, g: 0, b: 0, a: 1 }, visible: true }],
          strokes: [],
          effects: []
        },
        locked: false,
        visible: true,
        opacity: 1,
        blendMode: 'normal',
        metadata: { width: 100, height: 50 }
      },
      {
        id: 'layer-2',
        type: 'text',
        name: 'Text 1',
        parentId: null,
        children: [],
        transform: { x: 10, y: 10, scaleX: 1, scaleY: 1, rotation: 0, skewX: 0, skewY: 0 },
        style: {
          fills: [{ type: 'solid', color: { r: 0, g: 0, b: 0, a: 1 }, visible: true }],
          strokes: [],
          effects: []
        },
        locked: false,
        visible: true,
        opacity: 1,
        blendMode: 'normal',
        metadata: { text: 'Hello', fontSize: 16, fontFamily: 'Inter' }
      }
    ],
    selectedLayerIds: [],
    viewport: { x: 0, y: 0, zoom: 1 }
  }

  describe('generateSVG', () => {
    it('should generate SVG with correct dimensions', () => {
      const svg = generateSVG(mockProject)
      
      expect(svg).toContain('<svg')
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"')
      expect(svg).toContain('width="1200"')
      expect(svg).toContain('height="800"')
    })

    it('should include rectangle layer', () => {
      const svg = generateSVG(mockProject)
      
      expect(svg).toContain('<rect')
      expect(svg).toContain('width="100"')
      expect(svg).toContain('height="50"')
    })

    it('should include text layer', () => {
      const svg = generateSVG(mockProject)
      
      expect(svg).toContain('<text')
      expect(svg).toContain('Hello')
      expect(svg).toContain('font-size="16"')
    })

    it('should handle empty project', () => {
      const emptyProject: Project = {
        ...mockProject,
        layers: []
      }
      
      const svg = generateSVG(emptyProject)
      
      expect(svg).toContain('<svg')
      expect(svg).toContain('</svg>')
    })
  })

  describe('exportToJSON', () => {
    it('should export project as JSON string', () => {
      const json = exportToJSON(mockProject)
      
      expect(typeof json).toBe('string')
      const parsed = JSON.parse(json)
      expect(parsed.id).toBe('test-project-1')
      expect(parsed.name).toBe('Test Project')
    })

    it('should pretty print JSON with indentation', () => {
      const json = exportToJSON(mockProject)
      
      expect(json).toContain('\n')
      expect(json).toContain('  ')
    })
  })

  describe('downloadFile', () => {
    it('should be callable without errors', () => {
      expect(() => {
        downloadFile('test content', 'test.txt', 'text/plain')
      }).not.toThrow()
    })
  })
})
