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
  // add two new variables that tracks how many addresses were taken
  this.stored = 0;
}
HashTable.prototype.set = function(key, value) {
  const hashI = hashCode(key, this.SIZE);
  if(this.storage[hashI] !== undefined) {
    this.storage[hashI][key] = value;
  } else {
    const obj = {};
    obj[key] = value;
    this.storage[hashI] = obj;
    // increment on how many addresses are taken
    this.stored += 1;
    // check capacity of hash table, if over 75% double size
    if(this.stored >= 0.75 * this.SIZE) {
      this.rehash();
    }
  }
  return hashI;
};
HashTable.prototype.get = function(key) {
  const hashI = hashCode(key, this.SIZE);
  return this.storage[hashI][key];
};
HashTable.prototype.remove = function(key) {
  const hashI = hashCode(key, this.SIZE);
  const output = this.storage[hashI][key];
  delete this.storage[hashI][key];
  this.stored -= 1;
  if(this.stored <= 0.25 * this.SIZE && this.SIZE > 16) {
    this.rehash();
  }
  return output;
};

HashTable.prototype.rehash = function(size) {
  this.SIZE *= 2;
  this.stored = 0;
  let storage = this.storage;
  this.storage = new Array(this.SIZE);
  storage.forEach(obj => {
    for (let key in obj) {
      let hashKey = hashCode(key, this.SIZE);
      if (!this.storage[hashKey]) {
        let tempObj = {};
        tempObj[key] = obj[key];
        this.storage[hashKey] = tempObj;
        this.stored++;
      } else {
        //check for passing in same key with diff value
        this.storage[hashKey][key] = obj[key];
        this.stored++;
      }
    }
  });
}

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
