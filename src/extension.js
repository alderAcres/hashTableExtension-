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
  this.count = 0;
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
HashTable.prototype.rehash = function (mult) {
  // Store old array
  const oldArr = this.storage;

  // Resize array and reset count
  this.SIZE = mult * this.SIZE;
  this.count = 0;
  this.storage = new Array(this.SIZE);

  // Loop through old array to rehash old values
  for (let i in oldArr) {
    for (let key in oldArr[i]) {
      this.set(key, oldArr[i][key]);
    }
  }

  // Return new storage array
  return this.storage;
};
HashTable.prototype.set = function (key, value) {
  // Rehash
  if (this.count >= 0.75 * this.SIZE) this.rehash(2);

  // Main hashing
  this.count++;
  const index = hashCode(key, this.SIZE);
  if (!this.storage[index]) this.storage[index] = {};
  this.storage[index][key] = value;
  return this.storage;
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
  // Get index via hash function
  const index = hashCode(key, this.SIZE);

  // Return stored value
  return this.storage[index][key];
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
  // Find value via hash function
  const index = hashCode(key, this.SIZE);
  const removedVal = this.storage[index][key];

  // Checking if value is defined
  if (removedVal === undefined) return undefined;

  // If defined, remove and decriment count
  delete this.storage[index][key];
  this.count--;

  // Check resize conditions
  if (this.SIZE > 16 && this.count < 0.25 * this.SIZE) this.rehash(0.5);

  // Return removed value
  return removedVal;
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

// Do not remove!!

let hash = new HashTable();

hash.set('1', 123);
console.log(hash.rehash(2));
console.log(hash);
console.log(hash.remove('1'));
console.log(hash);
hash.set('2', 123);
hash.set('3', 123);
hash.set('4', 123);
hash.set('5', 123);
hash.set('6', 123);
hash.set('7', 123);
hash.set('8', 123);
hash.set('9', 123);
hash.set('10', 123);

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
