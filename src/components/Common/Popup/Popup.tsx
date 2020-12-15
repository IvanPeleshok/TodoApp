import React, { useEffect, useRef, memo, ReactNode } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"

interface IProps {
  toRoute: string
  children: ReactNode
}

export const Popup = memo<IProps>(({ toRoute, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const history = useHistory()

  useEffect(() => {
    document.addEventListener("click", (e: any) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        e.stopPropagation()
      }
    })
    return () => {
      document.removeEventListener("click", () => {})
    }
  }, [])
  return (
    <PopupW>
      <PopupBg onClick={() => history.push(`${toRoute}`)} />
      <PopUpComponent ref={modalRef}>{children}</PopUpComponent>
    </PopupW>
  )
})

const PopupW = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PopUpComponent = styled.div`
  z-index: 4;
`

const PopupBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  heigth: 100%;
  background: #000;
  opacity: 0.3;
  z-index: 3;
`
