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

//new
function HashTable() {
  this.SIZE = 16;
  this.count = 0;
  this.storage = new Array(this.SIZE);
}
//set
HashTable.prototype.set = function(key, value) {
  let INDEX = hashCode(key, this.SIZE);
  let percentOf = this.SIZE * 0.75 + this.SIZE;

  if (typeof this.Storage[INDEX] !== 'object') {
    this.storage[INDEX] = {};
  }

  if (this.count > percentOf) {
    this.SIZE = this.SIZE * 2;
    let i = 0;
    while (i < this.SIZE) {
      newHash();
    }
    i++;
  }
  this.storage[INDEX][key] = value;
  this.count += 1;
  return this.count;

  //helper function
  function newHash() {
    for (let i in this.storage) {
      for (let keys in this.storage[i]) {
        let INDEX = hashCode(this.storage[i][keys], this.SIZE);
        this.storage[INDEX][keys] = value;
      }
    }
  }
};

//get
HashTable.prototype.get = function(key) {
  //first i want to find the index in the array
  const INDEX = hashcode(key, this.SIZE);

  return this.storage[INDEX][key];
};

//remove
HashTable.prototype.remove = function(key) {
  const INDEX = hashcode(key, this.SIZE);
  const RETURNED = this.storage[INDEX][key];
  let percentOF = Math.floor(this.Size - this.SIZE * 0.25);
  if (this.SIZE > 16 && Math.floor(this.count - 1 < percentOF)) {
    //rehash^^
  }

  delete this.storage[INDEX][key];
  return RETURNED;
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
