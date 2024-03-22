
import { db } from "@/drizzle/db";
import { auth, users } from "@/drizzle/schema";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();
  const user  = await supabase.auth.getUser()
  const email = user.data.user?.email;
  console.log(user)
  return (
    <h1>Hello {email} </h1>
  );
}
