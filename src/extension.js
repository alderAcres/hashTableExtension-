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
  this.itemCount = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  const hash = hashCode(key, this.SIZE);
  if (!this.storage[hash]) this.storage[hash] = {};
  this.storage[hash][key] = value;
  this.itemCount += 1;
  console.log(this.itemCount);
  if (this.itemCount / this.SIZE >= 0.75) this.SIZE *= 2;
  console.log(this.SIZE);
};

HashTable.prototype.get = function(key) {
  const hash = hashCode(key, this.SIZE);
  return this.storage[hash]
    ? this.storage[hash][key]
    : "that key doesn't exist in this hash table";
};

HashTable.prototype.remove = function(key) {
  const hash = hashCode(key, this.SIZE);
  const deleted = this.storage[hash] ? this.storage[hash][key] : undefined;
  if (deleted) {
    delete this.storage[hash][key];
    this.itemCount -= 1;
  }
  console.log(this.itemCount);
  if (this.itemCount / (this.SIZE / 2) < 0.75 && this.SIZE > 16) this.SIZE /= 2;
  console.log(this.SIZE);
  return deleted;
};

// YOUR CODE ABOVE

function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
