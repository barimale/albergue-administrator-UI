import { useState, useEffect, RefObject } from 'react'

function useTouched<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>,
): boolean {

  const [value, setValue] = useState<boolean>(false)

  const handleTouchedIn = () => setValue(true)
  const handleTouchedOut = () => setValue(false)

  useEffect(() => {
    const node = elementRef?.current;

    if (node) {
      node.addEventListener('touchstart', handleTouchedIn);
      node.addEventListener('touchend', handleTouchedOut);

      return () => {
        node.removeEventListener('touchstart', handleTouchedIn);
        node.removeEventListener('touchend', handleTouchedOut);
      }
    }
  }, [elementRef])

  return !!value;
}

export default useTouched;