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
function HashTable () {
  this.SIZE = 16;
  this.numberStored = 0;
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
HashTable.prototype.set = function (key, value) {
  if (this.numberStored + 1 > .75 * this.SIZE) {
    const tempArray = new Array(this.SIZE * 2);
    for (let i = 0; i < this.SIZE * 2; i++) tempArray[i] = {};
    for (let i = 0; i < this.SIZE; i++) {
      if (!(this.storage[i] === undefined)) {
        for (k in this.storage[i]) {
          const newKey = hashCode(k, this.SIZE * 2);
          tempArray[newKey][k] = this.storage[i][k];
        }
      }
    }
    this.storage = tempArray;
    this.SIZE *= 2;
  }
  const HASHED_KEY = hashCode(key, this.SIZE);
  if (this.storage[HASHED_KEY] === undefined) this.storage[HASHED_KEY] = {};
  this.storage[HASHED_KEY][key] = value;
  this.numberStored += 1;
  return this.numberStored;
};

/**
* get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed address, then you must
*   retrieve the correct value that was originally stored with the provided key
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/
HashTable.prototype.get = function (key) {
  const HASHED_KEY = hashCode(key, this.SIZE);
  return this.storage[HASHED_KEY][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  // If the hash table's SIZE is greater than 16 and the result of removing the
  // item drops the number of stored items to be less than 25% of the hash table's SIZE
  // (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.

  const HASHED_KEY = hashCode(key, this.SIZE);
  if (this.storage[HASHED_KEY] === undefined || Object.keys(this.storage[HASHED_KEY]).length === 0) return undefined;
  const TO_BE_RETURNED = this.storage[HASHED_KEY][key];
  delete this.storage[HASHED_KEY][key];
  this.numberStored -= 1;
  return TO_BE_RETURNED;
};


// Do not modify
function hashCode (string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}
// YOUR CODE ABOVE

function hashCode (string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not removeconst hast = !!
module.exports = HashTable;

for (let i = 0; i < 15; i++) {
  hash1.set('hello ' + i, i);
}
