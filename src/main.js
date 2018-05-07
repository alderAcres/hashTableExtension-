/* eslint-disable */
/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.numItems = 0;
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
  let binNum = hashCode(key, this.size);

  // Add new object to store things if bin was empty
  if (this.storage[binNum] === undefined) this.storage[binNum] = {};

  // Test to see if we are overwriting the key, only want to increment number of items if not overwriting
  if (this.storage[binNum][key] === undefined) this.numItems += 1;

  // Store/Overwrite key value
  this.storage[binNum][key] = value;

  // Return new number of items
  return this.numItems;
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
  let binNum = hashCode(key, this.size);

  // Returns the value stored with the key or undefined if the key/value pair was never set
  return this.storage[binNum][key];
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
  let binNum = hashCode(key, this.size);

  // Check for an object in that bin
  if (this.storage[binNum] === undefined) return undefined;

  // Gets the value stored with the key or undefined if the key/value pair was never set
  let returnValue =  this.storage[binNum][key];

  // If the value exists, remove and decrement the number of items
  if (returnValue !== undefined){
      delete this.storage[binNum][key];
      this.numItems -= 1;
  }

  return returnValue;
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
