/**
* HashTable constructor
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
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash]) {
    this.storage[hash][key] = value;
  } else {
    const obj = {};
    obj[key] = value;
    this.storage[hash] = obj;
  }
};

/**
* get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed address, then you must retrieve
*   the correct value that was originally stored with the provided key
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specified key in the
* hash table
*/
HashTable.prototype.get = function(key) {
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash]) return this.storage[hash][key];
  return undefined;
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
  const hash = hashCode(key, this.SIZE);
  const cache = this.storage[hash][key];
  delete this.storage[hash][key];
  return cache;
};

// MY TESTS
// let hashTable = new HashTable();
// console.log(hashTable);
// for (let i = 0; i < 16; i++) {
//   hashTable.set('k' + i, 'v' + i);
// }
// console.log('hashTable', hashTable);

// for (let i = 0; i < 16; i++) {
//   console.log(hashTable.get('k' + i, 'v' + i));
// }
// console.log("hashTable.get('asdf')", hashTable.get('asdf'));

// for (let i = 0; i < 16; i++) {
//   console.log(hashTable.remove('k' + i));
// }

// console.log('hashTable', hashTable);

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
