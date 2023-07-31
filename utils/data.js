const names = [
  'Tristen',
  'Draven',
  'Christian',
  'Reuben',
  'Dax',
  'Jadon',
  'Adriel',
  'Marcos',
  'Franklin',
  'David',
  'Colby',
  'Zayden',
  'Catalina',
  'Rylee',
  'Amira',
  'Abdihakim',
  'Regan',
  'Jessica',
  'Morgan',
  'Hailee',
  'Tessa',
  'Sarai',
  'Lilah',
  'Anna',
  'Valeria',
  'Coollastname',
  'enter_name_here',
  'Carney',
  'Mills',
  'Barber',
  'Brooks',
  'Macias',
  'Duran',
  'Simmons',
  'Palmer',
  'Ward',
  'Livingston',
  'Gamble',
  'Maxwell',
  'Becker',
  'Berry',
  'Cross',
  'Thompson',
  'Howe',
  'Gates',
  'Baldwin',
  'Macdonald',
  'Cummings',
  'Mcneil',
  'Rice',
  'Young',
];

const hobbyDescriptions = [
  'art',
  'blogging',
  'bowling',
  'chess',
  'cooking',
  'fashion',
  'singing',
  'qulting',
  'ceramics',
  'herping',
  'welding',
  'knitting',
  'karate',
  'writing',
  'filmmaking',
  'editing',
  'sewing',
  'drawing',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random reactions that we can add to user object.
const getRandomreactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionName: getRandomArrItem(hobbyDescriptions),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomreactions };
