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
  this.items = 0;
}

HashTable.prototype.set = function (key, value) {
  if (this.items + 1 > 0.75 * this.SIZE) {
    let newSize = this.SIZE * 2;
    let items = this.items;
    function NewHashTable() {
      this.SIZE = newSize;
      this.storage = new Array(this.SIZE);
      this.items = items;
    }
    for (let i = 0; i < this.SIZE; i++) {
      if (this.storage[i]) {
      }
    }
  }

  let newHash = hashCode(key, this.SIZE);
  if (!this.storage[newHash]) {
    this.storage[newHash] = {};
    this.items += 1;
  }
  this.storage[newHash][key] = value;
  return this.items;
};

const newHT = new HashTable();
newHT.set('hi', 'joal');

HashTable.prototype.remove = function (key) {
  let remHash = hashCode(key, this.SIZE);
  const deleted = this.storage[remHash][key];
  delete this.storage[remHash][key];
  this.items -= 1;
  return deleted;
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
