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
  this.mySize = 0;
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


HashTable.prototype.set = function set(key, value) {
  const realKey = hashCode(key, this.SIZE);
  if (this.storage[realKey] === undefined) {
    this.storage[realKey] = {};
    this.storage[realKey][key] = value;
    this.mySize++;
  } else {
    this.storage[realKey][key] = value;
    this.mySize++;
    // console.log(this.mySize, this.SIZE)
  }
  if (this.mySize >= 0.75 * this.SIZE) {
    this.rehash();
  }
};

// something wrong with get? mySize???
HashTable.prototype.get = function get(key) {
  const realK = hashCode(key, this.SIZE);
  let cache;
  // console.log(this.mySize, this.SIZE)  
  if (this.storage[realK] === undefined) return undefined;
  if (this.storage[realK][key] !== undefined) {
    this.mySize--;
    cache = this.storage[realK][key];
  }
  if (this.mySize <= 0.25 * this.SIZE) {
    this.rehash2();
  }
  return cache;
};


HashTable.prototype.rehash = function rehash() {
  this.SIZE *= 2;
  this.mySize = 0;
  const originalStorage = this.storage;
  this.storage = new Array(this.SIZE);
  // put all the key-value pairs in original storage [{},{},{},{xx:1,yy:2}] into new empty storage, using new realHashKeys;
  originalStorage.forEach((obj) => {
    for (let key in obj) {
      const newK = hashCode(key, this.SIZE);
      if (this.storage[newK] === undefined) {
        this.storage[newK] = {};
        this.storage[newK][key] = obj[key];
        this.mySize++;
      } else {
        this.storage[newK][key] = obj[key];
        this.mySize++;
      }
    }
  });
}

// not working
HashTable.prototype.rehash2 = function rehash2() {
  this.SIZE /= 2;
  const originalStorage = this.storage;
  this.storage = new Array(this.SIZE);
  this.mySize = 0;
  originalStorage.forEach((obj) => {
    for (let key in obj) {
      const newK = hashCode(key, this.SIZE);
      if (this.storage[newK] === undefined) {
        this.storage[newK] = {};
        this.storage[newK][key] = obj[key];
        this.mySize++;
      } else {
        this.storage[newK][key] = obj[key];
        this.mySize++;
      }
    }
  });
}


const hashTable = new HashTable();
for (let i = 0; i < 13; i++) {
  const key = 'key ' + i;
  const value = 'value ' + i;
  hashTable.set(key, value);
}
// push 12 el, size became 32, minus 4 , 8 
for (let i = 0; i < 5; i++) {
  const key = 'key ' + i;
  hashTable.get(key);
}
console.log(hashTable)
console.log(hashTable.SIZE)

// Do not remove!!
module.exports = HashTable;
