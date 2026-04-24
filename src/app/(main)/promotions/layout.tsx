import React from 'react'
export default function PromotionsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full bg-[#0a0d14] text-white">
            <div className="max-w-7xl mx-auto px-0 md:px-0 py-6">
                {children}
            </div>
        </div>
    )
}
