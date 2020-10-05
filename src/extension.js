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
  let item = hashCode(key, this.SIZE);
  !this.storage[item] && (this.storage[item] = {});
  !this.storage[item][key] && this.itemCount++;
  this.storage[item][key] = value;
  this.itemCount >= .75 * this.SIZE && (this.rehash(this.SIZE * 2, this.SIZE))
  return this.itemCount;
}

HashTable.prototype.get = function(key) {
  let item = hashCode(key, this.SIZE);
  return this.storage[item][key];
};

HashTable.prototype.remove = function(key) {
  let item = hashCode(key, this.SIZE);
  if (!this.storage[item][key]) return undefined;
  let deleted = this.storage[item][key]; 
  delete this.storage[item][key];
  this.itemCount -= 1;
  (this.itemCount <= this.SIZE * .25 && this.SIZE > 16) && (this.rehash(this.SIZE * 0.5, this.SIZE))
  return deleted;
};

HashTable.prototype.rehash = function(UPDATEDSIZE, ORIGINALSIZE) {
  this.SIZE = UPDATEDSIZE;
  let temp = [...this.storage];
  this.storage = new Array(UPDATEDSIZE);

  temp.forEach(item => {
    if (item) {
      Object.keys(item).forEach(key => {
        let origHash = hashCode(key, ORIGINALSIZE);
        let updatedHash = hashCode(key, this.SIZE);
        !this.storage[updatedHash] && (this.storage[updatedHash] = {});
        this.storage[updatedHash][key] = temp[origHash][key];
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

/* tests
let hashTable = new HashTable();

for (let i = 0; i < 13; i++) {
  const key = 'key ' + i;
  const value = 'value ' + i;
  hashTable.set(key, value);
}

hashTable.SIZE //?

for (let i = 0; i < 5; i++) {
  const key = 'key ' + i;
  hashTable.remove(key);
}

hashTable.SIZE //?

*/

// Do not remove!!
module.exports = HashTable;
