import { useEffect, useRef } from "react"
import { useNetworkState, useToggle } from "react-use"
import { NetworkIndicatorWrapper } from "./network-indicator.styles"

const DEFAULT_TIMEOUT = 2000

type NetworkIndicatorProps = {
  timeoutIn?: number
}

function NetworkIndicator(props: NetworkIndicatorProps) {
  const { timeoutIn = DEFAULT_TIMEOUT } = props
  const [isShow, toggleShow] = useToggle(false)
  const { online: isOnline } = useNetworkState()
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>()

  useEffect(() => {
    if (!isOnline && !isShow) {
      toggleShow()
    } else if (isOnline && isShow) {
      hideTimeoutRef.current = setTimeout(() => toggleShow(), timeoutIn)
    }

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [isOnline, isShow, timeoutIn, toggleShow])

  if (isShow) {
    return (
      <NetworkIndicatorWrapper isOnline={isOnline}>
        {isOnline ? "Connection Active" : "No Connection"}
      </NetworkIndicatorWrapper>
    )
  }

  return null
}

export default NetworkIndicator
