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
  // run hashcode function on key and save the result to a variable
  const index = hashCode(key, this.SIZE);
  // check if that location in storage has a value (collison?)
  if(this.storage[index]) {
    // if yes, add to the index the key/value pair that were origianlly passed in, as a new object
    const ref = this.storage[index];
    ref[key] = value
  } else {
    // if not, create an object at that key to store the original key/value pair
    this.storage[index] = {[key]: value}
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
  // save a variable to the result of hashcode called on the passed in key
  const index = hashCode(key, this.SIZE);
  // check if that variable exsists in storage. If it does, return the value stored at the passed in key
  if(this.storage[index]) {
    return this.storage[index][key]
  } else { // if it doesn't, return undefined
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
  // get the index by calling hashcode on the key
  const index = hashCode(key, this.SIZE);
  // check if there is data stored at that index. 
  if(this.storage[index]) {
      // if there is, save the value at the passed in key to a variable, delete the value, return the variable
      const removed = this.storage[index][key];
      delete this.storage[index][key];
      return removed;
  } else {
      // if there's not, return undefined
      return undefined
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
