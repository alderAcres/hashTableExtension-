/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;
  this.usage = 0; //count track of usage
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
  //initialize index to result of passing in key and size to hashcode
  const index = hashCode(key, this.SIZE);
  //check if provided key has already been used to store another value
  if (this.storage[index]) {
    //overwrite the existing value with the new value
    this.storage[index][key] = value;
  } else {
    //create a new object with key/value pair
    this.storage[index] = { [key]: value };
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
HashTable.prototype.get = function(key) {
  //initialize index to result of passing in key and size to hashCode
  const index = hashCode(key, this.SIZE);
  //check for value in hash table with passed in key
  if (this.storage[index]) {
    return this.storage[index][key];
    //if doesn't exist, return undefined
  } else {
    return undefined;
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
HashTable.prototype.remove = function(key) {
  //assign variable to key/value pair from the hashtable
  let keyFound = this.get(key);
  //set the value to undefined
  this.set(key, undefined);
  //return the value deleted from the hashtable
  return keyFound;
};

// Do not modify
function hashCode(string, size) {
  "use strict";

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
