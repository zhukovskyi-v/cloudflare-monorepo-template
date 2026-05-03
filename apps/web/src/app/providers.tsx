'use client'
import {FC, PropsWithChildren} from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {queryClient} from "@/lib/orpc";
import {Toaster} from "@/components/ui/sonner";

export const Providers: FC<PropsWithChildren> = ({children}) => {
    return <>
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools/>
        </QueryClientProvider>
        <Toaster richColors/>
    </>
}
