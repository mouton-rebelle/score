import * as React from 'react'
import { DateTime } from 'luxon'

export const Elapsed = ({ children }: { children: number }) => {
  React.useEffect(() => {
    const interval = setInterval(() => {
      void 0
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return DateTime.fromMillis(children).toRelative({
    style: 'short',
  })
}
