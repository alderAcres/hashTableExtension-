/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.length = 0;
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
  const hash = hashCode(key, SIZE);
  // console.log(hash);
  // console.log(storage)
  // if the table at key is empty
  if (storage[hash] === undefined) {
    const obj = {};
    obj[key] = value;
    storage[hash] = obj;
    length++;
  } else {
    storage[hash][key] = value;
  }
  return length;
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
  const hash = hashCode(key, SIZE);
  return storage[hash][key];
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
  const hash = hashCode(key, SIZE);
  // return undefined if key does not exist
  if (storage[hash][key] === undefined) return undefined;
  
  let length = Object.keys(storage[hash]);
  length = length.length;
  // saves the about-to-be-deleted value
  const deleted = storage[hash][key];

  if (length === 1){
    storage[hash] = undefined;
    length--;
  } else {
    delete storage[hash][key];
  }
  return deleted;
};

// HashTable();

// HashTable.prototype.set('string 1', 42);

// console.log(HashTable.prototype.get('string 1'));
// console.log(HashTable.prototype.remove('string 1'))

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
