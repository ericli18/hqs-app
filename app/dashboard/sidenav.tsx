'use client';
import Link from 'next/link';
import NavLinks from './nav-links';
import { PowerIcon } from 'lucide-react';
import Image from 'next/image';
import { signout } from './actions';

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link className="mb-2 grid h-20 place-items-center rounded-md bg-gray-50 p-4 md:h-40" href="/">
                <div className="w-32 text-white md:w-40"></div>
                <Image src="/hqs_logo.png" alt="" height={100} width={200} />
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <form action={signout}>
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
        </div>
    );
}
