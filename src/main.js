//const { delete } = require("request");

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
  // pass key and this.size into hashCode() to determine location.
  const location = hashCode(key, this.size);
  // assign the key/value pair to the location.
    // location should be an object so as to handle collisions.
      // test if object, if yes, add key/value. If no, initialize to object, then add.
  if (typeof this.storage[location] !== 'object') this.storage[location] = {};
  this.storage[location][key] = value;
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
  // pass key and this.size into hashCode() to determine location.
  const location = hashCode(key, this.size);
  // return the value associated with key at the hashCode location on the storage array.
  return this.storage[location][key];
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
  // pass key and this.size into hashCode() to determine location.
  const location = hashCode(key, this.size);
  // grab value of key at location
  const value = this.storage[location][key]
  // if value is not undefined, delete it.
  if (value) delete this.storage[location][key];
  return value;
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

console.log(HashTable.storage);
console.log();
console.log();
console.log();
console.log();

