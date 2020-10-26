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
// Table builder function
function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
}

//Function that retrieves a value from a bucket
HashTable.prototype.get = function(key) {
  const retrieveCode = hashCode(key, this.size);
    if(!this.storage[hashCode]) {
      return "no value exists";
    }
  return this.storage[hashCode][key];
  };

//Function that sets a value in a bucket
HashTable.prototype.set = function(key, value) {
// if 12 of the buckets are filled
//if this.storage.length = 12?
//this.SIZE = this.SIZE * 2
const storageCheck = this.storage;
  if(storageCheck.length === 12) {
      this.SIZE = this.SIZE * 2;
      const hashCodeIfFull = hashCode(key, this.size);
      this.storage[hashCodeIfFull][key] = value;
  } else {
    const hashCode = hashCode(key, this.size);
    if(!this.storage[hashCode]) {
      this.storage[hashCode] = {};
    }
    this.storage[hashCode][key] = value;
  }
};

//Function that removes a key/val pair from a bucket
HashTable.prototype.remove = function(key) {
  //if hash table size is greater than 16
  const storageCheck2 = this.storage;
  if((storageCheck2.length/this.SIZE) * 100 === 25) {
    this.SIZE = this.SIZE/2;
  }
  //if current size is 25%
  //reduce SIZE by 1/2
  const removalCode = hashCode(key, this.size);
    if(!this.storage[removalCode][key]) {
      return undefined;
    }
  const deletedPair = this.storage[removalCode][key];
  delete this.storage[removalCode][key];
  return deletedPair;
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
