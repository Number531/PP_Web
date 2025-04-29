'use client'

import { useState, useEffect } from 'react'
import { X, Smartphone, Tablet, Monitor, Info } from 'lucide-react'

type DeviceSize = {
  name: string
  width: string
  icon: React.ReactNode
}

export function ResponsiveTester() {
  const [isOpen, setIsOpen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [currentWidth, setCurrentWidth] = useState<number>(0)
  
  // Initialize and track window width
  useEffect(() => {
    // Set initial width
    setCurrentWidth(window.innerWidth)
    
    // Update width on resize
    const handleResize = () => {
      setCurrentWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const deviceSizes: DeviceSize[] = [
    { name: 'Mobile S (320px)', width: '320px', icon: <Smartphone className="w-4 h-4" /> },
    { name: 'Mobile M (375px)', width: '375px', icon: <Smartphone className="w-4 h-4" /> },
    { name: 'Mobile L (425px)', width: '425px', icon: <Smartphone className="w-4 h-4" /> },
    { name: 'Tablet (768px)', width: '768px', icon: <Tablet className="w-4 h-4" /> },
    { name: 'Laptop (1024px)', width: '1024px', icon: <Monitor className="w-4 h-4" /> },
    { name: 'Laptop L (1440px)', width: '1440px', icon: <Monitor className="w-4 h-4" /> },
  ]

  const toggleTester = () => setIsOpen(!isOpen)
  const toggleInfo = () => setShowInfo(!showInfo)

  if (!isOpen) {
    return (
      <button
        onClick={toggleTester}
        className="fixed bottom-4 right-4 z-50 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        aria-label="Open responsive tester"
      >
        <Smartphone className="w-5 h-5" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800 shadow-lg">
      <div className="flex items-center justify-between p-2 border-b border-zinc-800">
        <div className="flex items-center">
          <h3 className="text-white font-medium text-sm">Responsive Tester</h3>
          <button 
            onClick={toggleInfo}
            className="ml-2 text-zinc-400 hover:text-white p-1 rounded-full"
            aria-label="Show information"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={toggleTester}
          className="text-zinc-400 hover:text-white p-1 rounded-full"
          aria-label="Close responsive tester"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {showInfo && (
        <div className="p-3 bg-zinc-800 text-xs text-zinc-300 border-b border-zinc-700">
          <p>This tool helps you test your app at different screen sizes. Click on a device size to see how your app looks on that device.</p>
          <p className="mt-1">Current breakpoints in Tailwind:</p>
          <ul className="mt-1 space-y-1">
            <li><code className="bg-zinc-700 px-1 rounded">sm</code>: 640px</li>
            <li><code className="bg-zinc-700 px-1 rounded">md</code>: 768px</li>
            <li><code className="bg-zinc-700 px-1 rounded">lg</code>: 1024px</li>
            <li><code className="bg-zinc-700 px-1 rounded">xl</code>: 1280px</li>
            <li><code className="bg-zinc-700 px-1 rounded">2xl</code>: 1536px</li>
          </ul>
        </div>
      )}
      
      <div className="flex items-center space-x-2 p-2 overflow-x-auto">
        {deviceSizes.map((device) => (
          <button
            key={device.width}
            onClick={() => {
              // We can't actually resize the viewport, but we can simulate it by updating CSS
              // This approach changes the viewport in DevTools
              const meta = document.querySelector('meta[name="viewport"]')
              if (meta) {
                meta.setAttribute('content', `width=${device.width}, initial-scale=1.0`)
              }
              // Force a resize event to update our display
              window.dispatchEvent(new Event('resize'))
            }}
            className="flex items-center space-x-1 bg-zinc-800 hover:bg-zinc-700 text-white text-xs py-1 px-2 rounded transition-colors"
          >
            {device.icon}
            <span>{device.name}</span>
          </button>
        ))}
        <div className="text-xs text-zinc-500 ml-2">
          Current width: <span className="text-zinc-300" id="current-width">{currentWidth}px</span>
        </div>
      </div>
    </div>
  )
}
