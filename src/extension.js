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
  this.numItems = 0;
  this.storage = new Array(this.SIZE);
}

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

function setHelper(key, value) {
  const hashIdx = hashCode(key, this.SIZE);
  if (this.storage[hashIdx] === undefined) this.storage[hashIdx] = { [key]: value };
  else this.storage[hashIdx][key] = value;
}

HashTable.prototype.set = function set(key, value) {
  this.numItems += 1;
  if (this.numItems > (0.75 * this.SIZE)) {
    this.SIZE = 2 * this.SIZE;
    const oldStorage = this.storage;
    this.storage = new Array(this.SIZE);
    for (let i = 0; i < oldStorage.length; i += 1) {
      if (oldStorage[i] !== undefined) {
        const keys = Object.keys(oldStorage[i]);
        for (let j = 0; j < keys.length; j += 1) {
          const hashIdx = hashCode(key, this.SIZE);
          if (this.storage[hashIdx] === undefined) this.storage[hashIdx] = { [keys[j]]: oldStorage[keys[j]] };
          else this.storage[hashIdx][keys[j]] = oldStorage[keys[j]];
        }
      }
    }
  }
  const hashIdx = hashCode(key, this.SIZE);
  if (this.storage[hashIdx] === undefined) this.storage[hashIdx] = { [key]: value };
  else this.storage[hashIdx][key] = value;
};

HashTable.prototype.remove = function remove(key) {
  const hashIdx = hashCode(key, this.SIZE);
  if (this.storage[hashIdx] !== undefined && this.storage[hashIdx][key]) {
    const val = this.storage[hashIdx][key];
    delete this.storage[hashIdx][key];
    return val;
  }
  return undefined;
};


// YOUR CODE ABOVE

// Do not remove!!
module.exports = HashTable;
