'use client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CircleAlert } from 'lucide-react';

export default function Hover({ content }: { content: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className='ml-auto'>
                    <CircleAlert className='text-red-500' />
                </TooltipTrigger>
                <TooltipContent side='right'>
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
