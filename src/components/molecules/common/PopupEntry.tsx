import React, { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type PopupEntryProps = {
    parentId: string;
}

const PopupEntry: React.FC<PropsWithChildren<PopupEntryProps>> = (props: PropsWithChildren<PopupEntryProps>) => {
    const { children, parentId } = props;

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

  return createPortal(children, el.current);
};

export default PopupEntry;