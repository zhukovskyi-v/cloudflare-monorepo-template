import {FC, PropsWithChildren} from "react";

const Layout: FC<PropsWithChildren> = ({children}) => {
    return <div className="min-h-dvh bg-[#0a0a0a] text-[#fafafa]">
        <header className="sticky top-0 z-50 border-b border-white/6 bg-[#0a0a0a]/80 backdrop-blur-xl">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
                <a href="/" className="flex items-center gap-2.5 cursor-pointer">
                    <div
                        className="flex size-7 items-center justify-center rounded-lg bg-linear-to-b from-orange-500 to-orange-600 shadow-[0_0_12px_rgba(249,115,22,0.3)]">
                        <svg
                            className="size-3.5 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                        </svg>
                    </div>
                    <span className="text-sm font-semibold tracking-tight">
                            CF Stack
                        </span>
                </a>
                <span className="text-xs text-[#888]">Orpc</span>
            </div>
        </header>
        {children}
    </div>
}

export default Layout;
