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
  // declar a var to hold indx of input key
  const idx = hashCode(key, this.SIZE);
  // check if obj exists on index
  if (this.storage[idx]) {
  // if it exists, set key and val
    this.storage[idx][key] = value;
  } else {
  // if it doesn't exist, declare an obj on index
  this.storage[idx] = {};
  // set key and val properties
  this.storage[idx][key] = value;
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
  // declar a var to hold indx of input key
  const idx = hashCode(key, this.SIZE);
  // returns value of key
  return this.storage[idx][key]
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
  // declar a var to hold indx of input key
  const idx = hashCode(key, this.SIZE);
  // return undefined if key doesn't exist
  if (!this.storage[idx][key]) return undefined;
  // if key exists, delete key from storage
  delete this.storage[idx][key];
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

// const newHash = new HashTable();
// console.log(newHash.storage)
// console.log(newHash.storage.Object(keys))
// newHash.set('A', 'apple')
// newHash.set('D', 'dandy')
// newHash.set('Ddd', 'derp')
// console.log(newHash.storage)

// console.log(newHash.get('D'))

// console.log(newHash.remove('ham'))
// newHash.remove('Ddd')
// console.log(newHash.storage)

// Do not remove!!
module.exports = HashTable;
