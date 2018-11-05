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
  // first set the key and value pair,
  // get the hash from the hashCode function
  const hash = hashCode(key, this.SIZE);
  // check to see what is already inside the storage using hash code
  // check to see if it is an object
  if (typeof this.storage[hash] !== 'object') {
    // if it isnt, create a new object there
    this.storage[hash] = {};
  }
  // then put the value inside an object with key value pair
  this.storage[hash][key] = value;

  // check to see if the number of hashs are over 75%
  const hashTableSize = this.storage.filter().length;

  // reset the hashlength to double the size

  // go through the array and rehash using the hashCode function but with the new length

  // return the number of keys
  return this.storage.keys.length;
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
  // get the hash from the hashCode function
  const hash = hashCode(key, this.SIZE);
  // check to see if an object exists at that hash
  if (typeof this.storage[hash] === 'object') {
    // check to see if the key exists
    if (this.storage[hash][key]) {
      // if it does, return the value at the key provided in arguments
      return this.storage[hash][key];
    }
    // otherwise, return 'nothing found'
    return 'Nothing was found at this key!';
  }
  // otherwise, return 'nothing found'
  return 'Nothing was found at this key!';
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
  // get the hash from the hashCode function
  const hash = hashCode(key, this.SIZE);
  // check to see if there is an object at the hash
  if (typeof this.storage[hash] === 'object') {
    // check to see if the key exists
    if (this.storage[hash][key]) {
      // delete if found
      // first store the value to delete
      let temp = this.storage[hash][key];
      // delete the key value pair;
      delete this.storage[hash][key];
      // return the deleted value
      return temp;
    }
  }
  // if nothing was found at hash, return 'nothing found'
  return 'Nothing was found at this key';
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
