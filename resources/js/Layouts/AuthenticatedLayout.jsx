import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-800 via-gray-300 to-black sm:justify-center sm:pt-0">
            <nav className="border-b border-black bg-gray-800 shadow-md">
                <div className="mx-auto max-w-7md px-4 sm:px-6 lg:px-8">
                    <div className="flex h-15 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-14 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-5 sm:-my-px sm:ms-10 sm:flex ">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    style={{ fontFamily: 'Bungee, cursive' }}
                                >
                                    My Expenses
                                </NavLink>

                                <NavLink
                                    href={route('modification')}
                                    active={route().current('modification')}
                                    style={{ fontFamily: 'Bungee, cursive' }}
                                >
                                    Expenses Modification
                                </NavLink>

                                <NavLink
                                    href={route('history')}
                                    active={route().current('history')}
                                    style={{ fontFamily: 'Bungee, cursive' }}
                                >
                                    Expenses History
                                </NavLink>

                                <NavLink
                                    href={route('income')}
                                    active={route().current('income')}
                                    style={{ fontFamily: 'Bungee, cursive' }}
                                >
                                    My Income
                                </NavLink>

                                <NavLink
                                    href={route('investment')}
                                    active={route().current('investment')}
                                    style={{ fontFamily: 'Bungee, cursive' }}
                                >
                                    My Investment
                                </NavLink>

                            </div>
                        </div>

                        <div className="hidden sm:ms-8 sm:flex sm:items-center">
                            <div className="relative ms-7">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            My Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            My Expenses
                        </ResponsiveNavLink>
                        
                        <ResponsiveNavLink
                            href={route('history')}
                            active={route().current('history')}
                        >
                            Expenses History
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('modification')}
                            active={route().current('modification')}
                        >
                            Expenses Modification
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('income')}
                            active={route().current('income')}
                        >
                            My Income
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('investment')}
                            active={route().current('investment')}
                        >
                           My Investment
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                My Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>

            <footer className="bg-gray-800 text-white text-center py-4 border-t border-black mt-auto shadow-md">
                © 2025 My Expenses. All rights reserved.
            </footer>
        </div>
    );
}
