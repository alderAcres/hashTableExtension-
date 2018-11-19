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
  this.many = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  if (this.many + 1 > this.SIZE * 0.75) {
    let cloneArray = this.storage.slice();
    this.SIZE = this.SIZE * 2;
    this.storage = new Array(this.SIZE);
    this.many = 0;
    for (let i = 0; i < cloneArray.length; i++) {
      if (cloneArray[i] === undefined) {
        continue;
      } else {
        for (let k in cloneArray[i]) {
          this.set(k, cloneArray[i][k]);
        }
      }
    }
  }

  let hashedValue = hashCode(key, this.SIZE);
  if (this.storage[hashedValue] === undefined) {
    this.storage[hashedValue] = {};
    this.storage[hashedValue][key] = value;
    this.many++;
  } else if (this.storage[hashedValue][key]) {
    this.storage[hashedValue][key] = value;
  } else {
    this.storage[hashedValue][key] = value;
    this.many++;
  }
  return this.many;
};

HashTable.prototype.get = function(key) {
  if (this.storage[hashCode(key, this.SIZE)][key] === undefined) {
    return "This key is not in our database";
  } else {
    return this.storage[hashCode(key, this.SIZE)][key];
  }

};

HashTable.prototype.remove = function(key) {
  if (this.storage[hashCode(key, this.SIZE)][key] === undefined) {
    return undefined;
  } else {
    if (this.SIZE > 16 && this.many - 1 < Math.floor(this.SIZE * 0.25)) {
      let cloneArray = this.storage.slice();
      this.SIZE = this.SIZE / 2;
      this.storage = new Array(this.SIZE);
      for (let i = 0; i < cloneArray.length; i++) {
        if (cloneArray[i] === undefined) {
          continue;
        } else {
          for (let k in cloneArray[i]) {
            this.set(k, cloneArray[i][k]);
          }
        }
      }
    }
    let value = this.storage[hashCode(key, this.SIZE)][key]
    delete this.storage[hashCode(key, this.SIZE)][key];
    this.many--;
    return value;
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
