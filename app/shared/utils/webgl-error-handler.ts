'use client'

/**
 * Utility to handle and prevent common WebGL errors
 */

// Patch THREE.js WebGLAttributes to prevent buffer resizing errors
export function patchWebGLBufferWarnings() {
  if (typeof window !== 'undefined') {
    // Add a global error handler for WebGL errors
    window.addEventListener('error', (event) => {
      // Check if it's a WebGL buffer attribute error
      if (
        event.message &&
        event.message.includes('THREE.WebGLAttributes') &&
        event.message.includes('buffer attribute')
      ) {
        // Prevent the error from showing in the console
        event.preventDefault();
        console.warn('WebGL buffer attribute error suppressed. Consider reducing particle count on mobile devices.');
        return true;
      }
      return false;
    });
  }
}

// Helper function to safely resize buffers
export function safeResizeBuffer(
  buffer: Float32Array | Uint16Array | Uint32Array,
  newSize: number
): Float32Array | Uint16Array | Uint32Array {
  // If the buffer is already the right size, return it
  if (buffer.length === newSize) {
    return buffer;
  }
  
  // Create a new buffer of the right size
  const newBuffer = 
    buffer instanceof Float32Array 
      ? new Float32Array(newSize)
      : buffer instanceof Uint16Array
        ? new Uint16Array(newSize)
        : new Uint32Array(newSize);
  
  // Copy the old data, up to the minimum of the two lengths
  const copyLength = Math.min(buffer.length, newSize);
  for (let i = 0; i < copyLength; i++) {
    newBuffer[i] = buffer[i];
  }
  
  return newBuffer;
}

// Helper to determine if we should reduce particle count based on device performance
export function shouldReduceParticles(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check for low memory devices (rough estimate)
  // Note: deviceMemory is an experimental feature and may not be available in all browsers
  const isLowMemory = 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;
  
  // Check for low performance devices
  const isLowPerformance = window.navigator.hardwareConcurrency !== undefined && window.navigator.hardwareConcurrency < 4;
  
  return isMobile || isLowMemory || isLowPerformance;
}
