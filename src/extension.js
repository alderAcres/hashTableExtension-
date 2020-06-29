// PASTE AND MODIFY YOUR CODE BELOW

/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
// current hash size is 16, able of storing an array of 16 hashes
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

HashTable.prototype.set = function (key, value) {
  // create variable hash, get its value through hash code
  // if the hash is already in storage, then add the value that corresponds to hash
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash]) {
    this.storage[hash][key] = value;
    // else, put hash into storage, assign value to key
  } else {
    this.storage[hash] = {};
    this.storage[hash][key] = value;
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
  // pass key into the hashcode to return the hash value
  const hash = hashCode(key, this.SIZE);
  return this.storage[hash][key];
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
  const hash = hashCode(key, this.SIZE); // generate hash lookup first
  // check if key exists
  if (!this.storage[hash][key]) return undefined;
  // save removed item
  const removeItem = this.storage[hash][key];
  // delete item
  delete this.storage[hash][key];
  // return item
  return removedItem;
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

HashTable.prototype.set = function (key) {
  // evaluate the length of the result hash
  // if result hash.length/this.SIZE > 0.27, this.SIZE * 2
  // rehash
  const hash = hashCode(key, this.SIZE);
  // iterate through the elements of the storage, increment when encounter value
  // eslint-disable-next-line no-restricted-syntax
  for (let elem of this.storage) {
    // this should pull up an object
    // the object should contain a key and value
    // count the total number of key value pair and use that compare to this.SIZE
    // and ran out of time...
    // also have trouble running tests. Would love to review this.
  }
};

// Do not remove!!
module.exports = HashTable;
