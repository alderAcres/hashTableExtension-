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

HashTable.prototype.set = function(key, value) {
  let code = hashCode(key, this.SIZE);
  if (!this.storage[code]) {
    this.storage[code] = {};
    this.storage[code][key] = value;
    this.currentSize++;
  } else {
    this.storage[code][key] = value;
    this.currentSize++;
  }
};

HashTable.prototype.get = function(key) {
  const code = hashCode(key, this.SIZE);
  if (this.storage[code]) {
    return this.storage[code][key];
  } else {
    return this.storage[code];
  }
};

HashTable.prototype.remove = function(key) {
  let code = hashCode(key, this.SIZE);
  if (this.storage[code]) {
    let removed = this.storage[code][key];
    delete this.storage[code][key];
    this.currentSize--;
    return removed;
  }
  return null;
};

HashTable.prototype.resize = function() {
  if (this.currentSize === .75 * this.SIZE) {
    this.SIZE *= 2;
    this.currentSize = 0;
    let rehash = this.storage;
    this.storage = new Array(this.SIZE)
    //this won't work, but I need to iterate through each item in the hash table and run the .set method on them...
    rehash.forEach()
  
  }
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
