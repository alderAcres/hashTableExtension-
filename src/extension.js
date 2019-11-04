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

/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;
  this.length = 0;

  this.storage = new Array(this.SIZE);
}

/**
 * set - Adds given value to the hash table with specified key.
 *
 * - If the provided key has already been used to store another value, simply overwrite
 *   the existing value with the new value.
 * - If the hashed address already contains another key/value pair, you must handle
 *   the collision appropriately.
 *
 * @param {string} key - key to be used to create hashed address
 * @param {string|number|boolean} value - value to be stored in hash table
 * @return {number} The new number of items stored in the hash table
 */
HashTable.prototype.set = function(key, value) {
  //if length becomes 3/4 of total size
  if (this.length > this.SIZE * (3 / 4)) {
    //deep clone oldHash
    let oldHash = JSON.parse(JSON.stringify(this.storage));
    console.log(oldHash);
    let oldHashArr = Object.entries(oldHash);
    console.log(oldHashArr);
    //reset SIZE and Storage
    this.SIZE = this.SIZE * 2;
    this.storage = new Array(this.SIZE);
    this.length = 0;

    //check for key/value pairs and put them into new storage
    oldHashArr.forEach(value => {
      if (value[0] && value[1]) {
        this.set(value[0], value[1]);
        this.length += 1;
      }
    });

    this.set(key, value);
  }
  let index = hashCode(key, this.SIZE);

  if (!this.storage[index]) {
    //create bucket if it doesn't exist
    this.storage[index] = {};
    //add key/value pair
    this.storage[index][key] = value;
    this.length += 1;
  } else {
    //add key value pair
    this.storage[index][key] = value;
    this.length += 1;
  }
  return this.length;
};

/**
 * get - Retrieves a value stored in the hash table with a specified key
 *
 * - If more than one value is stored at the key's hashed address, then you must retrieve
 *   the correct value that was originally stored with the provided key
 *
 * @param {string} key - key to lookup in hash table
 * @return {string|number|boolean} The value stored with the specifed key in the
 * hash table
 */
HashTable.prototype.get = function(key) {
  //run key through function
  let index = hashCode(key, this.SIZE);
  //lookup bucket and return the value stored at given key
  let bucket = this.storage[index];
  return bucket[key];
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function(key) {
  let index = hashCode(key, this.SIZE);

  if (!this.storage[index][key]) {
    return undefined;
  }

  let value = this.storage[index][key]; //set new variable to value at the index of storage
  delete this.storage[index][key];
  this.length -= 1;
  return value;
};

// Do not modify
function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

const testHash = new HashTable();
console.log(testHash.set(1, 4));
testHash.set(0, 1);
testHash.set(1, 2);
testHash.set(2, 3);
testHash.set(3, 4);
testHash.set(4, 5);
testHash.set(5, 6);
testHash.set(6, 7);
testHash.set(7, 8);
testHash.set(8, 9);
testHash.set(9, 10);
testHash.set(10, 11);
testHash.set(11, 12);
testHash.set(0, 13);
testHash.set(0, 14);
testHash.set(0, 15);
console.log(testHash.length);

// Do not remove!!
module.exports = HashTable;

// YOUR CODE ABOVE

function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
