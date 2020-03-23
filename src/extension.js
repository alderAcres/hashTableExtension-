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

// Double hash table's size if adding new item pushes number of stored items over 75% of size, and rehash
// If size > 16 and removing item drops number of stored items is <25% of size (rounding down, reduce size
// by 1/2 and rehash

function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  const location = hashCode(key, this.SIZE);
  if (!this.storage[location]) this.storage[location] = {};
  const reHash = new hashCode(key, this.SIZE);
  if (this.SIZE > .75 * this.SIZE) {
    reHash();      //fix, incorrect
  }
  this.storage[location][key] = value;
};

HashTable.prototype.get = function(key) {
  const location = hashCode(key, this.SIZE);
  return this.storage[location][key];
};

HashTable.prototype.remove = function(key) {
  const location = hashCode[key][this.SIZE];
  const output = this.storage[location][key];
  delete this.storage[location][key];
  if (this.SIZE > 16 && this.SIZE < .25 * this.SIZE) {
    this.reHash();   //fix, incorrect
  }
  return output;
};



// Do not modify
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


console.log(hashCode)

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
