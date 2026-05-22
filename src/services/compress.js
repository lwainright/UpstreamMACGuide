// src/services/compress.js
// Mirrors growAware compression pattern
// Optional photos — always call this before upload

export async function compressPhoto(file, maxSize = 800, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      if (width > maxSize || height > maxSize) {
        if (width > height) { height = Math.round(height * maxSize / width);  width = maxSize }
        else                { width  = Math.round(width  * maxSize / height); height = maxSize }
      }
      const canvas     = document.createElement('canvas')
      canvas.width     = width
      canvas.height    = height
      const ctx        = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      const dataUrl    = canvas.toDataURL('image/jpeg', quality)
      const base64     = dataUrl.split(',')[1]
      const compressed = Math.round(dataUrl.length * 0.75)
      const original   = file.size
      resolve({
        base64,
        dataUrl,
        blob: dataUrlToBlob(dataUrl),
        originalKB:   Math.round(original   / 1024),
        compressedKB: Math.round(compressed / 1024),
        summary: `Compressed ${Math.round(original / 1024)}KB → ${Math.round(compressed / 1024)}KB`
      })
    }
    img.onerror = reject
    img.src = url
  })
}

function dataUrlToBlob(dataUrl) {
  const arr  = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n      = bstr.length
  const u8   = new Uint8Array(n)
  while (n--) u8[n] = bstr.charCodeAt(n)
  return new Blob([u8], { type: mime })
}
