'use client';

import { Users, HomeIcon, BookText, CalendarClock, Clock4 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'Shifts', href: '/dashboard/shifts', icon: CalendarClock },
    { name: 'Availability', href: '/dashboard/availability', icon: Clock4 },
    {
        name: 'Clocks',
        href: '/dashboard/clocks',
        icon: BookText,
    },
    { name: 'Employees', href: '/dashboard/employees', icon: Users },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-sky-100 text-blue-600': pathname === link.href,
                            }
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
