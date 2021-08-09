import { VectorInterface } from './types'
import Vector from './tools/vector'

const Ray = (position: VectorInterface, direction: VectorInterface) => {
  const intersect = (wall: { p1: VectorInterface; p2: VectorInterface }) => {
    const x1 = wall.p1.getX()
    const y1 = wall.p1.getY()
    const x2 = wall.p2.getX()
    const y2 = wall.p2.getY()

    const x3 = position.getX()
    const y3 = position.getY()
    const x4 = x3 + direction.getX()
    const y4 = y3 + direction.getY()

    // denominator. 0 if parallel
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)

    if (denominator === 0) {
      return false
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator
    const u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    if (t > 0 && t < 1 && u > 0) {
      return Vector(x1 + t * (x2 - x1), y1 + t * (y2 - y1))
    }

    return false
  }

  const lookAt = (point: VectorInterface) => {
    return Vector(
      point.getX() - position.getX(),
      point.getY() - position.getY()
    )
  }

  return { intersect, lookAt }
}

export default Ray
