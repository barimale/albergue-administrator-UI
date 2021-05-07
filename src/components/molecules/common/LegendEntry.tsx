import React, { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type LegendEntryProps = {
    parentId: string;
    content: string;
}

const LegendEntry: React.FC<PropsWithChildren<LegendEntryProps>> = (props: PropsWithChildren<LegendEntryProps>) => {
    const { children, parentId, content } = props;

    const modalRoot = document.querySelector(parentId) as (HTMLElement | null);

  const el = useRef(document.createElement("div"));

  useEffect(() => {
    const current = el.current;

    try
    {
      if(modalRoot?.hasChildNodes() === true){
          const first = modalRoot.firstElementChild;
          if(first !== null){
              modalRoot?.removeChild(first);
          }
      }    
    }
    catch(error: any)
    {
      console.log(error);
    }
    
    modalRoot?.appendChild(current);

    return () => {
      try
      {
        if(modalRoot?.hasChildNodes() === true){
          modalRoot?.removeChild(current);
        }
      }
      catch(error: any)
      {
        console.log(error);
      }
    }
  });

  el.current.innerHTML = content;
  return createPortal(null, el.current);
};

export default LegendEntry;