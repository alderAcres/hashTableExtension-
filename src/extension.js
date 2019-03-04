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
  let und = 0
  let filled = []
  for (let hashCode in this.storage) {
    if (this.storage[hashCode] === undefined) {
      und++
    } else {
      filled.push(this.storage[hashCode])
    }
  }

  let stored = this.SIZE - und;
  if ((stored + 1) > Math.round(this.SIZE * 0.75)) {
    
    this.SIZE = this.SIZE + this.SIZE;
    for (let x=0; x<filled.length; x++) {
      let keys = Object.keys(filled[x])
      let newHash = hashCode(keys[0], this.SIZE)
      this.storage[newHash] = filled[x];
    }

  } 
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash]) {
  this.storage[hash][key] = value;
  } else {
    this.storage[hash] = {};
    this.storage[hash][key] = value;
  }
};


HashTable.prototype.remove = function(key) {
  let und = 0
  let filled = []
  for (let hashCode in this.storage) {
    if (this.storage[hashCode] === undefined) {
      und++
    } else {
      filled.push(this.storage[hashCode])
    }
  }

  let stored = this.SIZE - und;
  if (this.SIZE > 16 && (stored - 1) < Math.round(this.SIZE * 0.25)) {
    
    this.SIZE = this.SIZE / 2;
    for (let x=0; x<filled.length; x++) {
      let keys = Object.keys(filled[x])
      let newHash = hashCode(keys[0], this.SIZE)
      this.storage[newHash] = filled[x];
    }

  }
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash]) {
    const toRemove = this.storage[hash][key];
    delete this.storage[hash][key];
    this.count--;
    return toRemove;
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
