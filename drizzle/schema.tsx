import {
    pgTable,
    text,
    uuid,
    smallint,
    smallserial,
    timestamp,
    bigserial,
    bigint,
    varchar,
    integer,
    date,
    boolean,
} from 'drizzle-orm/pg-core';


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
    timezone: varchar('timezone').notNull(),
});

export const clocks = pgTable('clocks', {
    clock_id: bigserial('clock_id', { mode: 'bigint' }).primaryKey(),
    clock_time: timestamp('clock_time', {mode: 'string', withTimezone: true}).notNull(),
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

export const shifts = pgTable('shifts', {
    shift_id: bigserial('shift_id', { mode: 'bigint' }).primaryKey(),
    start_time: timestamp('start_time', { mode: 'string', withTimezone: true }).notNull(),
    end_time: timestamp('end_time', { mode: 'string', withTimezone: true }).notNull(),
    location: smallint('location').references(() => locations.location_id),
});

export const shift_assignments = pgTable('shift_assignments', {
    assignment_id: bigserial('assignment_id', { mode: 'bigint' }).primaryKey(),
    shift_id: bigint('shift_id', { mode: 'bigint' }).references(() => shifts.shift_id),
    employee_id: uuid('employee_id').references(() => employees.id),
});

export const employeeAvailabilities = pgTable(
    'employee_availabilities',
    {
        employeeAvailabilityId: integer('employee_availability_id').primaryKey().generatedAlwaysAsIdentity(),
        description: text('description').notNull(),
        startDate: date('start_date', { mode: 'string' }).notNull(),
        endDate: date('end_date', { mode: 'string' }).notNull(),
        isFullDayEvent: boolean('is_full_day_event').notNull(),
        startTime: timestamp('start_time', { mode: 'string', withTimezone: true }),
        endTime: timestamp('end_time', { mode: 'string', withTimezone: true }),
        rrule: text('rrule').notNull(),
        employeeId: uuid('id')
            .notNull()
            .references(() => employees.id, { onDelete: 'cascade' }),
    },
);

// Have to be filled in the database

export const ROLE = {
    ADMIN: 'admin',
    SUPERVISOR: 'supervisor',
    EMPLOYEE: 'employee',
};

export const ROLE_PERMISSIONS = {
    ADMIN: [ROLE.ADMIN, ROLE.SUPERVISOR, ROLE.EMPLOYEE],
    SUPERVISOR: [ROLE.SUPERVISOR, ROLE.EMPLOYEE],
    EMPLOYEE: [],
};
