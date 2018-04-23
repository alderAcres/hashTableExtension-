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
  this.entries = 0;
}

HashTable.prototype.set = function(key, value) {
  let hash = hashCode(key, this.SIZE);
  if (!this.storage[hash]) {
    this.storage[hash] = {};
    this.entries++;
  }
  if (this.entries / this.SIZE >= 0.75) {
    const oldStore = JSON.parse(JSON.stringify(this.storage));
    const oldSize = this.SIZE;
    this.SIZE *= 2;
    this.rehash(oldStore, oldSize);
    hash = hashCode(key, this.SIZE);
    if (!this.storage[hash]) {
      this.storage[hash] = {};
      this.entries++;
    }
  }
  this.storage[hash][key] = value;
};

HashTable.prototype.get = function(key) {
  const hash = hashCode(key, this.SIZE);
  if (!this.storage[hash] || !this.storage[hash][key]) return undefined;
  return this.storage[hash][key];
};

HashTable.prototype.remove = function(key) {
  let hash = hashCode(key, this.SIZE);
  if (!this.storage[hash] || !this.storage[hash][key]) return undefined;
  const returnVal = this.storage[hash][key];
  delete this.storage[hash][key];
  this.entries--;
  if (this.entries / this.SIZE <= 0.25) {
    const oldStore = JSON.parse(JSON.stringify(this.storage));
    const oldSize = this.SIZE;
    this.SIZE /= 2;
    this.rehash(oldStore, oldSize);
    hash = hashCode(key, this.SIZE);
  }
  return returnVal;
};

HashTable.prototype.rehash = function(oldStore, oldSize) {
  const hashes = Object.values(oldStore);
  const self = this;
  this.storage = new Array(this.SIZE);
  this.entries = 0;
  hashes.forEach((bucket) => {
    if (bucket) {
      const keys = Object.keys(bucket);
      keys.forEach((key) => {
        self.set(key, bucket[key]);
      });
    }
  });
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

const table = new HashTable();

for (let i = 0; i < 14; i++) {
  table.set(`key${i}`, 'whatever');
}

for (let i = 0; i < 6; i++) {
  table.remove(`key${i}`, 'whatever');
}

console.log(table);
table.set('this', 'that');
table.get('this');
table.set('colin', 'yo');
console.log(table);
table.get('colin');
table.remove('colin');
console.log(table);

for (let i = 0; i < 6; i++) {
  table.remove(`key${i}`, 'whatever');
}