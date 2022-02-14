-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users, languages, user_option CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE languages (
  id SERIAL PRIMARY KEY NOT NULL,
  language_name VARCHAR(255) NOT NULL
);

CREATE TABLE user_option (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id integer REFERENCES users(id),
  learning_language_id integer REFERENCES languages(id),
  First_Sec_language_id integer REFERENCES languages(id),
  option_selected integer NOT NULL,
  CHECK (option_selected BETWEEN 1 AND 3)
);