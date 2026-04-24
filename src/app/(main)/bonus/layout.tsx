import React from 'react'
export default function PromotionsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full mt-[40px] md:mt-[66px] bg-[#0a0d14] text-white">
            <div className="max-w-7xl mx-auto px-4 md:px-4 py-6">
                {children}
            </div>
        </div>
    )
}
