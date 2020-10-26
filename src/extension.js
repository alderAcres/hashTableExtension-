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
  const index = hashCode(key, this.SIZE);
  /*Size Check*/
  let percentage = 0;
  for (let i = 0; i < this.storage.length; i++) {
    if (this.storage[i]) percentage += 1;
  }
  /* Account for extra value */
  percentage += 1;
  /* If we go over 75% of size */
  if ((percentage / this.SIZE) >= 0.75) {
    /* Double Size */
    this.SIZE = this.SIZE * 2;
    const newStorage = new Array(this.SIZE);
    for (let i = 0; i < this.storage.length; i++) {
      /* Rebuild new storage at new size */
      if (this.storage[i]) {
        for (const [key2, value2] of Object.entries(this.storage[i])) {
          const newBucket = hashCode(key2, this.SIZE);
          if (!newStorage[newBucket]) {
            newStorage[newBucket] = {};
            newStorage[newBucket][key2] = value2;
          } else {
            newStorage[newBucket][key2] = value2;
          }
        }
      }
    }
    /* Replace old storage with new storage */
    this.storage = newStorage;
  }
  /* This code executes if we do not create a new storage size */
  if (!this.storage[index]) {
    this.storage[index] = {};
    this.storage[index][key] = value;
  } else {
    this.storage[index][key] = value;
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
  const index = hashCode(key, this.SIZE);
  return this.storage[index][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/

/* Didn't get to this one in time :////// */
HashTable.prototype.remove = function(key) {
  const index = hashCode(key, this.SIZE);
  if (!this.storage[index][key]) return;
  const temp = this.storage[index][key];
  delete this.storage[index];
  return temp;
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