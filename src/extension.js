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
  this.usedSlots = 0;
  
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  const hashKey = hashCode(key, this.SIZE);
  if (!this.storage[hashKey]) {
    this.storage[hashKey] = {[key]: value};
    this.usedSlots++;
  } else {
    this.storage[hashKey][key] = value;
  }
  if((this.usedSlots/this.SIZE) > 0.75) {
    let hashArr = [];
    for(let hashes in this.storage) {
      hashArr.push(this.storage[hashes]);
    }
    this.SIZE = (2 * this.SIZE);
    this.storage = new Array(this.size);
    hashArr.forEach(obj => {
      for(let key in obj) {
        this.set(key, obj[key]);
      }
    });
  }
  return this.usedSlots;
};

HashTable.prototype.get = function(key) {
  const hashKey = hashCode (key, this.SIZE);
  if (this.storage[hashKey]) {
    return this.storage[hashKey][key];
  } else {
    return 'item is not located in hashTable';
  }
};

HashTable.prototype.remove = function(key) {
  const hashKey = hashCode (key, this.SIZE);
  if (this.storage[hashKey]) {
    delete this.storage[hashKey][key];
    this.usedSlots--;
  } else {
    return undefined;
  }
  if(this.SIZE > 16 && (this.usedSlots/this.SIZE) < 0.25) {
    let hashArr = [];
    for(let hashes in this.storage) {
      hashArr.push(this.storage[hashes]);
    }
    this.SIZE = (1/2 * this.SIZE);
    this.storage = new Array(this.size);
    hashArr.forEach(obj => {
      for(let key in obj) {
        this.set(key, obj[key]);
      }
    });
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
