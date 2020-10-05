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
HashTable.prototype.set = function (key, value) {
  //create a index between 0 and size
  const index = this.hashCode(key, this.SIZE);
  //if index doesn't exist - initialize container  inside storage
  if (!this.storage[index]) {
    this.storage[index] = [];
    this.storage[index][key] = value;
  } else {
    this.storage[index][key] = value;
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
  //lookup the index by passing it to the hashing fuction
  const index = hashCode(key, this.SIZE);
  // //if the key exists in the index - return it
  // if (this.storage[index][key]) {
  //   return this.storage[index][key];
  // }
  //TO CHECK IF THERE ARE MORE THAN ONE VALUE
  //create a variable for the inner array
  const indexAtInd = this.storage[index];
  // if index exists return value
  if (indexAtInd) {
    //loop through and find the value
    for (let i = 0; i < indexAtInd; i++) {
      const keyValArr = indexAtInd[i];
      // first value is a key
      if (keyValArr[0] === key) return keyValArr[i];
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
  // lookup the index
  const index = hashCode(key, this.SIZE);
  //create a variable that copies the pair
  let removed = this.storage[index][key];
  //check if key-value pair exists
  if (this.storage[index][key]) {
    //if empty - indefined
    return undefined;
  } else {
    //otherwise - delete pair from the index
    delete this.storage[index][key];
  }
  // return removed variable
  return removed;
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
