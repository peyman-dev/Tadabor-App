"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Modal, Drawer } from 'antd'
import useIsMobile from '@/app/core/hooks/use-is-mobile'

interface ModalContextType {
  openUI: (content: ReactNode) => void
  closeUI: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<ReactNode | null>(null)

  const openUI = (modalContent: ReactNode) => {
    setContent(modalContent)
    setIsOpen(true)
  }

  const closeUI = () => {
    setIsOpen(false)
    setContent(null)
  }

  return (
    <ModalContext.Provider value={{ openUI, closeUI }}>
      {children}
      {isMobile ? (
        <Drawer
          open={isOpen}
          onClose={closeUI}
          placement="bottom"
          height="auto"
          className="max-w-[400px] mx-auto"
          headerStyle={{ display: 'none' }}
          bodyStyle={{ padding: 0 }}
        >
          {content}
        </Drawer>
      ) : (
        <Modal
          open={isOpen}
          onCancel={closeUI}
          footer={null}
          className="max-w-[400px]"
        >
          {content}
        </Modal>
      )}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}