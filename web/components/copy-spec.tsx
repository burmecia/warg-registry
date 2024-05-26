"use client"

import { useState } from 'react'
import { Clipboard, ClipboardCheck } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'

export default function CopySpecButton({ spec }: { spec: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = (s: string) => {
    navigator.clipboard.writeText(s);
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 5000)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isCopied}
      onClick={() => copyToClipboard(spec)}
    >
      <div className="flex flex-row gap-1">
      {isCopied ? (
        <>
          <ClipboardCheck />
          <span className="leading-6">Copied</span>
        </>
      ) : (
        <>
          <Clipboard  />
          <span className="leading-6">Copy</span>
        </>
      )}
      </div>
    </Button>
  );
}
