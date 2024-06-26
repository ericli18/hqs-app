import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page() {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();
    if (data?.user) {
        redirect('/dashboard');
    }

    return (
        <main className="flex min-h-screen flex-col p-6">
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-cyan-900 p-4 md:h-52"></div>
            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
                <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
                    <Image src="/hqs_logo.png" alt="" height={100} width={200} />
                    <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
                        Welcome to the HQS Dashboard
                    </p>
                    <Link
                        href="/login"
                        className="flex items-center gap-5 self-start rounded-lg bg-cyan-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                    >
                        <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
                    </Link>
                </div>
                <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
                    {/* Add Hero Images Here */}
                </div>
            </div>
        </main>
    );
}
