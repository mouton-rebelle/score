import { colors } from './color/colors'

const getKey = () => Math.random().toString(36).substring(2, 8)

function readFromLocalstorage<T>(key: string, defaultValue: T) {
  if (typeof window === 'undefined') return defaultValue
  const item = window.localStorage.getItem(key)
  // Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : defaultValue
}
function writeValue<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}
export type ScoreVariance = {
  variance: number
  timestamp: number
}
export type Player = {
  id: string
  name: string
  score: number
  color: string
  lastUpdates: ScoreVariance[]
}
type AppState = {
  players: Player[]
  archivedPlayers: Player[]
}

export function buildNewPlayer(): Player {
  return {
    id: '',
    score: 0,
    name: '',
    color: colors[Math.floor(Math.random() * colors.length)],
    lastUpdates: [],
  }
}

const players = readFromLocalstorage<Player[]>('players', [])
const archivedPlayers = readFromLocalstorage<Player[]>('archive', [])

export const initialState: AppState = {
  players,
  archivedPlayers,
}

type AddPlayerAction = {
  type: 'addPlayer'
  payload: { name: string; color: string }
}
type EditPlayerAction = {
  type: 'editPlayer'
  payload: { id: string; name: string; color: string }
}
export type Actions = AddPlayerAction | EditPlayerAction
export const scoreReducer = (state: AppState, action: Actions): AppState => {
  switch (action.type) {
    case 'addPlayer': {
      const updatedPlayers = [
        ...state.players,
        {
          id: getKey(),
          name: action.payload.name,
          color: action.payload.color,
          score: 0,
          lastUpdates: [],
        },
      ]
      writeValue('players', updatedPlayers)
      return {
        ...state,
        players: updatedPlayers,
      }
    }
    case 'editPlayer': {
      const updatedPlayers = state.players.map((p: Player) =>
        p.id === action.payload.id
          ? { ...p, color: action.payload.color, name: action.payload.name }
          : p
      )
      writeValue('players', updatedPlayers)
      return { ...state, players: updatedPlayers }
    }
  }
}
