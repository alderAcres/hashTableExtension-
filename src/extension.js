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
  this.filled = 0;
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
  let index = hashCode(key, this.SIZE);
  if (!this.storage[index]) {
    this.storage[index] = {};
  }
  if (!this.storage[index][key]) {
    this.filled += 1;
  }
  this.storage[index][key] = value; 

  if (this.filled > this.SIZE * 0.75) {
    console.log('75% capacity reached; doubling hash table size');
    let newSize = this.SIZE * 2;
    let newStorage = new Array(newSize);

    this.storage.forEach ( (storedObj) => {
      let keys = Object.keys(storedObj);
      keys.forEach ( (oldKey) => {
        let newIndex = hashCode(oldKey, newSize);
        if (!newStorage[newIndex]) {
          newStorage[newIndex] = {};
        }
        newStorage[newIndex][oldKey] = storedObj[oldKey];
      })
    })
    this.storage = newStorage;
    this.SIZE = newSize;
  }

  return this.filled;
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
  let index = hashCode(key, this.SIZE);
  let removedVal = this.storage[index][key];
  delete this.storage[index][key];
  if (Object.keys(this.storage[index]).length === 0 && this.storage[index].constructor === Object) {
    delete this.storage[index];
  }
  this.filled -= 1;

  if (this.SIZE > 16 && this.filled < this.SIZE * 0.25) {
    console.log('25% capacity reached; halving hash table size');
    let newSize = this.SIZE * 0.5;
    let newStorage = new Array(newSize);

    this.storage.forEach ( (storedObj) => {
      let keys = Object.keys(storedObj);
      keys.forEach ( (oldKey) => {
        let newIndex = hashCode(oldKey, newSize);
        if (!newStorage[newIndex]) {
          newStorage[newIndex] = {};
        }
        newStorage[newIndex][oldKey] = storedObj[oldKey];
      })
    })
    this.storage = newStorage;
    this.SIZE = newSize;
  }
  return removedVal;
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
