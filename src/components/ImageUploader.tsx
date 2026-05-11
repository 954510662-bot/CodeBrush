import React, { useCallback, useRef } from 'react'
import { ImagePlus } from 'lucide-react'
import { useStore } from '../store'

function ImageUploader() {
  const { currentProjectId, createImageLayer } = useStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !currentProjectId) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageData = event.target?.result as string
      
      const img = new Image()
      img.onload = () => {
        const width = Math.min(img.width, 400)
        const height = Math.min(img.height, 400)
        createImageLayer(currentProjectId!, 100, 100, imageData, width, height)
      }
      img.src = imageData
    }
    reader.readAsDataURL(file)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [currentProjectId, createImageLayer])

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={handleClick}
        className="w-10 h-10 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 flex items-center justify-center"
        title="上传图片"
      >
        <ImagePlus size={20} />
      </button>
    </>
  )
}

export default ImageUploader
