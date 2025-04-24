'use client';

import { useState } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

export function DescriptionCell({ description }: { description: string }) {
  const [open, setOpen] = useState(false);
  const isLong = description.length > 100;
  const truncated = isLong ? description.slice(0, 100) + '...' : description;

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <span
            onClick={() => isLong && setOpen(true)}
            className="cursor-pointer"
          >
            {truncated}
          </span>
        </TooltipTrigger>
        {isLong && (
          <TooltipContent className="max-w-[400px] bg-black text-white p-2 rounded">
            {description}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
