ALTER TABLE locations
ADD COLUMN timezone VARCHAR(50) NOT NULL DEFAULT 'UTC';