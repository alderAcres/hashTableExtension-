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
  let index = hashCode(key, this.SIZE);
  let bucket = this.storage[index];
  let currentSize = 0;
  for (let s = 0; s < this.storage.length; i++) {
    if (this.storage[s] !== undefined) {
      currentSize++;
    }
  }
  if (currentSize >= Math.floor(((75/100) * this.SIZE))) {
    let reHashed = this.storage.slice();
    this.storage = new Array(Math.floor(this.SIZE * 2));
    for (let n = 0; n < reHashed.length; n++) {
      if (reHashed[n] !== undefined) {
        for (let i = 0; i < reHashed[n]; i++) {
          let pair = reHashed[n][i];
          let key = pair[0];
          let val = pair[1];
          this.storage.set(key, val);
        }
      }
    }
  }
  if (Array.isArray(bucket)) {
    for (let i = 0; i < bucket.length; i++) {
      let pair = bucket[i];
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    bucket.push([key, value]);
  }
  if (bucket === undefined) {
    this.storage[index] = [];
    this.storage[index].push([key, value]);
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
  let index = hashCode(key, this.SIZE);
  let bucket = this.storage[index];
  if (bucket === undefined) {
    return undefined;
  }
  for (let i = 0; i < bucket.length; i++) {
    let pair = bucket[i];
    if (pair[0] === key) {
      return pair[1];
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
// If the hash table's SIZE is greater than 16 and the result of removing the
//   item drops the number of stored items to be less than 25% of the hash table's SIZE
//   (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
HashTable.prototype.remove = function(key) {
  let index = hashCode(key, this.SIZE);
  let bucket = this.storage[index];

  if (bucket === undefined) {
    return undefined;
  }
  for (let i = 0; i < bucket.length; i++) {
    let pair = bucket[i];
    if (pair[0] === key) {
      let clone = pair[1].slice()[0];
      pair = undefined;
      return clone;
    }
  }
  let counter = 0;
  if (this.SIZE > 16) {
    for (let n = 0; n < this.storage.length; n++) {
      if (this.storage[n] !== undefined) {
        counter++;
      }
    }
    if (counter < Math.floor((25/100) * this.SIZE)) {
      let reHash = this.storage.slice();
      this.storage = new Array(Math.floor(this.SIZE / 2));
      for (let k = 0; k < reHash.length; k++) {
        if (reHash[k] !== undefined) {
          for (let i = 0; i < reHash[k]; i++) {
            let pair = reHash[k][i];
            let key = pair[0];
            let val = pair[1];
            this.storage.set(key, val);
          }
        }
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
