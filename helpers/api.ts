import { Player } from '../components/definitions'
import * as colors from '../components/color/colors'

export function createPlayer(): Player {
  return {
    name: '',
    color: colors.player[Math.floor(Math.random() * colors.player.length)],
    score: 0,
    lastUpdates: [],
  }
}

export function addPlayer(players: Player[], player: Player): Player[] {
  return [...players, player]
}

export function removePlayerAt(players: Player[], index: number): Player[] {
  return players.filter((_, i) => i !== index)
}

export function updatePlayerAt(
  players: Player[],
  index: number,
  player: Player
): Player[] {
  return players.map((p, i) => (i === index ? player : p))
}
