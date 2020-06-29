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
HashTable.prototype.set = function (key, value) {
  const index = hashCode(key);
  const limit = 0.75 * this.SIZE;
  if (this.storage.length + 1 > limit) {
    this.SIZE *= 2;
    // re-hash: 1. iterate over storage
    for (let i = 0; i < this.storage.length; i++) {
      const newCode = hashCode(this.storage[i][0]);
      this.storage[newCode] = this.storage[i];
    }
  }
  //-------------haven't modified code below
  // check if index already exists in storage
  if (this.storage[index]) {
    // if it does, store inputs as key-val pair on index object
    this.storage[index][key] = value;
    // if index doesn't exist, first initialize index val as an empty object
  } else {
    const container = {};
    container[key] = value;
    this.storage[index] = container;
  }
  return this.storage.length;
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
