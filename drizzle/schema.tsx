import { pgTable, text, uuid, smallint, smallserial, timestamp, bigserial } from 'drizzle-orm/pg-core';

export const employees = pgTable('employees', {
    id: uuid('id').primaryKey(),
    first_name: text('first_name').notNull(),
    last_name: text('last_name').notNull(),
    hqs_id: text('hqs_id').notNull(),
    location: smallint('location')
        .references(() => locations.location_id)
        .notNull(),
});

export const locations = pgTable('locations', {
    location_id: smallserial('location_id').primaryKey(),
    name: text('name').notNull(),
    created_at: timestamp('created_at'),
});

export const shifts = pgTable('shifts', {
    shift_id: bigserial('shift_id', { mode: 'bigint' }).primaryKey(),
    start_time: timestamp('start_time'),
    end_time: timestamp('end_time'),
    shift_type: smallint('shift_type'),
    employee_id: uuid('employee_id').references(() => employees.id),
});

export const shift_types = pgTable('shift_types', {
    shift_type_id: smallserial('shift_type_id').primaryKey(),
    label: text('label').notNull(),
});
