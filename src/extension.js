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
  this.numUnique = 0;
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
  if (key === undefined) return console.log('Please enter a value for the key'); // the value can techinically be undefined
  const hashKey = hashCode(key, this.SIZE);
  if (this.storage[hashKey] === undefined) {
    this.storage[hashKey] = {};
    this.numUnique += 1;
  }
  this.storage[hashKey][key] = value;
  // Hash table size rehash
  if (this.numUnique / this.SIZE > 0.75) {
    this.reHash(this.storage, this.SIZE);
  }
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
HashTable.prototype.get = function (key) {
  if (key === undefined) return console.log('Please enter a valid key');
  if (this.storage !== undefined) {
    const hashKey = hashCode(key, this.SIZE * 2);
    return this.storage[hashKey][key];
  }
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
  if (key === undefined) return console.log('Please enter a valid key');
  if (this.storage !== undefined) {
    const hashKey = hashCode(key, this.SIZE);
    delete this.storage[hashKey][key];
    // if the last key in a the object this.storage[hashkey] is removed, remove the object and decrement the unique count
    if (JSON.parse(JSON.stringify(this.storage[hashKey])) === {}) {
      this.numUnique -= 1;
      // Hash table size rehash
      if (
        this.SIZE > 16 &&
        Math.floor((this.numUnique / this.SIZE) * 100) < 25
      ) {
        this.reHash(this.storage, Math.ceil(this.SIZE / 2));
      }
    }
  }
};

HashTable.prototype.reHash = function (oldTable, newSize) {
  // update this.size, refresh numUnique
  this.size = newSize;
  this.numUnique = 0;
  // Create new array that will store the new HashTable
  const newHashTable = [];
  // loop through this.storage, for each hashKey that's not undefined, loop through the object and update newHashTable and numUnique
  for (let i = 0; i < oldTable.length; i++) {
    if (oldTable[i] !== undefined) {
      for (let key of Object.keys(oldTable[i])) {
        const hashKey = hashCode(key, newSize);
        if (newHashTable[hashKey] === undefined) {
          newHashTable[hashKey] = {};
          this.numUnique += 1;
        }
        newHashTable[hashKey][key] = value;
      }
    }
  }
  this.storage = newHashTable;
};

// let newHash = new HashTable();
// newHash.set(2, 4);
// newHash.set(2, 8);
// console.log(newHash);
// console.log(newHash.get(1));
// console.log(hashCode(31, 16));

// let objtest= {'2': 3,'4':5}
// for (let key of Object.keys(objtest)){
//   console.log(key)
// }

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
