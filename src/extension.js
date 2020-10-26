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
  this.resizeTable = null;
}

HashTable.prototype.resize = function (action) {
  if (action === 'expand') this.SIZE *= 2;
  if (action === 'contract') this.SIZE /= 2;
  this.count = 1;
  this.resizeTable = this.storage;
  this.storage = new Array(this.SIZE);
  this.resizeTable.forEach((bucket) =>
    Object.keys(bucket).forEach((key) => this.set(key, bucket[key]))
  );
  this.resizeTable = null;
};

HashTable.prototype.set = function (key, value) {
  if (this.count + 1 >= this.SIZE * 0.75) this.resize('expand');
  const address = hashCode(key, this.SIZE);
  if (!this.storage[address]) this.storage[address] = {};
  if (this.storage[address][key]) this.count -= 1;
  this.storage[address][key] = value;
  this.count += 1;
  return this.count;
};

HashTable.prototype.get = function (key) {
  const address = hashCode(key, this.SIZE);
  return this.storage[address][key];
};

HashTable.prototype.remove = function (key) {
  if (this.count - 1 < this.SIZE * 0.25) this.resize('contract');
  const address = hashCode(key, this.SIZE);
  if (!this.storage[address]) return undefined;
  const removed = this.storage[address][key];
  delete this.storage[address][key];
  this.count -= 1;
  return removed;
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

const table = new HashTable();
table.set('hey', 10);
table.set('zay', 10);
table.set('mikey', 1);
console.log(table.storage);
table.set('a', 5);
table.set('b', 5);
table.set('c', 5);
table.set('d', 5);
table.set('e', 5);
table.set('f', 5);
table.set('g', 5);
table.set('h', 5);
console.log(table.count);
console.log(table.SIZE);
table.set('f', 5);
console.log(table.SIZE);
console.log(table.count);
table.remove('a');
table.remove('b');
table.remove('c');
table.remove('d');
table.remove('e');
console.log(table.SIZE);
console.log(table.count);
console.log(table.storage);

// Do not remove!!
module.exports = HashTable;
