
import { db } from "@/drizzle/db";
import { auth, users } from "@/drizzle/schema";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const employees = await db.select().from(users);
  console.log(employees)
  const supabase = createClient();
  const user  = await supabase.auth.getUser()
  console.log(user)
  return (
    <h1>Log in</h1>
  );
}
