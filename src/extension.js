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
  const hashAddress = hashCode(key, this.SIZE);
  if (!this.storage[hashAddress]) this.storage[hashAddress] = {}; 
  if (!this.storage[hashAddress][key]) this.count++;
  this.storage[hashAddress][key] = value;
  if (this.count > (this.SIZE * 0.75)){
    this.rehash(this.SIZE*2);
  }
  return this.count;
};

HashTable.prototype.rehash = function(newSize){
  const newTable = new Array(newSize);
  let hashAddress;
  for (let obj of this.storage){
    for (let key in obj){
      hashAddress = hashCode(key, newSize);
      if (!newTable[hashAddress]) newTable[hashAddress] = {};
      newTable[hashAddress][key] = obj[key];
    }
  }
  this.storage = newTable;
  this.SIZE = newSize;
}
HashTable.prototype.remove = function(key) {
  const hashAddress = hashCode(key, this.SIZE);
  if (!this.storage[hashAddress]) return undefined;
  const value = this.storage[hashAddress][key];
  delete this.storage[hashAddress][key];
  this.count--;
  if ((this.SIZE > 16) && (this.count < (this.SIZE*0.25))){
    this.rehash(this.SIZE*0.5);
  }
  return value;
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
