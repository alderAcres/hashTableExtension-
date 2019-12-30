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

  this.occupied = 0;
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
  let idx = hashCode(key, this.SIZE);
  if (this.storage[idx] === undefined) this.storage[idx] = [];

  // iterate through table at idx to check if key already exists
  if (this.storage[idx].length > 0) {
    for (let i = 0; i < this.storage[idx].length; i++) {
      if (this.storage[idx][i][0] === key) {
        console.log('key already exists');
        // delete this.storage[idx][i];
        this.storage[idx].splice(i, 1);
      } 
    }
  }
  this.storage[idx].push([key, value]);
  this.occupied++;

    // if size greater than 75%, double size of table
    // double this.SIZE
    // initialize new empty array of size this.SIZE
    // iterate through old array
      // if element defined
        // iterate through subarray
          // recalculate index using key and new size and push to new array
    // replace old array with new
  if (this.occupied / this.SIZE >= 0.001) {
    this.SIZE = this.SIZE * 2;
    let newTable = new Array(this.SIZE);
    this.occupied = 0;

    for (let i = 0; i < this.storage.length; i ++) {
      if (this.storage[i]) {
        for (let j = 0; j < this.storage[i].length; j++) {
          let newIdx = hashCode(this.storage[i][j][0], this.SIZE);

          if (!newTable[newIdx]) {
            newTable[newIdx].push([]);
            this.occupied++
            newTable[newIdx].push(this.storage[i][j])
          } else {
            newTable[newIdx].push(this.storage[i][j]);
          }

        }
      }
    }
  }
  let this.storage = newTable;
};
// let test = new HashTable();
// console.log(test);
// test.set('abc', 8)
// console.log(test)

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
  let idx = hashCode(key, this.SIZE);
  
  if (this.storage[idx] === undefined || this.storage[idx].length === 0) {
    return undefined;
  } 
  
  if (this.storage[idx].length > 0) {
    for (let i = 0; i < this.storage[idx].length; i++) {
      if (this.storage[idx][i][0] === key) return this.storage[idx][i][1];
    }
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
  let idx = hashCode(key, this.SIZE);

  if (this.storage[idx]) {
    // iterate through subarray
    for (let i = 0; i < this.storage[idx].length; i++) {
      if (this.storage[idx][i][0] === key) {
        let val = this.storage[idx][i][1];
        this.storage[idx].splice(i, 1);
        return val;
      }
    }
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
