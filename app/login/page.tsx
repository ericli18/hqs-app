import LoginForm from "./LoginForm";
import { createClient } from "@/utils/supabase/server";

const Page = async () => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="min-h-screen grid place-items-center">
            <LoginForm user={user} />
        </div>
    )
}

export default Page;