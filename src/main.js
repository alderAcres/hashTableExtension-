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

HashTable.prototype.set = function (key, value) {
  // Declare empty object to store in hash table
  let obj = {};
  // If object does not exist at hash code index, add new key-value pair to object at this index
  if (this.storage[hashCode(key, this.SIZE)] === undefined) {
    this.storage[hashCode(key, this.SIZE)] = obj;
    obj[key] = value;
  } else {
    // If hashed address already has key-value pair, add additional key value pair, OR if key already has value, overwrite exisiting value
    this.storage[hashCode(key, this.SIZE)][key] = value;
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

HashTable.prototype.get = function (key) {
  // Return the value at a specified hash code index
  return this.storage[hashCode(key, this.SIZE)][key]
};


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/

HashTable.prototype.remove = function (key) {
  // Declare a variable for the value at a key
  let value = this.get(key);
  // Declare variable for hash index
  let hash = hashCode(key, this.SIZE);
  if (value) {
    // If value exists, delete corresponding key/value pair at that key, and return that value
    delete this.storage[hash][key];
    return value;
  } else if (!value) {
    // If key provided does not exist, return undefined
    return undefined;
  }
}


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
