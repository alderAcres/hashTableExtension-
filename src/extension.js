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
  this.count = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  this.count++;
  if (typeof this.storage[hashCode(key, this.SIZE)] !== 'object') {
    this.storage[hashCode(key, this.SIZE)] = {};
  };
  this.storage[hashCode(key, this.SIZE)[key]] = value;
  if (this.count/this.SIZE > .75) // resize this.SIZE x 2
  return this.count;
};

HashTable.prototype.remove = function(key) {
  if (!this.storage[hashCode(key, this.SIZE)][key]) return undefined;
  let gone = this.set[hashCode(key, this.SIZE)][key];
  delete this.storage[hashCode(key, this.SIZE)][key];  
  this.count--;
  if (this.SIZE > 16 && (this.count/this.SIZE < .25)) // resize this.SIZE /2
  return gone;
};

HashTable.prototype.resize = function(newSize) {
  let old = this.storage.slice();
  this.SIZE = newSize;
  this.storage = new Array(this.SIZE);
  for (let i = 0; i < old.length; i++) {
    // create array of the old (before resizing) object's property pairs 
    let arr = Object.entries(old[i]);
    // create an inner for loop iterating over each of the old object's key-value pairs
    for (let j = 0; j < arr.length; j++) {
      // use the hashtable's set method to resize;
      this.set(arr[j][0], arr[j][1]);
    }
  }
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
