export interface VectorInterface {
  getX: () => number
  getY: () => number
  setX: (x: number) => VectorInterface
  setY: (y: number) => VectorInterface
  getAngle: () => number
  setAngle: (angle: number) => VectorInterface
  getLength: () => number
  setLength: (length: number) => VectorInterface
  add: (x: number, y: number) => VectorInterface
  subtract: (x: number, y: number) => VectorInterface
  multiply: (value: number) => VectorInterface
  multiplyBy: (multiplierVector: VectorInterface) => VectorInterface
  divide: (value: number) => VectorInterface
  addVector: (vector: VectorInterface) => VectorInterface
}

export type VectorType = (x: number, y: number) => VectorInterface
