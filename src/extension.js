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

function HashTable() {
  this.SIZE = 16;
  this.count = 0;
  this.storage = new Array(this.SIZE);
}



HashTable.prototype.set = function(key, value) {
  const bucket = hashCode(key, this.SIZE);
  // case: there are no items at this key in this bucket --> increment count
  if(!this.storage[bucket] || !this.storage[bucket][key]) {
    this.count++;
  }
  this.storage[bucket] = { [key]: value };
  return this.count;
};

// const myHash = new HashTable();
// console.log(myHash.set("1", "overwrite me")); // 1
// console.log(myHash.set("1", "first value")); // 1
// console.log(myHash.set("2", "second value")); // 2
// console.log(myHash);



HashTable.prototype.get = function(key) {
  const bucket = hashCode(key, this.SIZE);
  return this.storage[bucket] ? this.storage[bucket][key] : undefined;
};

// console.log(myHash.get("3")); // undefined
// console.log(myHash.get("2")); // 'second value'



HashTable.prototype.remove = function(key) {
  const bucket = hashCode(key, this.SIZE);
  if (!this.storage[bucket]) {
    return;
  } 
  this.count--;
  const removed = this.storage[bucket][key] 
  delete this.storage[bucket][key];
  return removed;
};

// console.log(myHash.remove("2")); // 'second value'
// console.log(myHash.count); // 1
// console.log(myHash.remove("3")); // undefined
// console.log(myHash.count); // 1



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
