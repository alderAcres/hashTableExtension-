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
HashTable.prototype.set = function(key, value) {
  // establish index based through hashCode function
  const index = hashCode(key, this.SIZE);
  // locate index of HashTable array and determine if it is empty (undefined)
  if (!this.storage[index]) {
    // if empty, create new object w/ new key/val property and add to array
    const newObj = {}; // create new empty object
    newObj[key] = value; // add property
    this.storage[index] = newObj; // add object to array index
  }
  // else, simply add the new property to preexisting object
  this.storage[index][key] = value;
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
  // establish index based through hashCode function
  const index = hashCode(key, this.SIZE);
  // locate index of HashTable array and return result at index or undefined if empty
  return this.storage[index] ? this.storage[index][key] : undefined;
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
  // establish index based through hashCode function
  const index = hashCode(key, this.SIZE);
  // locate index of HashTable array and determine if it is empty (undefined)
  if (!this.storage[index]) {
    return undefined;
  } else { // else, delete and return key/val pair;
    const removed = this.storage[index][key]; // create copy of property to be deleted in order to ultimately return;
    delete this.storage[index][key]; // delete key/val pair
    return removed;
  }
};

// Do not modify
function hashCode(string, size) {
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

// Do not remove!!
module.exports = HashTable;
