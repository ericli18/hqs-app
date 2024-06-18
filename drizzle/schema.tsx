import { pgTable, text, uuid, smallint, smallserial, timestamp, bigserial } from 'drizzle-orm/pg-core';

export const employees = pgTable('employees', {
    id: uuid('id').primaryKey(),
    first_name: text('first_name').notNull(),
    last_name: text('last_name').notNull(),
    hqs_id: text('hqs_id').notNull(),
    location: smallint('location')
        .references(() => locations.location_id)
        .notNull(),
    role: smallint('role')
        .references(() => roles.role_id)
        .notNull(),
});

export const locations = pgTable('locations', {
    location_id: smallserial('location_id').primaryKey(),
    name: text('name').notNull(),
    created_at: timestamp('created_at'),
});

export const clocks = pgTable('clocks', {
    clock_id: bigserial('clock_id', { mode: 'bigint' }).primaryKey(),
    clock_time: timestamp('clock_time'),
    clock_type: smallint('clock_type'),
    employee_id: uuid('employee_id').references(() => employees.id),
    supervisor_id: uuid('supervisor_id').references(() => employees.id),
    location: smallint('location_id').references(() => locations.location_id),
});

export const clock_types = pgTable('clock_types', {
    clock_type_id: smallserial('clock_type_id').primaryKey(),
    label: text('label').notNull(),
});

export const roles = pgTable('roles', {
    role_id: smallserial('role_id').primaryKey(),
    name: text('name').notNull(),
    created_at: timestamp('created_at'),
});
