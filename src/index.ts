import Display from './display'
import Engine from './engine'
import Vector from './tools/vector'
import Ray from './ray'
import { VectorInterface } from './types'

window.onload = () => {
  const canvas = document.querySelector('canvas')
  const display = Display(canvas)

  const wallCustom = { p1: Vector(500, 100), p2: Vector(500, 500) }
  let mouseX = 0
  let mouseY = 0

  const render = () => {
    const topWall = { p1: Vector(0, 0), p2: Vector(canvas.width, 0) }
    const bottomWall = {
      p1: Vector(0, canvas.height),
      p2: Vector(canvas.width, canvas.height)
    }
    const leftWall = {
      p1: Vector(0, 0),
      p2: Vector(0, canvas.height)
    }
    const rightWall = {
      p1: Vector(canvas.width, 0),
      p2: Vector(canvas.width, canvas.height)
    }
    const rayPositionVector = Vector(100, 300)

    const rayDirectionVector = Vector(
      mouseX - rayPositionVector.getX(),
      mouseY - rayPositionVector.getY()
    ).normalize()

    const intersectionList = [
      topWall,
      bottomWall,
      leftWall,
      rightWall,
      wallCustom
    ]
      .map((wall) => {
        return Ray(rayPositionVector, rayDirectionVector).intersect({
          p1: wall.p1,
          p2: wall.p2
        })
      })
      .filter((intersection) => !!intersection) as Array<VectorInterface>

    if (intersectionList.length) {
      intersectionList.forEach((intersection) => {
        display.draw((canvasContext) => {
          canvasContext.beginPath()
          canvasContext.arc(
            intersection.getX(),
            intersection.getY(),
            10,
            0,
            2 * Math.PI
          )
          canvasContext.stroke()
        })
      })
    }

    display.draw((canvasContext) => {
      canvasContext.beginPath()
      canvasContext.moveTo(rayPositionVector.getX(), rayPositionVector.getY())
      canvasContext.lineTo(
        rayPositionVector.getX() + rayDirectionVector.getX() * 100,
        rayPositionVector.getY() + rayDirectionVector.getY() * 100
      )
      canvasContext.stroke()
    })

    display.draw((canvasContext) => {
      canvasContext.beginPath()
      canvasContext.moveTo(wallCustom.p1.getX(), wallCustom.p1.getY())
      canvasContext.lineTo(wallCustom.p2.getX(), wallCustom.p2.getY())
      canvasContext.stroke()
    })

    display.draw((canvasContext) => {
      ;[topWall, bottomWall, leftWall, rightWall].forEach((wall) => {
        canvasContext.beginPath()
        canvasContext.moveTo(wall.p1.getX(), wall.p1.getY())
        canvasContext.lineTo(wall.p2.getX(), wall.p2.getY())
        canvasContext.stroke()
      })
    })

    display.render()
  }

  const update = () => {}

  const resize = () => {
    display.resize(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    )
  }

  // 1000/30 = ~30 frames per second
  const engine = Engine(1000 / 30, update, render)

  window.addEventListener('resize', resize)
  canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  resize()
  engine.start()
}
