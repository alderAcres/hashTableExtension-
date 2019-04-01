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
  const hashKey = hashCode(key, this.SIZE);
  if (this.storage[hashKey] === undefined) this.storage[hashKey] = {};
  this.storage[hashKey][key] = value;

  if (this.storage.length > this.SIZE * 0.75) {
    this.SIZE = this.SIZE * 2;
  }
  this.storage[hashKey][key] = value;
};

// let test = new HashTable();
// test.set('a', 1);
// test.set('b', 2);
// test.set('c', 3);
// test.set('d', 4);
// test.set('e', 5);
// test.set('f', 6);
// test.set('g', 7);
// test.set('h', 8);
// test.set('i', 9);
// test.set('j', 10);
// test.set('k', 11);


// console.log(test)
// console.log(test.SIZE)

HashTable.prototype.get = function(key) {
  const hashKey = hashCode(key, this.SIZE);
  return this.storage[hashKey][key];
};

HashTable.prototype.remove = function(key) {
  const hashKey = hashCode(key, this.SIZE);
  const removedEl = this.storage[hashKey][key];
  if (!hashKey) {
    return undefined;
  }
  delete this.storage[hashKey][key];

  if ((this.SIZE > 16) && (Math.floor(this.storage.length) < this.storage * 0.25)) {
    this.SIZE = this.SIZE * 0.5;
  }
  this.storage[hashKey][key] = value;
  return removedEl;
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
