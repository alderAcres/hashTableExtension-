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
  // get hash of key
  const hash = hashCode(key, this.SIZE);
  // check table for hash
  // if doesn't exist, create an object and add the key/value pair
  if (this.storage[hash] === undefined) {
    this.storage[hash] = { [key]: value };
    // if exists, add key/value pair to object at that location
  } else {
    this.storage[hash][key] = value;
  }
  // declare a variable to store item count
  let itemCount = 0;
  // determine number of items in hash table
  this.storage.forEach((slot) => {
    if (slot !== undefined) {
      itemCount += 1;
    }
  });
  // return number of items in hash table
  return itemCount;
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
  // get hash of input key
  const hash = hashCode(key, this.SIZE);
  // return the value that corresponds to the key
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
HashTable.prototype.remove = function(key) {
  // get hash of input key
  const hash = hashCode(key, this.SIZE);
  // check if an entry exists
  if (this.storage[hash][key] !== undefined) {
    // if yes, store the value
    const removedValue = this.storage[hash][key];
    // once stored, delete the key/value from the table
    delete this.storage[hash][key];
    // check if object contains any other values
    if (Object.keys(this.storage[hash]).length === 0) {
      // if no, set hash location in table to undefined
      this.storage[hash] = undefined;
    }
    // return the deleted value
    return removedValue;
  }
  // if no, return undefined
  return undefined;
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
