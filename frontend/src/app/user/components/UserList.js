
import React from 'react'
import DesktopItem from './sidebars/DesktopItem'


const UserList = () => {
    return (
        <>
            <div className="">
                <nav className="mt-4 flex flex-col justify-between
                z-10 ">
                    <ul role="list" className="flex flex-col items-center  ">
                        {/* {routes.map((item) => ( */}
                        <DesktopItem
                        // key={item.label}
                        // href={item.href}
                        // label={item.label}
                        // icon={item.icon}
                        // active={item.active}
                        // onClick={item.onClick}
                        />
                        {/* ))} */}
                    </ul>
                </nav>

            </div>
        </>
    )
}

export default UserList