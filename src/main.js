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
  let index = hashCode(key, this.SIZE);       // retrieve index of key value stored in hash table by calling hash function
  if (this.storage[index] === undefined) {     // if nothing at index in table, make new empty object and store at index
    this.storage[index] = {};
  }
  this.storage[index][key] = value;     // store key value at index in table
  let numItems = 0;
  for (let i = 0; i < this.SIZE; i++) {   // iterate through table and counts total number of items stored
    for (let key in this.storage[i]) { 
      if (this.storage[i][key] !== undefined) {
        numItems++;
      }
    }
  }
  return numItems;       // returns number of items stored in table
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
  let index = hashCode(key, this.SIZE);    // retrieve index of key value stored in hash table by calling hash function
  let val = this.storage[index][key];      // retrieve value at index corresponding to passed key
  return val;   
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
  let index = hashCode(key, this.SIZE);    // retrieve index of key value stored in hash table by calling hash function
  if (this.storage[index][key]) {   // if key exists in hash table, delete key and return value, else return undefined
    let val = this.storage[index][key];
    delete this.storage[index][key];
    return val;
  } else return undefined;
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
