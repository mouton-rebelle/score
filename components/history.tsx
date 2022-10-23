import * as React from 'react'
import {
  HistoryVarianceLine,
  HistoryPane,
  HistoryPaneContent,
} from './player/player.styled'

import { Elapsed } from './player/elapsed'
import { type Player } from './state'
import { useSpring, config } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

export const History = ({ players }: { players: Player[] }) => {
  const variances = React.useMemo(
    () =>
      players
        .reduce((acc, player) => {
          return [
            ...acc,
            ...player.lastUpdates.reduce((variances, variance) => {
              return [
                ...variances,
                {
                  ...variance,
                  name: player.name,
                  color: player.color,
                },
              ]
            }, []),
          ]
        }, [])
        .sort((v1, v2) => (v1.timestamp < v2.timestamp ? 1 : -1)),
    [players]
  )

  const [{ y }, api] = useSpring(() => ({ y: 0 }))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(
    ({ down, movement: [, my] }) => {
      api.start({ y: down ? my : 0, immediate: down, config: config.wobbly })
    },
    { axis: 'y' }
  )

  return (
    <HistoryPane {...bind()} style={{ y }}>
      <HistoryPaneContent>
        {variances.map((variance) => (
          <HistoryVarianceLine key={variance.timestamp} $color={variance.color}>
            <div>{variance.name}</div>
            <div className="date">
              <Elapsed>{variance.timestamp}</Elapsed>
            </div>
            <div className="variance">
              {variance.variance > 0 && '+'}
              {variance.variance}
            </div>
          </HistoryVarianceLine>
        ))}
      </HistoryPaneContent>
    </HistoryPane>
  )
}
