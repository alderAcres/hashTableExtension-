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

/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;
  this.length = 0;
  this.storage = new Array(this.SIZE);
}

/**
 1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything
 */
HashTable.prototype.rehashSet = function (size) {
  this.SIZE *= 2;
  this.length = 0;
  let storage = this.storage;
  this.storage = new Array(this.SIZE);
  storage.forEach((obj) => {
    for (let key in obj) {
      let hashKey = hashCode(key, this.SIZE);
      if (!this.storage[hashKey]) {
        let tempObj = {};
        tempObj[key] = obj[key];
        this.storage[hashKey] = tempObj;
        this.length++;
      } else {
        //check for passing in same key with diff value
        this.storage[hashKey][key] = obj[key];
        this.length++;
      }
    }
  });
};

HashTable.prototype.set = function (key, value) {
  let index = hashCode(key, this.SIZE);
  if (!this.storage[index]) {
    this.storage[index] = {};
  }
  this.storage[index][key] = value;
  this.length++;
  if (this.length >= this.SIZE * 0.75) {
    this.rehashSet();
  }
};

/**

 */
HashTable.prototype.get = function (key) {
  let index = hashCode(key, this.SIZE);
  return this.storage[index][key];
};

/**
  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
 */

HashTable.prototype.rehashRemove = function (size) {
  this.SIZE = this.SIZE / 2;
  this.length = 0;
  let storage = this.storage;
  this.storage = new Array(this.SIZE);
  storage.forEach((obj) => {
    for (let key in obj) {
      let hashKey = hashCode(key, this.SIZE);
      if (!this.storage[hashKey]) {
        let tempObj = {};
        tempObj[key] = obj[key];
        this.storage[hashKey] = tempObj;
        this.length++;
      } else {
        //check for passing in same key with diff value
        this.storage[hashKey][key] = obj[key];
        this.length++;
      }
    }
  });
};

HashTable.prototype.remove = function (key) {
  let index = hashCode(key, this.SIZE);
  if (!this.storage[index]) return undefined;
  let value = this.storage[index][key];
  delete this.storage[index][key];
  this.length--;
  if (this.length > 16 && this.length < this.SIZE * 25) {
    this.rehashRemove();
  }
  return value;
};

// Do not modify
function hashCode(string, size) {
  "use strict";

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

// YOUR CODE ABOVE

function hashCode(string, size) {
  "use strict";

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
