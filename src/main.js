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
  this.numItems = 0;
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
  // use hashCode to determine which index of hash table to store key
  const index = hashCode(key, this.SIZE);
  // check if index position already has value
  // if empty, then create object and store key/value pair at index
  // if not empty, then add key/value pair to existing object
  if (!this.storage[index]) {
    this.storage[index] = {
      [key]: value,
    };
  }
  this.storage[index][key] = value;
  return ++this.numItems;
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
  // use hashCode to determine which index of hash table to access
  const index = hashCode(key, this.SIZE);
  // use the index and the given key to access the value of the key
  // within the object at the calculated index
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
  // use hashCode to determine which index of hash table to access
  const index = hashCode(key, this.SIZE);
  // check if object already exists at calculated index
  if (this.storage[index]) {
    // if so, store value in const and delete key/value pair
    // and check if it has only the one key/value pair
    const returnValue = this.storage[index][key];
    if (Object.keys(this.storage[index]).length === 1) {
      // if so, delete the entire object
      delete this.storage[index];
    } else {
      // if obj has more than one key/value pair, then just delete given key/value pair
      delete this.storage[index][key];
    }
    this.numItems -= 1;
    return returnValue;
  }
  return undefined;
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
module.exports = HashTable;
