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
  this.totalItems = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  const hashed = hashCode(key, this.SIZE);
  if (!this.storage[hashed]) {
    this.storage[hashed] = [];
  }
  this.storage[hashed][this.storage[hashed].length] = [key, value];
  this.totalItems++;
  if (this.totalItems / this.SIZE >= 0.75) {
    this.doubleSize();
  }
  return this.totalItems;
};

HashTable.prototype.doubleSize = function() {
  this.SIZE = this.SIZE * 2;
  this.totalItems = 0;
  this.storageOld = this.storage;
  this.storage = [];
  for (let i = 0; i < this.SIZE / 2; i++) {
    if (this.storageOld[i]) {
      this.storageOld[i].forEach((arr) => (this.set(arr[0], arr[1])));
    }
  }
  delete this.storageOld;
}

HashTable.prototype.get = function(key) {
  const hashed  = hashCode(key, this.SIZE);
  if (!this.storage[hashed]) {
    return undefined;
  }
  for (let i = 0; i < this.storage[hashed].length; i++) {
    if (this.storage[hashed][i][0] === key) { return this.storage[hashed][i][1] }
  }
  return ('Error: Key Not Found');
};

HashTable.prototype.remove = function(key) {
  const hashed = hashCode(key, this.SIZE);
  if (!this.storage[hashed] || this.storage[hashed].length === 0) {
    return undefined;
  }
  for (let i = 0; i < this.storage[hashed].length; i++) {
    if (this.storage[hashed][i][0] === key) { 
      const output = this.storage[hashed][i][1];
      delete this.storage[hashed][i];
      this.totalItems--;
    }
  }

  if (output) { return output };
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
