/* eslint-disable no-debugger,
no-console, no-plusplus,
no-use-before-define,
strict,
no-bitwise,
operator-assignment,
func-names  */

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
HashTable.prototype.set = function (key, value) {
  // if adding won't require resize
  if (this.storage.length < this.SIZE * 0.75) {
    // hash given key and determine if there is a value in bucket
    const hash = hashCode(key, this.SIZE);

    // if no collision:
    if (this.storage[hash] === undefined) {
      // create container
      this.storage[hash] = {};
      this.storage[hash][key] = value;

    // if collison:
    } else {
      // add key value pair to container
      this.storage[hash][key] = value;
    }
  }

  // resize:
  // create new array for storage
  const newSize = this.SIZE * 2;
  const newStore = new Array(newSize);
  // loop over existing hashtable, rehash any present values
  this.storage.forEach(elem => {
    if (elem === undefined) return;

    // if only one value
    if (Object.keys(elem).length === 1) {
      const newHash = hashCode(Object.keys(elem)[0], newSize);
      // newStore[newHash] = 
    }
  });
  // this.SIZE;

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
HashTable.prototype.get = function (key) {
  const hash = hashCode(key, this.SIZE);

  return this.storage[hash][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  const hash = hashCode(key, this.SIZE);
  let output;

  // key present at address:
  if (this.storage[hash] !== undefined) {
    output = this.storage[hash][key];

    // if object of only one pair:
    if (Object.keys(this.storage[hash]).length === 1) {
      this.storage[hash] = undefined;
      return output;
    }

    // if there were mutliple pairs:
    delete this.storage[hash][key];
    return output;
  }

  return undefined;
};

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
