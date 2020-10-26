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
  this.currentSize = 0;
  this.storage = new Array(this.SIZE);
}
// set
HashTable.prototype.set = function (key, value) {
  const keyCode = hashCode(key, this.SIZE);
  if (!this.storage.hasOwnProperty(keyCode)) {
    this.storage[keyCode] = {};
  }
  this.storage[keyCode][key] = value;
  this.currentSize++;
  if (this.currentSize >= 0.75 * this.SIZE) {
    this.rehash();
  }
};
HashTable.prototype.rehash = function (size) {
  // double the container size []
  this.SIZE *= 2;
  // clear currentsize
  this.currentSize = 0;
  // copy old storage
  const oldStorage = this.storage;
  // create an new container based on doubled size
  this.storage = new Array(this.SIZE);
  // reassign the key-value pair from old storage to new storage
  oldStorage.forEach((obj) => {
    for (let key of Object.keys(obj)) {
      let keyCode = hashCode(key, this.SIZE);
      if (!this.storage[keyCode]) {
        this.storage[keyCode] = {};
      }
      this.storage[keyCode][key] = obj[key];
      this.currentSize++;
    }
  });
};
// get
HashTable.prototype.get = function (key) {
  const keyCode = hashCode(key, this.SIZE);
  return this.storage[keyCode] ? this.storage[keyCode][key] : null;
};
// remove
HashTable.prototype.remove = function (key) {
  const keyCode = hashCode(key, this.SIZE);
  const deletedItem = this.storage[keyCode][key];
  delete this.storage[keyCode][key];
  return this.storage[keyCode][key] ? undefined : deletedItem;
};
// YOUR CODE ABOVE

function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
