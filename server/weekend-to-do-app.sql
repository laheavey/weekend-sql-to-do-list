CREATE TABLE "task_list" (
  "id" SERIAL PRIMARY KEY,
  "status" VARCHAR(500) NOT NULL,
  "task" VARCHAR(500) NOT NULL,
  "due_date" VARCHAR(500)
);

INSERT INTO "task_list"
  ("status", "task", "due_date")
  VALUES
  ('INCOMPLETE', 'Water plants', '2022-12-19'),
  ('INCOMPLETE', 'Pay bills', '2022-12-19'),
  ('INCOMPLETE', 'Pack lunch', '2022-12-19');