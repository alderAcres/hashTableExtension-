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
  let hashKey = hashCode(key, this.SIZE);

  if (Object.keys(this.storage).length / this.SIZE > 0.75) {
    this.rehash(this.SIZE * 2);
    // resize the storage
    // this.SIZE *= 2;
    // this.newStorage = new Array(this.SIZE);
    // for (let i = 0; i < this.storage.length; i++)
    // this.newStorage[i] = {};

    // //rehash & update occupiedCount
    // this.storage.array.forEach((obj, _) => {
    //   Object.keys(obj).forEach((key, _) => {
    //     let newHashKey = hashCode(key, this.SIZE);
    //     this.newStorage[newHashKey][key] = value;
    //   });
    // });
    this.storage = newStorage;
  }
  this.storage[hashKey][key] = value;

};

HashTable.prototype.remove = function(key) {
  let hashKey = hashCode(key, this.SIZE);
  ret = this.storage[hashKey][key];
  delete this.storage[hashKey][key];
  if (Object.keys(this.storage).length / this.SIZE < 0.25) {
    rehash(this.SIZE / 2);
  return ret;
};

HashTable.prototype.rehash = function(newSize) {
    // reset occupiedCount
    this.occupiedCount = 0;
    // update this.SIZE
    this.SIZE = newSize
    // create a new storage base on newSize
    newStorage = new Array(newSize);
    for (let i = 0; i < newSize; i++)
      newStorage[i] = {};
    //  iterate the old storage for non-empty objects, for each object iterate those keys to rehash
    this.storage.forEach(obj => {
      Object.keys(obj).forEach(key => {
        // calculate new hash key
        let newHashKey = hashCode(key, newSize);
        this.newStorage[newHashKey] = obj[key];
      });
    });
    this.storage = newStorage;
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
