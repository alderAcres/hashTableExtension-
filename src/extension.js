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
}
HashTable.prototype.set = function(key, value) {
  // Figure out how many buckets are full already
  console.log(this.SIZE);
  let counter = 0;
  for (let i = 0; i < this.storage.length; i++) {

    if (this.storage[i]) {
      counter++;
    }
  }
  // Check if we're at over 75% capacity
  if (counter >= (.75 * this.SIZE)) {
    // If we are, double storage
    this.SIZE *= 2;
    // Still need to re-hash everything inside
  }
  // Get index using hash code
  const index = hashCode(key, this.SIZE);
  // If there is nothing at that index yet,
  if (!this.storage[index]) {
    // set value at that index to the key/val pair passed in (this will replace values w/ same key)
    this.storage[index] = { [key]: value };
  } else {
    // If there is already stuff in there, add key/value pair to existing object
    this.storage[index][key] = value;
  }

};

HashTable.prototype.get = function(key) {
  // Find the index using the hash code
  const index = hashCode(key, this.SIZE);
  // return the value at that index, associated with correct key
  return this.storage[index][key];
};

HashTable.prototype.remove = function(key) {
  // Get index using hash code
  const index = hashCode(key, this.SIZE);
  // If the key exists in the hash table...
  if (this.storage[index][key]) {
    // save the value at the key (so you can return it after deleting)
    const deleted = this.storage[index][key];
    // delete the key/value pair (should work if multiple key/val pairs stored there or not)
    delete this.storage[index][key];
    return deleted;
  }
  // If you didn't find that key, return undefined
  return undefined;
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
