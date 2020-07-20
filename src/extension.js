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
  this.originalSize = 16;
  this.numOfItems = 0;
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
  // Finds address
  let bucket = hashCode(key, this.SIZE);
  // Creates bucket if not instantiated and places key-value pair in bucket
  if (this.storage[bucket] === undefined) {
    this.storage[bucket] = {};
    this.storage[bucket][key] = value;
    this.numOfItems++;
  } else {
    // If not overwriting, must increment numOfItems
    if (!this.storage[bucket][key]) {
      this.numOfItems++;
    }
    // Assigns or overwrites key
    this.storage[bucket][key] = value;
  }
  // Checks for resizing
  if (this.numOfItems / this.SIZE >= 0.75) {
    // Temporarily stores all key-value pairs in object
    let temp = {};
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i] !== undefined) {
        Object.keys(this.storage[i]).forEach(cv => {
          temp[cv] = this.storage[i][cv];
        });
      }
    }
    // Redefines properties
    this.numOfItems = 0;
    this.SIZE *= 2;
    this.storage = new Array(this.SIZE);
    // Rehashes stored key-value pairs
    Object.keys(temp).forEach(cv => {
      this.set(cv, temp[cv]);
    })
  }
  return this.numOfItems;
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
  // Find address
  let bucket = hashCode(key, this.SIZE);
  // Handles empty bucket
  if (this.storage[bucket] === undefined) {
    return undefined;
  } else {
    return this.storage[bucket][key];
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
  // Find address
  let bucket = hashCode(key, this.SIZE);
  // Handles empty buckets
  if (this.storage[bucket] === undefined) {
    return undefined;
  } else {
    // Handles existing key-value pairs
    if (this.storage[bucket][key]) {
      let temp = this.storage[bucket][key];
      delete this.storage[bucket][key];
      this.numOfItems--;
      // Checks for resizing
      if (this.SIZE > this.originalSize && this.numOfItems / this.SIZE <= 0.25) {
        // Temporarily stores all key-value pairs in object
        let temp = {};
        for (let i = 0; i < this.storage.length; i++) {
          if (this.storage[i] !== undefined) {
            Object.keys(this.storage[i]).forEach(cv => {
              temp[cv] = this.storage[i][cv];
            });
          }
        }
        // Redefines properties
        this.numOfItems = 0;
        this.SIZE /= 2;
        this.storage = new Array(this.SIZE);
        // Rehashes stored key-value pairs
        Object.keys(temp).forEach(cv => {
          this.set(cv, temp[cv]);
        })
      }
      return temp;
    } else {
      // Handles nonexistent key-value pairs
      return undefined;
    }
  }
};

// /* TESTS */
// let test = new HashTable();
// test.set("bob", 17);
// test.set("bnc", 21);
// test.set("4gf", 36);
// test.set("iuj", 49);
// test.set("lop", true);
// test.set("dog", "sdfg");
// test.set("cat", 63);
// test.set("leop", "%%");
// test.set("gdhef", false);
// test.set("bcn", 46);
// test.set("gha", 46);
// console.log(test);
// test.set("cbd", 46);
// test.set("mar", 46);
// console.log(test);
// console.log(test.get("gasdf"));
// console.log(test);
// console.log(test.get("leop"));
// console.log(test);
// console.log(test.remove("size"));
// console.log(test.remove("dog"));
// console.log(test.remove("iuj"));
// console.log(test.remove("bcn"));
// console.log(test.remove("bnc"));
// console.log(test.remove("4gf"));
// console.log(test);

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
