-- Users table seeds
INSERT INTO users (username, password, email) VALUES ('Lloyd', 'Christmas', 'lloyd_christmas@dd.com');
INSERT INTO users (fusername, password, email) VALUES ('Harry', 'Dunne', 'harry_dunne@dd.com');
INSERT INTO users (username, password, email) VALUES ('Marry', 'Swanson', 'marry_swanson@dd.com');
INSERT INTO users (username, password, email) VALUES ('Joe', 'Mentalino', 'joe_mentalino@dd.com');
INSERT INTO users (username, password, email) VALUES ('Sea', 'Bass', 'sea_bass@dd.com');


INSERT INTO languages (language_name) VALUES ('Korean');
INSERT INTO languages (language_name) VALUES ('English');
INSERT INTO languages (language_name) VALUES ('Spanish');
INSERT INTO languages (language_name) VALUES ('Franch');

INSERT INTO user_option (user_id, learning_language_id, First_Sec_language_id, option_selected) VALUES (1, 1, 2, 2);
INSERT INTO user_option (user_id, learning_language_id, First_Sec_language_id, option_selected) VALUES (2, 2, 1, 2);
INSERT INTO user_option (user_id, learning_language_id, First_Sec_language_id, option_selected) VALUES (3, 3, 2, 3);
INSERT INTO user_option (user_id, learning_language_id, First_Sec_language_id, option_selected) VALUES (4, 2, 3, 3);
INSERT INTO user_option (user_id, learning_language_id, First_Sec_language_id, option_selected) VALUES (5, 2, 1, 1);
INSERT INTO user_option (user_id, learning_language_id, First_Sec_language_id, option_selected) VALUES (6, 1, 2, 1);


