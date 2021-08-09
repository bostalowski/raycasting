const Display = (canvas: HTMLCanvasElement) => {
  const displayBufferContext = document.createElement('canvas').getContext('2d')
  const displayContext = canvas.getContext('2d')

  const draw = (drawMethod: (canvas: CanvasRenderingContext2D) => void) => {
    drawMethod(displayBufferContext)
  }

  const resize = (width: number, height: number) => {
    displayContext.canvas.height = height
    displayContext.canvas.width = width
    displayBufferContext.canvas.height = height
    displayBufferContext.canvas.width = width
  }

  const render = () => {
    displayContext.clearRect(
      0,
      0,
      displayContext.canvas.width,
      displayContext.canvas.height
    )

    displayContext.drawImage(
      displayBufferContext.canvas,
      0,
      0,
      displayBufferContext.canvas.width,
      displayBufferContext.canvas.height,
      0,
      0,
      displayContext.canvas.width,
      displayContext.canvas.height
    )

    displayBufferContext.clearRect(
      0,
      0,
      displayBufferContext.canvas.width,
      displayBufferContext.canvas.height
    )
  }

  return { render, resize, draw }
}

export default Display
