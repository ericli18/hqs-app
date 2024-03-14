import LoginForm from "./LoginForm";
import { createClient } from "@/utils/supabase/server";

const Page = async() => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return <LoginForm user={user} />
}

export default Page;