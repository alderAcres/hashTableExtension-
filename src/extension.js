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
  this.SIZE = 4;

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
  // generate index using hashCode
  let hashIndex = hashCode(key, this.SIZE);

  // if an object does not exist at this index, create one
  if (typeof this.storage[hashIndex] !== 'object') this.storage[hashIndex] = {};

  // within the object at this index, assign the original key, value pair
  this.storage[hashIndex][key] = value;

  // if size now over 75%, double size and rehash items
  // Check if storage is over 75% full
  if (Object.keys(this.storage).length / this.SIZE > 0.75) {
    // double size
    this.SIZE *= 2;

    // iterate over storage and rehash elements
    this.rehash();
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
  // generate index using hashCode
  let hashIndex = hashCode(key, this.SIZE);

  // access hashTable storage at index hashIndex, return value associated with the key
  return this.storage[hashIndex][key];
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
  // generate index using hashCode
  let hashIndex = hashCode(key, this.SIZE);

  // access hash table storage at the generated index and delete the input key
  delete this.storage[hashIndex][key];

  // if the object at the generated index is now empty, delete the key hashIndex from hash table storage
  if (Object.keys(this.storage[hashIndex]).length == 0)
    delete this.storage[hashIndex];

  if (Math.floor(Object.keys(this.storage).length / this.SIZE) < 0.25) {
    this.SIZE /= 2;

    this.rehash();
  }
};

HashTable.prototype.rehash = function () {
  let newStorage = {};
  for (let hashKey of Object.keys(this.storage)) {
    // iterate over every key value pair within each hashKey
    for (let [rehashKey, rehashValue] of Object.entries(
      this.storage[hashKey]
    )) {
      // generate rehash index using hashCode
      let rehashIndex = hashCode(rehashKey, this.SIZE);

      if (typeof newStorage[rehashIndex] !== 'object')
        newStorage[rehashIndex] = {};

      newStorage[rehashIndex][rehashKey] = rehashValue;
    }
  }

  this.storage = newStorage;
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
