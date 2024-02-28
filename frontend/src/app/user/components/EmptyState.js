import React from 'react'

const EmptyState = () => {
    return (
        <>
            <div className="flex justify-center items-center h-screen ">
                <div className="text-center items-center flex flex-col">
                    <span className="text-base md:text-lg font-semibold text-slate-300">
                        No chat selected
                    </span>
                </div>
            </div>
        </>
    )
}

export default EmptyState