
import { db } from "@/drizzle/db";
import { auth, users } from "@/drizzle/schema";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const employees = await db.select().from(users);
  const supabase = createClient();
  const user  = await supabase.auth.getUser()
  return (
    <h1>Log in</h1>
  );
}
