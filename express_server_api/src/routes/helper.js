
let queue = []; //all the playlist who pressed the start button
let paired = [];
const { v1: uuidv1 } = require('uuid');

const findMatching = (user) => {

  let expectedOption = 0;
  let expectedLanguageKey = 0;
  let selectedLanguage = '';

  if (user.option === '1') {
    expectedOption = '2';
    expectedLanguageKey = 'learning';
    selectedLanguage = user.speaking;

  } else if (user.option === '2') {
    expectedOption = '1';
    expectedLanguageKey = 'speaking';
    selectedLanguage = user.learning;

  } else if (user.option === '3') {
    expectedOption = '3';
    expectedLanguageKey = 'speaking';
    selectedLanguage = user.learning;

  } else {
    //send error to the client
    expectedOption = null;
    expectedLanguageKey = null;
    selectedLanguage = null;
  }

  const matchedUser = queue.find(client => client.option === expectedOption && client[expectedLanguageKey] === selectedLanguage);



  if (matchedUser) {
    // if find the matched user, creat the room

    let roomId = uuidv1();
    paired.push({ match1: user, match2: matchedUser, roomId: roomId });
    const userIndex = queue.findIndex((index => index === matchedUser));
    queue.splice(userIndex, 1);
    // add to the DB!!!

    // console.log(paired);
  } else {
    // if can not find matched user, add to the queue
    console.log('no matching')
    queue.push(user);
  }

}

module.exports = { findMatching, queue, paired }