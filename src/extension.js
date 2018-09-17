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
  this.storagelength = 0;
}

HashTable.prototype.set = function set(key, value) {
  const hash = hashCode(key, this.SIZE);
  this.storagelength += 1;
  if (this.storagelength > Math.ceil(0.75 * this.SIZE)) {
    this.SIZE *= 2;
  }
  if (this.storage[hash]) {
    this.storage[hash].push([key, value]);
    return this.storagelength;
  }
  this.storage[hash] = [[key, value]];
  return this.storagelength;
};

HashTable.prototype.get = function get(key) {
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash].length > 1) {
    return this.storage[hash].find(ele => ele[0] === key)[1];
  }
  return this.storage[hash][0][1];
};

HashTable.prototype.remove = function remove(key) {
  const hash = hashCode(key, this.SIZE);
  this.storagelength -= 1;
  if (this.storagelength < Math.floor(0.25 * this.SIZE)) {
    this.SIZE /= 2;
  }
  if (this.storage[hash] === '') {
    return undefined;
  }
  if (this.storage[hash].length > 1) {
    const indexToDelete = this.storage[hash].findIndexOf(ele => ele[0] === key);
    const deleted2 = this.storage[hash][indexToDelete];
    this.storage[hash].splice(indexToDelete, 1);
    return deleted2[1];
  }
  const deleted = this.storage[hash];
  this.storage[hash] = '';
  return deleted[0][1];
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
