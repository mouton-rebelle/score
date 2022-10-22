import * as React from 'react'
// import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import type { Player, Actions } from '../state'
import {
  PlayerContainer,
  PlayerGrid,
  Variance,
  Score,
  Name,
} from './player.styled'

export const PlayerScore = ({
  player,
  dispatch,
}: {
  player: Player
  dispatch: React.Dispatch<Actions>
}) => {
  const [variance, setVariance] = React.useState(0)
  const [startVariance, setStartVariance] = React.useState(0)
  const callbackRef = React.useRef<ReturnType<typeof setTimeout>>()
  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(
    ({ down, movement: [mx] }) => {
      clearTimeout(callbackRef.current)
      if (Math.floor(mx / 20) !== variance) {
        setVariance(Math.floor(mx / 20) + startVariance)
      }
      if (!down) {
        setStartVariance(Math.floor(mx / 20) + startVariance)
        callbackRef.current = setTimeout(() => {
          dispatch({
            type: 'updatePlayerScore',
            payload: { playerId: player.id, variance },
          })
          const utterance = new SpeechSynthesisUtterance(
            `${player.name}, ${variance} point`
          )
          speechSynthesis.speak(utterance)
          setVariance(0)
          setStartVariance(0)
        }, 1600)
      }
    },
    { axis: 'x' }
  )
  return (
    <PlayerContainer
      $color={player.color}
      {...bind()}
      $isVarianceShown={variance !== 0}
    >
      <PlayerGrid $color={player.color} $template="1fr auto auto">
        <Name>{player.name}</Name>
        <Score>{player.score}</Score>
        {<Variance>{variance === 0 ? null : variance}</Variance>}
      </PlayerGrid>
    </PlayerContainer>
  )
}

PlayerScore.displayName = 'PlayerScore'
