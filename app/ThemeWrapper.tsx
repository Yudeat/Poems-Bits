'use client'

import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeClientWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {mounted && children}
    </ThemeProvider>
  )
}
