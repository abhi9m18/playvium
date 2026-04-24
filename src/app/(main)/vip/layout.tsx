import React from 'react'
export default function VipLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full bg-[#0a0d14] text-white">
            <div className="max-w-7xl mx-auto px-3  md:px-6 py-6 mt-[60px] ">
                {children}
            </div>
        </div>
    )
}
