-- Users table seeds
INSERT INTO users (username, password, email) VALUES ('Lloyd', 'Christmas', 'lloyd_christmas@dd.com');
INSERT INTO users (username, password, email) VALUES ('Harry', 'Dunne', 'harry_dunne@dd.com');
INSERT INTO users (username, password, email) VALUES ('Marry', 'Swanson', 'marry_swanson@dd.com');
INSERT INTO users (username, password, email) VALUES ('Joe', 'Mentalino', 'joe_mentalino@dd.com');
INSERT INTO users (username, password, email) VALUES ('Sea', 'Bass', 'sea_bass@dd.com');


INSERT INTO languages (language_name) VALUES ('Korean');
INSERT INTO languages (language_name) VALUES ('English');
INSERT INTO languages (language_name) VALUES ('Spanish');
INSERT INTO languages (language_name) VALUES ('French');

INSERT INTO user_option (user_id, learning_language, First_Sec_language, option_selected) VALUES (1, 'Korean', 'English', 2);
INSERT INTO user_option (user_id, learning_language, First_Sec_language, option_selected) VALUES (2, 'English', 'Korean', 1);
INSERT INTO user_option (user_id, learning_language, First_Sec_language, option_selected) VALUES (3, 'Spanish', 'French', 3);
INSERT INTO user_option (user_id, learning_language, First_Sec_language, option_selected) VALUES (4, 'French', 'Spanish', 1);