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

HashTable.prototype.set = function(key, value) {
  let counter = 1;
  for (let i=0; i<this.SIZE; i++) {
    if (this.storage[i] !== undefined) {
      counter++
    }
  }
  if (counter > this.SIZE*0.75) {
    let oldHashTable = this.storage;
    this.SIZE *= 2;
    this.storage = new Array(this.SIZE);
    oldHashTable.forEach (elem => {
      if (elem !== undefined) {
        for (const key in elem) {
          this.set(key, elem[key]);
        }
      }
    })
  }
  let index = hashCode(key, this.SIZE);
  if (!this.storage[index]) {
    this.storage[index] = {};
    this.storage[index][key] = value;
  } else {
    this.storage[index][key] = value;
  }

  return this.storage;
};

HashTable.prototype.get = function(key) {
  let index = hashCode(key, this.SIZE);
  if (this.storage[index]) return this.storage[index][key];
  return null;
};

// 2. remove:
// - If the hash table's SIZE is greater than 16 and the result of removing the
//   item drops the number of stored items to be less than 25% of the hash table's SIZE
//   (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.

HashTable.prototype.remove = function(key) {
  if (this.SIZE > 16) {
    let counter = -1;
    for (let i=0; i<this.SIZE; i++) {
      if (this[storage][i] !== undefined) {
        counter++
      }
    }
    if (counter < Math.floor(0.25*this.SIZE)) {
    let oldHashTable = this.storage;
    this.SIZE *= 0.5;
    this.storage = new Array(this.SIZE);
    oldHashTable.forEach (elem => {
      if (elem !== undefined) {
        for (const key in elem) {
          this.set(key, elem[key]);
        }
      }
    })
    }
  }
  let index = hashCode(key, this.SIZE);
  let removed;
  if (this.storage[index][key]) {
    removed = this.storage[index][key];
    delete this.storage[index][key];
    if (Object.keys(this.storage[index]).length === 0) {
      delete this.storage[index];
    }
    return removed;
  }
   return undefined;
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
