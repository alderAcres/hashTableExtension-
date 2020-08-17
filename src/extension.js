/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW
function HashTable() {
  this.SIZE = 16;

  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function (key, value) {
  // check to see if adding new key value pair pushs number of utilized HashTable indeces to 75%
    // if so, then double this.SIZE and rehash everything

  // to check utilization of indeces, perhaps loop through and check how many are used


  // initialize variable assigned to eval result of invoking hashCode function with args
  const result = hashCode(key, this.SIZE);


  // use variable to check where to place key: value pair inside hash table
  // check if there is a key: value pair at hashtable index
  if (!this.storage[result]) {
    // if not, means it is empty and we should initialize an empty object to store info
    this.storage[result] = {};
    this.storage[result][key] = value;
  } else {
    // if there is, then object has already been created, and we can simply add key: value pair to object
    this.storage[result][key] = value;
  }
};

const boo = new HashTable();
boo.set('5', 27);
// I think I have an issue where if I enter the same key, it will overwrite from previous same key
boo.set('5', 42);
boo.set('9', 17);
boo.set('15', 57);

console.log(boo.storage);

HashTable.prototype.get = function (key) {
  // initialize variable set to eval result of hashCode invokation with provided parameter
  const result = hashCode(key, this.SIZE);
  // console.log(result);
  // use hashCode result && initial key to -> check HashTable index and then check
  // if that initial key exists in an object
  // if yes, return that associated value
  if (this.storage[result][key]) {
    return this.storage[result][key];
  }
  // if (!this.storage[result][key]) console.log('Sorry that key does not exist in the HashTable');
};

console.log(boo.get('5'));

HashTable.prototype.remove = function (key) {
  // initialize variable set to eval result of hashCode invokation with provided parameter
  const result = hashCode(key, this.SIZE);
  let temp;

  // check to see if key exists in HashTable, if so delete key inside object at HashTable
  if (this.storage[result][key]) {
    temp = this.storage[result][key];
    delete this.storage[result][key];
  }
  // return temp, whether undefined or actual value;
  return temp;
};
boo.remove('5');
console.log(boo.storage);

// YOUR CODE ABOVE

function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
