const AddUserOptionsToDB = (client, db) => {

  const queryFindUser = `SELECT id FROM user_option WHERE user_id = $1`;
  const paramFindUser = [client.userId];

  const queryUpdateUserOpt = `UPDATE user_option SET learning_language=$1, First_Sec_language=$2, option_selected=$3 WHERE user_id=$4 RETURNING*`;
  const paramUpdateUserOpt = [client.learning, client.speaking, Number(client.option), client.userId]

  const queryInsertUserOpt = `INSERT INTO user_option (user_id, learning_language, First_Sec_language, option_selected) VALUES ($1, $2, $3, $4);`;
  const paramInsertUserOpt = [Number(client.userId), client.learning, client.speaking, Number(client.option)]



  return db
    .query(queryFindUser, paramFindUser)
      .then((data) => {
        if (data.rows.length > 0) {
          db.query(queryUpdateUserOpt, paramUpdateUserOpt)
            .then((data) => {
              console.log('user_option update');
            })
          
        } else {
          db.query(queryInsertUserOpt, paramInsertUserOpt)
            .then((data) => {
              console.log('user_option insert');
            })          
        }
      })
      .catch(err => {
        console.log(err);
      })
};

module.exports = { AddUserOptionsToDB }