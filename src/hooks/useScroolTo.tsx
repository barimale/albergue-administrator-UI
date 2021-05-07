import { RefObject } from 'react'

function useScroolTo<T extends HTMLElement = HTMLElement, K extends HTMLElement = HTMLElement>(
  targetRef: RefObject<T>,
  containerRef: RefObject<K>,
  direction: 'y' | 'x'
): ()=> void {

  const scroolToTarget = () => {
    if(direction === 'y')
    {
      if (containerRef && containerRef.current) {
        if (targetRef && targetRef.current && targetRef.current.offsetTop) {
          containerRef.current.scrollTo(0, targetRef.current.offsetTop);
        }
      }
    }
    else
    {
      if (containerRef && containerRef.current) {
        if (targetRef && targetRef.current && targetRef.current.offsetTop) {
          containerRef.current.scrollTo(targetRef.current.offsetLeft - targetRef.current.offsetWidth, 0);
        }
      }
    }
  };

  return scroolToTarget;
}

export default useScroolTo;