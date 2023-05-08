import * as React from 'react'

import { config, Controller } from '@react-spring/web'
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
const CONFIRMATION_TIME = 1200
/*
  This one is tricky : 
  We want to allow user to edit variance until CONFIRMATION_TIME timer expires
  So we need to reset confirmCallbackRef when the user interracts (mouse down / tck)
  

 */

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
  onActiveStateChange: (active: boolean) => void
  dispatch: React.Dispatch<Actions>
}) => {
  const overlayShownRef = React.useRef(false)
  // we use a ref for variance, so the callback is not out of sync
  const varianceRef = React.useRef(0)
  // and a fake state to trigger render and ensure we got the ref value on render
  const [, setForceRender] = React.useState(false)
  const repeatCallbackRef = React.useRef<ReturnType<typeof setTimeout>>()
  const confirmCallbackRef = React.useRef<ReturnType<typeof setTimeout>>()
  const velocity = React.useRef<number>(START_VELOCITY)
  const tickCount = React.useRef<number>(0)
  const factor = React.useRef<number>(1)
  const animations = React.useMemo(
    () => new Controller({ opacity: 0, top: -55, right: -200 }),
    []
  )
  const animate = React.useCallback(() => {
    animations.start(
      overlayShownRef.current
        ? {
            opacity: 1,
            top: -55,
            right: 60,
            config: config.stiff,
          }
        : { opacity: 0, top: -55, right: -200, config: config.wobbly }
    )
  }, [animations])

  const tick = React.useCallback(() => {
    clearTimeout(confirmCallbackRef.current)
    tickCount.current++
    if (tickCount.current % 5 === 0) {
      velocity.current = Math.max(MIN_VELOCITY, velocity.current - 30)
    }
    varianceRef.current = varianceRef.current + factor.current
    setForceRender((v) => !v)
    overlayShownRef.current = true
    animate()
    repeatCallbackRef.current = setTimeout(tick, velocity.current)
    beep(factor.current > 0 ? 400 : 200)
  }, [animate])

  const confirmScore = React.useCallback(() => {
    onActiveStateChange(false)
    overlayShownRef.current = false
    animate()
    if (varianceRef.current !== 0) {
      dispatch({
        type: 'updatePlayerScore',
        payload: { playerId: player.id, variance: varianceRef.current },
      })
      if (voiceOverEnabled) {
        const utterance = new SpeechSynthesisUtterance(
          `${player.name}, ${varianceRef.current} point`
        )
        speechSynthesis.speak(utterance)
      }
    }
  }, [
    animate,
    dispatch,
    onActiveStateChange,
    player.id,
    player.name,
    voiceOverEnabled,
  ])

  const onMouseDown = React.useCallback(
    (evt) => {
      // when we switch from up or down button, we remove the confirm callback
      clearTimeout(confirmCallbackRef.current)
      tickCount.current = 0
      velocity.current = START_VELOCITY
      factor.current = evt.target.dataset.operation === 'add' ? 1 : -1
      if (!overlayShownRef.current) {
        varianceRef.current = 0
        setForceRender((v) => !v)
      }
      repeatCallbackRef.current = setTimeout(tick, velocity.current)
      onActiveStateChange(true)
    },
    [onActiveStateChange, tick]
  )

  const onMouseUp = React.useCallback(() => {
    clearTimeout(repeatCallbackRef.current)
    confirmCallbackRef.current = setTimeout(confirmScore, CONFIRMATION_TIME)
    animate()
  }, [confirmScore, animate])

  const onClick = React.useCallback(() => {
    varianceRef.current = varianceRef.current + factor.current
    overlayShownRef.current = true
    setForceRender((v) => !v)
    animate()
    beep(factor.current > 0 ? 400 : 200)
  }, [animate])

  return (
    <PlayerContainer $isScorePage $isDimmed={isDimmed} $color={player.color}>
      <PlayerButton
        style={{ left: 0 }}
        data-operation="substract"
        onPointerDown={onMouseDown}
        onPointerUp={onMouseUp}
        onClick={onClick}
      />
      <PlayerButton
        style={{ right: 0 }}
        data-operation="add"
        onPointerDown={onMouseDown}
        onPointerUp={onMouseUp}
        onClick={onClick}
      />
      <PlayerGrid $color={player.color} $template="1fr auto auto">
        <Name>{player.name}</Name>
        <Score>{player.score}</Score>

        <Variance style={animations.springs}>
          <span>{player.score}</span>
          {varianceRef.current >= 0 && '+'}
          {varianceRef.current}
          <span>={player.score + varianceRef.current}</span>
        </Variance>
      </PlayerGrid>
    </PlayerContainer>
  )
}

PlayerScore.displayName = 'PlayerScore'
