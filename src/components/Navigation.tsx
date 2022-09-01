import React from 'react';
import { NavLink } from 'react-router-dom';

const activeLinkClasses = (isActive: boolean) => (isActive ? 'border-b border-red-300' : 'text-white');

function Navigation() {
    return (
        <nav className={'flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white'}>
            <h3>Github Search</h3>

            <span>
                <NavLink
                    to={'/'}
                    className={({ isActive }) => `${activeLinkClasses(isActive)} mr-2`}
                >
                    Home
                </NavLink>
                <NavLink
                    to={'/favourites'}
                    className={({ isActive }) => activeLinkClasses(isActive)}>
                    Favourites
                </NavLink>
            </span>
        </nav>
    );
}

export default Navigation;
