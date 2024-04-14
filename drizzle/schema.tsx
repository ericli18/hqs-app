import { pgTable, text, uuid, smallint, smallserial, timestamp } from 'drizzle-orm/pg-core';

export const employees = pgTable('employees', {
    id: uuid('id').primaryKey(),
    first_name: text('first_name'),
    last_name: text('last_name'),
    hqs_id: text('hqs_id'),
    location: smallint('location').references(() => locations.location_id),
});

export const locations = pgTable('locations', {
    location_id: smallserial('location_id').primaryKey(),
    name: text('name'),
    created_at: timestamp('created_at'),
});
