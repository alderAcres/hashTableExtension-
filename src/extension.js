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
  this.sizeCap = Math.floor((this.SIZE * 75) / 100);
  this.storage = new Array(this.SIZE);
  this.index = 0;
}

const myHash = new HashTable;


HashTable.prototype.set = function(key, value) {
  const hashKey = hashCode(key, this.SIZE);
  console.log(this.index);
  if (this.index === this.sizeCap - 1) {
    this.SIZE *= 2;
    const toRehash = [];
    for (let i = 0; i < this.storage.length; i += 1) {
      if (Object.keys(this.storage[i]).length !== 0) {
        toRehash.push(Object.entries(this.storage[i]));
      }
    }
    for (let i = 0; i < toRehash.length; i += 1) {
      this.set(this.storage[i][0], this.storage[i][1]);
    }
  }
  if (this.storage[hashKey] === undefined) this.storage[hashKey] = {};
  this.storage[hashKey][key] = value;
  this.index = this.index + 1;
  return this.index;
};

myHash.set('sonic', 'thehedgehog');
myHash.set('Kal', 'El');
myHash.set('Pizza', 'Hut');
myHash.set('thisis', 'tedious');
myHash.set('gordon', 'gecko');
myHash.set('Spiral', 'Notebook');
myHash.set('key', 'chain');
myHash.set('filling', 'buckets');
myHash.set('sup', 'bro');
myHash.set('coding', 'isfun');
myHash.set('moment', 'oftruth');



HashTable.prototype.get = function(key) {
  const hashKey = hashCode(key, this.SIZE);
  const output = this.storage[hashKey][key];
  return output;
};

HashTable.prototype.remove = function(key) {
  const hashKey = hashCode(key, this.SIZE);
  const savedValue = this.storage[hashKey][key];
  delete this.storage[hashKey][key];
  return savedValue;
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
