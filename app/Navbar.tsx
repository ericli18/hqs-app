import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";


const Navbar = async () => {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    const signOut = async () => {
        "use server";
    
        const supabase = createClient();
        await supabase.auth.signOut();
        return redirect("/login");
      };
    return (
        <nav className="min-w-full">
            <ul className="min-w-full flex items-center justify-evenly">
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/dashboard/signup"}>Create a user</Link>
                </li>
                <li>
                    {(user ? <Link href="/u/profile"
                        className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                        Profile</Link>
                        :
                        <Link href="/login"
                            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                            Login</Link>)}

                </li>
                {user ?
                    <li><form action={signOut}><Button variant="ghost" >Sign out</Button></form></li>
                    : null}
            </ul>
        </nav>
    )
}

export default Navbar;