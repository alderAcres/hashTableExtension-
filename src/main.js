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
  // declare a variable invoking key and current size
  const index = hashCode(key, this.SIZE);
  // check if index exits
  if (!this.storage[index]) {
    // if it doesn't
    // add an object with a key pair value
    // setting an object makes it easier to retrieve or delete later
    this.storage[index] = { [key]: value };
  } else {
    // it does exit add another key pair value
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
HashTable.prototype.get = function(key) {
  // declare a hashed index
  const index = hashCode(key, this.SIZE);
  // at index of storage retrieve value from obj via key
  // (all stores in storage are objects)
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
HashTable.prototype.remove = function(key) {
  // declare hashed value
  const index = hashCode(key, this.SIZE);
  // instantiate returned result
  let removed;
  // check if storage at index exits
  if (!this.storage[index]) removed = undefined;
  else if (Object.keys(this.storage[index]).length === 1) {
    // save removed value
    removed = this.storage[index][key];
    // if storage at index has 1 key pair value
    // set index to be empty
    this.storage[index] = undefined;
  } else if (Object.keys(this.storage[index]).length > 1) {
    // else delete key from storage at index
    // save removed value
    removed = this.storage[index][key];
    delete this.storage[index][key];
  }  
  // return removed element
  return removed;
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
