/* eslint-disable strict */
/* eslint-disable operator-assignment */
/* eslint-disable no-bitwise */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
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

HashTable.prototype.set = function (key, value) {
  const currentSize = this.storage.length + 1;
  const maxSize = this.SIZE * 0.75;

  // If adding the new item will push the number of
  // stored items to less than or equal to 75% of
  // the hash table's SIZE, than set new item
  if (currentSize <= maxSize) {
    const index = hashCode(key, this.SIZE);
    if (this.storage[index] === undefined) {
      this.storage[index] = { [key]: value };
    } else {
      this.storage[index][key] = value;
    }
  } else {
    // Double hash table size
    this.RESIZE = this.SIZE * 2;
    // Rehash table
    const temp = new Array(this.RESIZE);
    for (let i = 0; i < this.storage.length; i += 1) {
      temp[i] = { [key]: value };
    }
    this.storage = temp;
  }
};

HashTable.prototype.get = function (key) {
  const index = hashCode(key, this.SIZE);
  const value = this.storage[index][key];
  return value;
};

HashTable.prototype.remove = function (key) {
  const index = hashCode(key, this.SIZE);
  const value = this.storage[index][key];
  delete this.storage[index][key];

  const currentSize = this.storage.length;
  const minSize = Math.floor(this.SIZE * 0.25);
  // If the hash table's SIZE is greater than 16 and the result of
  // removing the item drops the number of stored items to be less
  // than 25% of the hash table's SIZE (rounding down)
  if (this.SIZE > 16 && currentSize < minSize) {
    // then reduce the hash table's SIZE by 1/2 and rehash everything.
    this.RESIZE = Math.floor(this.SIZE / 2);
    const temp = new Array(this.RESIZE);
    for (let i = 0; i < this.storage.length; i += 1) {
      temp[i] = { [key]: value };
    }
    this.storage = temp;
  }
  return value;
};

function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i += 1) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
