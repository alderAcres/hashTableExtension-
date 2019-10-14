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
  let i = hashCode(key, this.SIZE); // address
  /// if key hasn't been used to store another value
  if (this.storage[i] === undefined) {
    const obj = {};
    obj[key] = value;
    this.storage[i] = obj;
  }
  else {// overwrite previous value
    this.storage[i][key] = value;
  }
};
HashTable.prototype.remove = function (key) {
  let address = hashCode(key, this.SIZE);
  if (this.storage[address][key] !== undefined) {
    deletedVal = this.storage[address][key];
    delete this.storage[address][key];
    this.SIZE--;
    return deletedVal;
  }
  if (!this.storage[address]) return undefined;
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
