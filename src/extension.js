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

// const HashTable = require("./main"); 

function HashTable() {
  this.SIZE = 10;

  this.storage = new Array(this.SIZE);
  this.totalItems = 0;
}

// PASTE AND MODIFY YOUR CODE BELOW

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
  if ((this.totalItems + 1) / this.SIZE > 0.75) {
    this.rehash();
  }
  const hashKey = hashCode(key, this.SIZE);
  if (!this.storage[hashKey]) {
    this.storage[hashKey] = {};
  }
  if (this.storage[hashKey][key]) {
    this.totalItems -= 1; // not an ideal solution but I ran out of time
  }
  this.storage[hashKey][key] = value;
  this.totalItems += 1;
  return this.totalItems;
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
  const hashLocation = this.storage[hashCode(key, this.SIZE)];
  let output;
  if (hashLocation) {
    output = hashLocation[key];
  }
  return output;
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
  const hashLocation = this.storage[hashCode(key, this.SIZE)];
  let removed;
  if (hashLocation) {
    removed = hashLocation[key];
    delete hashLocation[key];
    this.totalItems -= 1;
  }
  return removed;
};



HashTable.prototype.rehash = function() {
  this.SIZE *= 2;
  this.totalItems = 0;
  const oldStorage = this.storage;
  this.storage = new Array(this.SIZE);
  oldStorage.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      this.set(key, obj[key]);
    });
  });
  return this.totalItems;
}


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
