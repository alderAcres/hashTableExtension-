/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW

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
  // from the key generate a key in the table
  // store value inside the key as value
  // if hash is 75% full
  // check storage if array length is 75% or over SIZE
  // if true, double SIZE
  // check array size
  let arrSize = 0
  for (let i = 0; i < this.storage.length; i++){
    if (this.storage[i]){
      arrSize++
    }
  }

  if (arrSize > (this.SIZE * 0.75)){
    this.SIZE *= 2
  }

  let hashKey = hashCode(key, this.SIZE)
  if (!this.storage[hashKey]) {
    this.storage[hashKey] = {}
    this.storage[hashKey][key] = value
  } else {
    this.storage[hashKey][key] = value
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
  let hashKey = hashCode(key, this.SIZE)
  if (this.storage[hashKey][key]) {
    return this.storage[hashKey][key]
  } else {
    return undefined
  }
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
  // check storage array size
  let arrSize = 0
  for (let i = 0; i < this.storage.length; i++){
    if (this.storage[i]){
      arrSize++
    }
  }

  let hashKey = hashCode(key, this.SIZE)
  if (this.storage[hashKey][key]) {
    delete this.storage[hashKey][key]
    if (this.SIZE > 16 && (arrSize < Math.floor(this.SIZE * 0.25))){
      // flatten the hashtable
      let originHash = {}
      for (let i = 0; i < arrSize - 1; i++){
        if (typeof this.storage[i] === 'object') {
          for (key in this.storage[i]){
            originHash[key] = this.storage[i][key]
          }
        }
      }
      // reduce SIZE
      this.SIZE = Math.floor(this.SIZE / 2)
      // set the key again
      this.storage = new Array(this.SIZE)
      for (key in originHash) {
        this.set(key, originHash[value])
      }
    }
  } else {
    return undefined
  }
};

// YOUR CODE ABOVE

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
