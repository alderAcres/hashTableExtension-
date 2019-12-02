/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
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
  let hashed = hashCode(key, this.SIZE);
  if (this.storage[hashed]) {
    this.storage[hashed][key] = value;
  } else {
    this.storage[hashed] = {};
    this.storage[hashed][key] = value;
  }
  if (Object.keys(table.storage).length >= (.75 * this.SIZE)) {
    this.SIZE = this.SIZE * 2;
    for (key in this.storage) {
      let saved = this.storage[key];
      for (key in saved) {
        // console.log(key)
        this.set(key, saved[key]);
        //   var test = hashCode(key, 16);
        //   var test2 = hashCode(key, 32);
      }
      delete this.storage[key];
      console.log(this.storage[key]);
      console.log(this.storage[test]);
      console.log(this.storage[test2]);
    }
  }
};
const table = new HashTable();
table.set('a', 55);
table.set('tree', 26);
// table.set('test', 88)
// table.set('b', 5)
// table.set('tee', 6)
// table.set('tst', 8)

// table.set('ab', 565)
// table.set('treeb', 262)
// table.set('test2', 882)
// table.set('ac', 553)
// table.set('tree3', 263)
// table.set('test3', 883)
// table.set('a4', 554)
// table.set('tree4', 264)
// table.set('test4', 884)
// table.set('ac5', 553)
// table.set('tree5', 263)
// table.set('test5', 883)
// table.set('a45', 554)
// table.set('tree45', 264)
// table.set('test45', 884)
// table.set('ac5', 553)
// table.set('tree35', 263)
// table.set('test35', 883)
// table.set('a456', 554)
// table.set('tree456', 264)
// table.set('test456', 884)
// table.set('test456', 884)
// table.set('ac56', 553)
// table.set('tree356', 263)
// table.set('test356', 883)
// table.set('a456', 554)
// table.set('tree456', 264)
// table.set('test456', 884)
//  console.log(table.get('a'));
//  console.log(table.remove('test'));
// console.log(table.get('test'))
console.log(table);
console.log(Object.keys(table.storage).length);

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
  let hashed = hashCode(key, 16);
  return this.storage[hashed][key];
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
  let hashed = hashCode(key, this.SIZE);
  if (this.storage[hashed]) {
    const saved = this.storage[hashed][key];
    delete this.storage[hashed][key];
    if (Object.keys(table.storage).length <= (.25 * this.SIZE)) {
      this.SIZE = this.SIZE / 2;
      for (key in this.storage) {
        let saved = this.storage[key];
        for (key in saved) {
          // console.log(key)
          this.set(key, saved[key]);
          // var test = hashCode(key, 16);
          // var test2 = hashCode(key, 32);
        }
        delete this.storage[key];
        // console.log(this.storage[key])
        // console.log(this.storage[test])
        // console.log(this.storage[test2])
      }
    }
    return saved;
  }
  return undefined;
};


// Do not modify



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