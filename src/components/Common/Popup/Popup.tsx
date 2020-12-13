import React, { useEffect, useRef, memo } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"

export const Popup = memo(({ children }) => {
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
      <PopupBg onClick={() => history.push("/todo")} />
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
