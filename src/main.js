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
  // set variable that stores result from hashed function invocation 
  let output = hashCode(key, this.SIZE);
  // check if 'bucket' is empty
  // if true, add key: value to specified index
  if (this.storage[output]) {
    // build out obj on bucket
    this.storage[output][key] = value;
  } else {
    // if false, create new obj at 'bucket' and populate with result
    this.storage[output] = {};
    this.storage[output][key] = value;
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
  let output = hashCode(key, this.SIZE);
  // access specific bucket value and return 
  return this.storage[output][key];
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
  let output = hashCode(key, this.SIZE);
  // store deleted data in a var
  let temp = this.storage[output][key];
  // check if output exists
  // if false, return undefined
  if (!this.storage[output][key]) return undefined;
  // if true, delete temp with 'delete' keyword and return
  delete this.storage[output][key];
  return temp;
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

const hash = new HashTable();
hash.set(1, 2);
hash.set(4, 5);
hash.set(8, 9);
console.log(hash.get(4));
hash.remove(8);
console.log(hash);
// Do not remove!!
module.exports = HashTable;
