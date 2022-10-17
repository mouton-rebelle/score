export type scoreVariance = {
  variance: number
  date: Date
}

export type Player = {
  name: string
  score: number
  color: string
  lastUpdates: scoreVariance[]
}
