// const { delete } = require("request");

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.storageSize = 0;
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
  // check if args are ok
  const argmts = [key, value];
  if (argmts.length === 2) {
    // make hashkey with hash function
    const hashKey = hashCode(key, this.SIZE);
    // check if in the storage, if not add new object as haskey value, then add key:value inside
    const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
    if (has.call(this.storage, hashKey)) {
      // add hashkey to hastable
      this.storage[hashKey][key] = value;
    } else {
      // make new object to store key:value then add key:value
      this.storage[hashKey] = {};
      this.storage[hashKey][key] = value;
    }
    this.storageSize += 1;
    return this.storageSize;
  }
  return 'incorrect arguments. should be (key, value)';
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
  // make hashkey to check storage
  const hashKey = hashCode(key, this.SIZE);
  // check if hashkey exists in the storage, return value if true, string if otherwise
  const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
  if (has.call(this.storage, hashKey)) {
    return this.storage[hashKey][key];
  }
  return 'key not found, archives must be incomplete';
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
  // make hashkey to check storage
  const hashKey = hashCode(key, this.SIZE);
  // check if hashkey exists in the storage, if so then delete key:value and return value
  // returns undefined if otherwise
  const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
  if (has.call(this.storage, hashKey)) {
    const deletedVal = this.storage[hashKey][key];
    delete this.storage[hashKey][key];
    return deletedVal;
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

const table = new HashTable();

table.set('me', 5);
table.set('mike', 4);
table.set(3);

console.log(table.set(4));