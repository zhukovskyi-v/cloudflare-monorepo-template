import React from "react";
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"

// Omit `strokeWidth` from incoming svg props so spreading `props` can't
// accidentally pass a string `strokeWidth` (React's SVG prop types allow
// string | number) which would conflict with HugeiconsIcon's
// `strokeWidth?: number` expectation.
function Spinner({ className, ...props }: Omit<React.ComponentProps<"svg">, "strokeWidth">) {
  return (
    <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
