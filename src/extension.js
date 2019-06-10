/* eslint-disable func-names */
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
  this.length = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function (key, value) {
  // let stringKey;
  // if (!isNaN(key)) stringKey = key.toString();
  // else stringKey = key;
  const hashedKey = hashCode(key.toString(), this.SIZE);
  if (this.storage[hashedKey] === undefined) this.storage[hashedKey] = {};
  if (this.storage[hashedKey][key] === undefined) this.length += 1;
  this.storage[hashedKey][key] = value;
  // if number of stored items > this.SIZE
  if (this.length > 0.75 * this.SIZE) {
    // extract everything from hash table
    let allKeys = [];
    let allValues = [];
    this.storage.forEach((bucket) => {
      allKeys = allKeys.concat(Object.keys(bucket));
      allValues = allValues.concat(Object.values(bucket));
    });
    // double hash table's SIZE
    this.SIZE = this.SIZE * 2;
    // clear everything - creates a new Array rather than modifying prior
    this.storage = new Array(this.SIZE);
    this.length = 0;
    // hash everything (recursively)
    for (let i = 0; i < allKeys.length; i += 1) {
      this.set(allKeys[i], allValues[i]);
    }
  }
  return this.length;
};

HashTable.prototype.get = function (key) {
  const hashedKey = hashCode(key.toString(), this.SIZE);
  return this.storage[hashedKey][key];
};


// - If the hash table's SIZE is greater than 16 and the result of removing the
// item drops the number of stored items to be less than 25% of the hash table's SIZE
// (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
HashTable.prototype.remove = function (key) {
  const hashedKey = hashCode(key.toString(), this.SIZE);
  console.log(this.storage[hashedKey]);
  const result = this.storage[hashedKey][key];
  if (result) {
    delete this.storage[hashedKey][key];
    this.length -= 1;
  }
  // if SIZE > 16 and this.length < Math.floor(0.25 * this.SIZE) then...
  if (this.SIZE > 16 && this.length < Math.floor(0.25 * this.SIZE)) {
    // extract everything
    let allKeys = [];
    let allValues = [];
    this.storage.forEach((bucket) => {
      allKeys = allKeys.concat(Object.keys(bucket));
      allValues = allValues.concat(Object.values(bucket));
    });
    // halve the size and clear everything
    this.SIZE = this.SIZE / 2;
    this.storage = new Array(this.SIZE);
    this.length = 0;
    // rehash everything (recursively)
    for (let i = 0; i < allKeys.length; i += 1) {
      this.set(allKeys[i], allValues[i]);
    }
  }
  return result;
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


// TESTS
// console.log(hashCode(0, 16));
// const newHashTable = new HashTable();
// console.log(newHashTable.set('k', 'value'));
// for (let i = 0; i < 11; i++) {
//   newHashTable.set(i, "hello " + i);
// }
// console.log(newHashTable.SIZE)
// console.log(newHashTable.set('j', 'value'));
// console.log(newHashTable.SIZE)
// for (let i = 0; i < 6; i++) {
//   newHashTable.remove(i);
// }
// console.log(newHashTable.SIZE);
// console.log(newHashTable.get("10"));

// Do not remove!!
module.exports = HashTable;
