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
  this.numItems = 0;
}

HashTable.prototype.set = function(key, value) {
  const bucket = hashCode(key, this.SIZE);
  let isNewKey = true;

  if (this.storage[bucket]) {
    if (this.storage[bucket][key] !== undefined) {
      isNewKey = false;
    }
    this.storage[bucket][key] = value;
  } else {
    this.storage[bucket] = {
      [key]: value
    };
  }

  if (isNewKey) this.numItems++;

  if (this.numItems > this.SIZE * 0.75) {
    this.expandTable();
  }

  return this.numItems;
};

HashTable.prototype.remove = function(key) {
  const bucket = hashCode(key, this.SIZE);
  if (!this.storage[bucket] || this.storage[bucket][key] === undefined) return;

  const valueToDelete = this.storage[bucket][key];
  delete this.storage[bucket][key];
  this.numItems--;

  if (this.SIZE > 16 && numItems < Math.floor(this.SIZE * 0.25)) {
    this.reduceTable();
  }

  return valueToDelete;
};

// didn't finish
HashTable.prototype.expandTable = function() {
  const oldSize = this.SIZE;
  this.SIZE *= 2;

  for (let i = oldSize - 1; i >= 0; i--) {
    const bucket = this.storage[i];

    Object.entries.forEach
  }
}

HashTable.prototype.reduceTable = function() {
  const newSize = this.SIZE / 2;

  this.storage.forEach(bucket => {
    if (bucket) {
      Object.entries(bucket).forEach(([key, value]) => {
        const newBucket = hashCode(key, newSize);
        this.storage[newBucket][key] = value;
        delete this.storage[bucket][key]; // don't know if this will work with bucket
      });
    }
  });

  this.SIZE = newSize;
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

const myTable = new HashTable();
myTable.set('a', '1');
myTable.set('b', '1');
myTable.set('c', '1');
myTable.set('d', '1');
myTable.set('e', '1');
myTable.set('f', '1');
myTable.set('g', '1');
myTable.set('h', '1');
myTable.set('i', '1');
myTable.set('j', '1');
myTable.set('k', '1');
myTable.set('l', '1');
myTable.set('m', '1');
myTable.set('n', '1');
myTable.set('o', '1');

console.log(myTable.numItems);
