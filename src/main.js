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
  this.items = 0;
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
  // if key or value aren't provided as arguments, return undefined
  if (!key || !value) return undefined;
  // if invalid arguments are passed return undefined
  if (typeof key !== 'string' || (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean')) return undefined;
  // generate index from hashCode, store as constant index
  const index = hashCode(key, this.SIZE);
  // check if element exists at generated index
  if (!this.storage[index]) {
    // if no element exists, assign empty object to index
    this.storage[index] = {};
  }
  // if assignment will not overwrite a previously stored value, increment items by one
  if (!this.storage[index][key]) {
    this.items += 1;
  }
  // populate object at generated index with key/value arguments
  this.storage[index][key] = value;

  return this.items
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
  // if key not provided, or argument passed not a string, return undefined
  if (!key || typeof key !== 'string') return undefined;
  // get index from hash function, store on constant index
  const index = hashCode(key, this.SIZE);
  // check if key exists at generated index. if true, return value. if not, return undefined
  return (this.storage[index]) ? this.storage[index][key] : undefined;
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
  // if key not provided, or argument passed not a string, return undefined
  if (!key || typeof key !== 'string') return undefined;
  // get index from hash function
  const index = hashCode(key, this.SIZE);
  // store the value to be removed. if value doesn't exist, output will evaluate to undefined
  const output = this.storage[index][key];
  // if item exists, decrement items
  if (output) {
    this.items -= 1;
  }
  // remove value
  delete this.storage[index][key];
  // return value
  return output;
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
