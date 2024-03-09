
import { db } from "@/drizzle/db";
import { auth, users } from "@/drizzle/schema";

export default async function Index() {
  const employees = await db.select().from(users);
  console.log(employees)
  return (
    <h1>Log in</h1>
  );
}
