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

  this.length = 0;
}


HashTable.prototype.set = function(key, value) {

  let index = hashCode(key, this.SIZE);

  if (!this.storage[index]) {
    this.storage[index] = {};
  }

  if (!this.storage[index][key]) {
    this.length++;
  }
  this.storage[index][key] = value;
  return this.length;

  let limit = this.size * 3 / 4;
  if (this.length > limit) {
    this.SIZE = this.SIZE * 2;
    let newStorage = new HashTable();
    this.storage.forEach(obj => for (let key in ))
  }
};

HashTable.prototype.get = function (key) {
  const index = hashCode(key, this.SIZE);
  return this.storage[index][key];
};

HashTable.prototype.remove = function (key) {
  const index = hashCode(key, this.SIZE);
  let returnVal = this.storage[index][key];
  delete this.storage[index][key];
  return returnVal;
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
