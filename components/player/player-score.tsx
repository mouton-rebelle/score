import * as React from 'react'
import { useSpring, config } from '@react-spring/web'
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

  const [props, api] = useSpring(() => ({ opacity: 0, top: -55, right: -200 }))

  const bind = useDrag(
    ({ down, movement: [mx] }) => {
      clearTimeout(callbackRef.current)
      api.start({ opacity: 1, top: -55, right: 60, config: config.gentle })
      if (Math.floor(mx / 20) !== variance) {
        setVariance(Math.floor(mx / 20) + startVariance)
      }
      if (!down) {
        setStartVariance(Math.floor(mx / 20) + startVariance)
        callbackRef.current = setTimeout(() => {
          if (variance !== 0) {
            dispatch({
              type: 'updatePlayerScore',
              payload: { playerId: player.id, variance },
            })
            const utterance = new SpeechSynthesisUtterance(
              `${player.name}, ${variance} point`
            )
            utterance.volume = 50
            speechSynthesis.speak(utterance)
          }
          api.start({
            opacity: 0,
            top: -55,
            right: -200,
            onRest: () => {
              setVariance(0)
              setStartVariance(0)
            },
          })
        }, 1600)
      }
    },
    { axis: 'x' }
  )
  return (
    <PlayerContainer $isScorePage $color={player.color} {...bind()}>
      <PlayerGrid $color={player.color} $template="1fr auto auto">
        <Name>{player.name}</Name>
        <Score>{player.score}</Score>

        <Variance style={props}>
          <span>{player.score}</span>
          {variance >= 0 && '+'}
          {variance}
          <span>={player.score + variance}</span>
        </Variance>
      </PlayerGrid>
    </PlayerContainer>
  )
}

PlayerScore.displayName = 'PlayerScore'
