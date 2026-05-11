import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '../store'

interface TextEditorProps {
  layerId: string
  x: number
  y: number
}

function TextEditor({ layerId, x, y }: TextEditorProps) {
  const { projects, currentProjectId, updateLayer } = useStore()
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!currentProjectId) return
    const project = projects.find(p => p.id === currentProjectId)
    const layer = project?.layers.find(l => l.id === layerId)
    if (layer) {
      setText((layer.metadata.text as string) || '')
    }
  }, [projects, currentProjectId, layerId])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setText(newText)
    if (currentProjectId) {
      updateLayer(currentProjectId, layerId, {
        metadata: { text: newText }
      })
    }
  }

  const handleBlur = () => {
  }

  return (
    <textarea
      ref={inputRef}
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      className="absolute bg-transparent border-none outline-none resize-none p-0"
      style={{
        left: x,
        top: y,
        fontFamily: 'Inter, sans-serif',
        fontSize: 16,
        color: '#333'
      }}
      placeholder="输入文本..."
    />
  )
}

export default TextEditor
