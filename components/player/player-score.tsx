import * as React from 'react'
import { useSpring, config } from '@react-spring/web'
import type { Player, Actions } from '../state'
import {
  PlayerContainer,
  PlayerButton,
  PlayerGrid,
  Variance,
  Score,
  Name,
} from './player.styled'

const START_VELOCITY = 200
const MIN_VELOCITY = 10
declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    __AUDIO_CTX__: AudioContext
  }
}
const beep = (frequency: number) => {
  if (!window.__AUDIO_CTX__) {
    window.__AUDIO_CTX__ = new window.AudioContext()
  }

  const oscillator = window.__AUDIO_CTX__.createOscillator()
  const gainNode = window.__AUDIO_CTX__.createGain()
  oscillator.connect(gainNode)
  gainNode.connect(window.__AUDIO_CTX__.destination)
  gainNode.gain.value = 0.3
  oscillator.type = 'sine'

  oscillator.frequency.value = frequency
  oscillator.start(0)
  oscillator.stop(window.__AUDIO_CTX__.currentTime + 0.08)
}
export const PlayerScore = ({
  player,
  isDimmed,
  voiceOverEnabled,
  onActiveStateChange,
  dispatch,
}: {
  player: Player
  isDimmed: boolean
  voiceOverEnabled: boolean
  onActiveStateChange: (boolean) => void
  dispatch: React.Dispatch<Actions>
}) => {
  const [variance, setVariance] = React.useState(0)
  const repeatCallbackRef = React.useRef<ReturnType<typeof setTimeout>>()
  const confirmCallbackRef = React.useRef<ReturnType<typeof setTimeout>>()
  const velocity = React.useRef<number>(START_VELOCITY)
  const tickCount = React.useRef<number>(0)
  const factor = React.useRef<number>(1)
  const [props, api] = useSpring(() => ({ opacity: 0, top: -55, right: -200 }))

  const tick = React.useCallback(() => {
    tickCount.current++
    if (tickCount.current % 5 === 0) {
      velocity.current = Math.max(MIN_VELOCITY, velocity.current - 30)
    }
    clearTimeout(confirmCallbackRef.current)
    setVariance((v) => v + factor.current)
    repeatCallbackRef.current = setTimeout(tick, velocity.current)
    beep(factor.current > 0 ? 400 : 200)
  }, [])

  const confirmScore = React.useCallback(() => {
    onActiveStateChange(false)
    if (variance !== 0) {
      dispatch({
        type: 'updatePlayerScore',
        payload: { playerId: player.id, variance },
      })
      if (voiceOverEnabled) {
        const utterance = new SpeechSynthesisUtterance(
          `${player.name}, ${variance} point`
        )
        speechSynthesis.speak(utterance)
      }
    }
    api.start({
      opacity: 0,
      top: -55,
      right: -200,
      onRest: () => {
        setVariance(0)
      },
    })
  }, [
    api,
    dispatch,
    onActiveStateChange,
    player.id,
    player.name,
    variance,
    voiceOverEnabled,
  ])
  const onMouseDown = React.useCallback(
    (evt) => {
      tickCount.current = 0
      velocity.current = START_VELOCITY
      factor.current = evt.target.dataset.operation === 'add' ? 1 : -1
      tick()
      onActiveStateChange(true)
      api.start({
        opacity: 1,
        top: -55,
        right: 60,
        config: config.stiff,
      })
    },
    [api, onActiveStateChange, tick]
  )
  const onMouseUp = React.useCallback(() => {
    clearTimeout(repeatCallbackRef.current)
    confirmCallbackRef.current = setTimeout(confirmScore, 1200)
  }, [confirmScore])

  return (
    <PlayerContainer $isScorePage $isDimmed={isDimmed} $color={player.color}>
      <PlayerButton
        style={{ left: 0 }}
        data-operation="substract"
        onPointerDown={onMouseDown}
        onPointerUp={onMouseUp}
      />
      <PlayerButton
        style={{ right: 0 }}
        data-operation="add"
        onPointerDown={onMouseDown}
        onPointerUp={onMouseUp}
      />
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
