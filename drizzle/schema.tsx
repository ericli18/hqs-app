
import { pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

export const auth = pgTable('users', {
  id: uuid('id')
})

export const users = pgTable('profiles', {
  id: serial('id').primaryKey().references(() => auth.id),
  first_name: text('first_name'),
  last_name: text('last_name'),
  // created_at: varchar('phone', { length: 256 }),
});
        