import * as React from 'react'
import { DateTime } from 'luxon'

export const Elapsed = ({ children }: { children: number }) => {
  const [, forceUpdate] = React.useState(0)
  const seconds = Math.floor((Date.now() - children) / 1000)
  const cbRef = React.useRef<ReturnType<typeof setTimeout>>(null)
  const interval = React.useMemo(() => (seconds < 60 ? 1000 : 10000), [seconds])
  const callback = React.useCallback(() => {
    cbRef.current = setTimeout(callback, interval)
    forceUpdate((i) => i + 1)
  }, [interval])

  React.useEffect(() => {
    callback()
    return () => {
      if (cbRef.current) clearTimeout(cbRef.current)
    }
  }, [callback])

  return (
    <>
      {DateTime.fromMillis(children).toRelative({
        style: 'short',
      })}
    </>
  )
}
