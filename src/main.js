/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.count = 0;
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
  // convert key to storageLocation key
  const storageLocation = hashCode(key, this.SIZE);
  console.log(storageLocation);
  // check if an object already exists at location and, if not, creat new object to store entries
  if (this.storage[storageLocation] === undefined) this.storage[storageLocation] = {};
  console.log(this.storage);
  // check if your are overwritting existing property and, if your ARE NOT, increment counter
  if (this.storage[storageLocation][key] === undefined) this.count += 1;
  // add the key value pair to the storageLocation
  this.storage[storageLocation][key] = value;
  console.log(this.storage);
  return this.count;
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
  // get location from hashCode
  const storageLocation = hashCode(key, this.SIZE);
  // return value from lookup with storageLocation
  return this.storage[storageLocation][key];
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
  // get storage location with hashCode
  const storageLocation = hashCode(key, this.SIZE);
  // check if key exists and, IF NOT, return undefined
  if (this.storage[storageLocation][key] === undefined) return undefined;
  // save value of property to be deleted
  const result = this.storage[storageLocation][key];
  // delete the property
  delete this.storage[storageLocation][key];
  // decrement count of entries
  this.count--;
  // return value of deleted property
  return result;
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
