"use client"

import { type ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface PortalProps {
  children: ReactNode
}

export default function Portal({ children }: PortalProps) {
  const [mounted, setMounted] = useState(false)
  const [portalRoot, setPortalRoot] = useState<Element | null>(null)

  useEffect(() => {
    const node = document.getElementById("portal-root")
    setPortalRoot(node)
    setMounted(true)
  }, [])

  if (!mounted || !portalRoot) return null

  return createPortal(children, portalRoot)
}
