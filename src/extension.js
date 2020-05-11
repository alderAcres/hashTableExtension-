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

HashTable.prototype.addKey = function (key, value) {
  // run the key through the hash function and store the result to a variable
  // this value will be the location in the array that we stored the value
  let hashedKey = hashCode(key, this.SIZE);
  // if the value in that location of the array is undefined then set it equal to the key/value pair
  if (!this.storage[hashedKey]) {
    let obj = {};
    obj[key] = value;
    this.storage[hashedKey] = obj;
  } else {
    // if there is already a key/value pair in that location
    // overwrite the value if the existing key is the same as the new key
    // add the new key/value pair to the object if that key doesn't exist in the object
    this.storage[hashedKey][key] = value;
  }
};

HashTable.prototype.set = function (key, value) {
  // count number of full values in storage array
  let fullCount = 0;
  for (let i = 0; i <= this.SIZE; i++) {
    if (this.storage[i]) {
      fullCount++;
    }
  }
  console.log(fullCount);

  // determine if we need to increase the size of the hash table
  // check if adding an additional element will push the hashtable to capacity to be over 75%
  if (fullCount / this.SIZE > 0.75) {
    console.log('hello');
    // if so, save the storage array to a new variable
    let oldHashTable = this.storage.slice();
    // reset the storage size to be current size times two
    this.SIZE = this.SIZE * 2;
    this.storage = new Array(this.SIZE);
    console.log(oldHashTable);
    // iterate through every nested key/value pair within each element of the array
    // run each key/value pair through the addKey function
    for (let i = 0; i <= oldHashTable.length; i++) {
      let arrayElem = oldHashTable[i];
      if (typeof arrayElem === 'object') {
        for (let j in arrayElem) {
          this.addKey(j, arrayElem[j]);
        }
      }
    }
  }
  // run the addKey function to add the new key
  this.addKey(key, value);
};

// let testHash = new HashTable();
// testHash.storage = [
//   { q: 2 },
//   { w: 2 },
//   { e: 2 },
//   { r: 2 },
//   { t: 2 },
//   { y: 2 },
//   { u: 2 },
//   { q: 2 },
//   { q: 2 },
//   { q: 2 },
//   { q: 2 },
//   { q: 2 },
//   { q: 2 },
// ];
// testHash.set('tyler', 'yo');
// console.log(testHash);

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
HashTable.prototype.get = function (key) {
  let hashedKey = hashCode(key, this.SIZE);
  return this.storage[hashedKey][key];
};
// console.log(testHash)
// console.log(testHash.get('tyler'));

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  // lookup obj
  let hashedKey = hashCode(key, this.SIZE);
  let obj = this.storage[hashedKey][key];
  console.log(obj);
  // if obj doesn't exist, then return undefined
  if (obj === undefined) {
    console.log(1);
    return undefined;
  }
  // if obj does exist, delete the object and don't return any value
  else {
    delete this.storage[hashedKey][key];
  }

  // TODO later - delete empty object if there was only one key/value pair in object
};

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
