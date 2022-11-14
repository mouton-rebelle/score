import { colors, type availableColors } from './styled/colors'

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
  color: availableColors
  lastUpdates: ScoreVariance[]
}
type AppState = {
  players: Player[]
  archivedPlayers: Player[]
}

export function buildNewPlayer(): Player {
  const colorIndex = Math.floor(Math.random() * Object.keys(colors).length)
  const coercedColor = Object.keys(colors)[colorIndex] as availableColors
  return {
    id: '',
    score: 0,
    name: '',
    color: coercedColor,
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
  payload: { name: string; color: availableColors }
}

type ResetScoreAction = {
  type: 'resetScore'
  payload: { score: number }
}
type EditPlayerAction = {
  type: 'editPlayer'
  payload: { id: string; name: string; color: availableColors }
}
type ArchivePlayerAction = {
  type: 'archivePlayer'
  payload: Player
}
type RestorePlayerAction = {
  type: 'restorePlayer'
  payload: Player
}
type UpdatePlayerScoreAction = {
  type: 'updatePlayerScore'
  payload: {
    playerId: string
    variance: number
  }
}
export type Actions =
  | AddPlayerAction
  | EditPlayerAction
  | ArchivePlayerAction
  | ResetScoreAction
  | RestorePlayerAction
  | UpdatePlayerScoreAction
export const scoreReducer = (state: AppState, action: Actions): AppState => {
  switch (action.type) {
    case 'resetScore': {
      const { score } = action.payload
      const updatedPlayers = state.players.map((player) => {
        return {
          ...player,
          lastUpdates: [],
          score,
        }
      })
      writeValue('players', updatedPlayers)
      return { ...state, players: updatedPlayers }
    }
    case 'updatePlayerScore': {
      const { playerId, variance } = action.payload
      if (variance === 0) return state
      const updatedPlayers = state.players.map((player) => {
        if (player.id === playerId) {
          const newScore = player.score + variance
          const lastUpdates = player.lastUpdates
            .concat({
              variance,
              timestamp: Date.now(),
            })
            .slice(-10)
          return {
            ...player,
            score: newScore,
            lastUpdates,
          }
        }
        return player
      })
      writeValue('players', updatedPlayers)
      return { ...state, players: updatedPlayers }
    }
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
    case 'archivePlayer': {
      const updatedPlayers = state.players.filter(
        (p: Player) => p.id !== action.payload.id
      )
      const updatedArchive = [action.payload, ...state.archivedPlayers]

      writeValue('players', updatedPlayers)
      writeValue('archive', updatedArchive)
      return {
        ...state,
        players: updatedPlayers,
        archivedPlayers: updatedArchive,
      }
    }
    case 'restorePlayer': {
      const updatedArchive = state.archivedPlayers.filter(
        (p: Player) => p.id !== action.payload.id
      )
      const updatedPlayers = [action.payload, ...state.players]

      writeValue('players', updatedPlayers)
      writeValue('archive', updatedArchive)
      return {
        ...state,
        players: updatedPlayers,
        archivedPlayers: updatedArchive,
      }
    }
  }
}
