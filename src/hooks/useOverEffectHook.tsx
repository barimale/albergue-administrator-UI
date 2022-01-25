/* eslint-disable no-nested-ternary */
import { useContext, RefObject } from 'react';

import { DeviceContext, DeviceType } from '../contexts/DeviceContext';
import useHover from './useHover';
import useTouched from './useTouched';

function useOverEffectHook<T extends HTMLElement = HTMLElement> (
  elementRef: RefObject<T>,
): string {
  const context = useContext<DeviceType>(DeviceContext);
  const isHover = useHover(elementRef);
  const isTouched = useTouched(elementRef);

  return (
    context === DeviceType.isDesktopOrLaptop ? (isHover ? '0.67' : '1') : isTouched ? '0.67' : '1'
  );
}

export default useOverEffectHook;
