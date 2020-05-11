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
  //new property to keep track of usege 
  this.USED = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  let index = hashCode(key, this.SIZE);
  if(!this.storage[index]){
    this.storage[index] = {};
  }

  this.storage[index][key] = value;
  this.USED++

  if(this.SIZE*0.75 === this.USED){
    this.SIZE = Math.floor(this.SIZE*2);
    // involke helper function
    this.storage = HashTable.prototype.resize(this.storage, this.SIZE)
  }

  return this.USED
};

HashTable.prototype.remove = function(key) {
  let index = hashCode(key, this.SIZE);
  if(this.storage[index]){
    let removed = this.storage[index][key];
    delete this.storage[index][key];
    this.USED--;
    if(this.SIZE*0.25 === this.USED - 1){
      this.SIZE = this.SIZE/2;
      // involke helper function
      this.storage = HashTable.prototype.resize(this.storage, this.SIZE);
    }
    return removed;
  } else {
    return false;
  }
};

// helper function
HashTable.prototype.resize = function(storage, size) {
  for(let index of storage){
    key = storage[index];
    value = storage[index][key];
    index = hashCode(key, size);
    if(!storage[index]){
      storage[index] = {};
    }
    storage[index][key] = value;
  }
  return storage;
}

HashTable.prototype.get = function(key) {
  let index = hashCode(key, this.SIZE);
  if(this.storage[index]) return this.storage[index][key];
  return false
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
