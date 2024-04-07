import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

const Navbar = async () => {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const signOut = async () => {
        'use server';

        const supabase = createClient();
        await supabase.auth.signOut();
        return redirect('/login');
    };
    return (
        <nav className="min-w-full">
            <ul className="flex min-w-full items-center justify-evenly">
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href={'/dashboard/signup'}>Create a user</Link>
                </li>
                <li>
                    {user ? (
                        <Link
                            href="/u/profile"
                            className="bg-btn-background hover:bg-btn-background-hover flex rounded-md px-3 py-2 no-underline"
                        >
                            Profile
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-btn-background hover:bg-btn-background-hover flex rounded-md px-3 py-2 no-underline"
                        >
                            Login
                        </Link>
                    )}
                </li>
                {user ? (
                    <li>
                        <form action={signOut}>
                            <Button variant="ghost">Sign out</Button>
                        </form>
                    </li>
                ) : null}
            </ul>
        </nav>
    );
};

export default Navbar;
