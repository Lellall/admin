import { useEffect, useRef } from "react";
import { useNetworkState, useToggle } from "react-use";
import { NetworkIndicatorWrapper } from "./network-indicator.styles";

const DEFAULT_TIMEOUT = 2000;

type NetworkIndicatorProps = {
  timeoutIn?: number;
};

export function NetworkIndicator(props: NetworkIndicatorProps) {
  const { timeoutIn = DEFAULT_TIMEOUT } = props;
  const [isShow, toggleShow] = useToggle(false);
  const { online: isOnline } = useNetworkState();
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!isOnline && !isShow) {
      toggleShow();
      return;
    }

    if (isOnline && isShow) {
      hideTimeoutRef.current = setTimeout(toggleShow, timeoutIn);
    }

    return () => hideTimeoutRef.current && clearTimeout(hideTimeoutRef.current);
  }, [isOnline, isShow, timeoutIn, toggleShow]);

  return !isShow ? null : (
    <NetworkIndicatorWrapper isOnline={isOnline as boolean}>
      {isOnline ? "Connection Active" : "No Connection"}
    </NetworkIndicatorWrapper>
  );
}
