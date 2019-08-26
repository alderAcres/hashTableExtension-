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
  this.numKeys = 0;
}

HashTable.prototype.resize = function () {
  const tempStore = [...this.storage];
  this.storage = new Array(this.SIZE);
  this.numKeys = 0;
  for (let i = 0; i !== tempStore.length; i += 1) {
    if (tempStore[i] !== undefined) {
      const bucket = tempStore[i];
      for (let j = 0; j !== bucket.length; j += 1) {
        this.set(bucket[j][0], bucket[j][1]);
      }
    }
  }
};

HashTable.prototype.set = function (key, value) {
  if (this.numKeys + 1 > 0.75 * this.SIZE) {
    this.SIZE *= 2;
    this.resize();
  }
  const index = hashCode (key, this.SIZE);
  if (this.storage[index] === undefined) this.storage[index] = [[key, value]];
  else this.storage[index].push([key, value]);
  this.numKeys += 1;
  return this.numKeys;
};

HashTable.prototype.get = function (key) {
  const index = hashCode(key, this.SIZE);
  if (this.storage[index] === undefined) return undefined;
  for (let i = 0; i !== this.storage[index].length; i += 1) {
    if (this.storage[index][i][0] === key) return this.storage[index][i][1];
  }
};

HashTable.prototype.remove = function (key) {
  if (this.numKeys - 1 < Math.floor(0.25 * this.SIZE) && this.SIZE > 16) {
    this.SIZE /= 2;
    this.resize();
  }
  const index = hashCode(key, this.SIZE);
  if (this.storage[index] === undefined) return undefined;
  for (let i = 0; i !== this.storage[index].length; i += 1) {
    if (this.storage[index][i][0] === key) {
      const toBeRemoved = this.storage[index].splice(i, 1);
      if (this.storage[index].length === 0) this.storage[index] = undefined;
      this.numKeys -= 1;
      return toBeRemoved[0][1];
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
