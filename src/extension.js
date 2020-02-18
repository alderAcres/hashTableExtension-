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
  this.length = 0;
  this.storage = new Array(this.SIZE);

  for (let i = 0; i < this.SIZE; i++) {
    this.storage[i] = {};
  }
}

HashTable.prototype.rehash = function rehash(newSize) {
  // Change size
  let size = this.SIZE;
  this.SIZE = newSize;

  // Clone stroage prop
  const storage = [...this.storage];

  // New storage prop
  this.storage = new Array(this.SIZE);
  for (let i = 0; i < this.SIZE; i++) {
    this.storage[i] = {};
  }

  // Create single object of all data;
  const obj = {};
  while (size--) {
    Object.assign(obj, storage[size - 1]);
  }

  // Rehash data
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    this.set(keys[i], obj[keys[i]]);
  }
};

HashTable.prototype.set = function set(key, value) {
  if (this.length + 1 > 0.75 * this.SIZE) this.rehash(this.SIZE * 2);
  const bucket = this.storage[hashCode(key, this.SIZE)];
  bucket[key] = value;
  return ++this.length;
};

HashTable.prototype.get = function get(key) {
  const bucket = this.storage[hashCode(key, this.SIZE)];
  return bucket[key];
};

HashTable.prototype.remove = function remove(key) {
  if (this.SIZE > 16 && this.length - 1 < 0.25 * this.SIZE) this.rehash(this.SIZE / 2)
  const bucket = this.storage[hashCode(key, this.SIZE)];
  const value = bucket[key];
  delete bucket[key];
  this.length--;
  return value;
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
