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
HashTable.prototype.set = function(key, value) {
  const bucket = hashCode(key, this.SIZE);
  this.bucketSize++;

  if (this.storage[bucket]) {
    this.storage[bucket][key] = value;
    return this.bucketSize;
  }

  const item = {};
  item[key] = value;
  if (this.bucketSize / this.SIZE > 0.75) {
    this.SIZE *= 2;
    const prevStorage = this.storage;
    this.storage = new Array(this.SIZE);
    this.bucketSize = 0;
    prevStorage.forEach(obj => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key))
          this.set(key, obj[key]);
      }
    });
    this.set(key, value);
  } else {
    this.storage[bucket] = item;
  }
  return this.bucketSize;
};

HashTable.prototype.remove = function(key) {
  const bucket = hashCode(key, this.SIZE);

  if (!this.storage[bucket][key]) return undefined;
  const deleted = this.storage[bucket][key];
  delete this.storage[bucket][key];
  this.bucketSize--;

  if (this.SIZE > 16 && this.bucketSize / this.SIZE <= .25) {
    this.SIZE /= 2;
    const prevStorage = this.storage;
    this.storage = new Array(this.SIZE);
    this.bucketSize = 0;
    prevStorage.forEach(obj => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key))
          this.set(key, obj[key]);
      }
    });
  }
  return deleted;
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
