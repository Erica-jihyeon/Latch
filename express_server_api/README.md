1. db create
psql
CREATE DATABASE final OWNER labber;

2. db reset
psql -d final -U labber
(enter the password => labber)

\i ./src/db/schema/create.sql
\i ./src/db/seeds/seeds.sql