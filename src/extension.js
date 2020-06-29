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
/* eslint-disable */

function HashTable() {
  this.SIZE = 16;
  this.threeQuarters = 12; // initial
  this.storage = new Array(this.SIZE);
  this.lengthOfHash = 0; // initial
}

HashTable.prototype.getLengthOfHash = function () {
  let length = this.storage.filter((e) => e).length;
  this.lengthOfHash = length;
  return length;
};

HashTable.prototype.address = function (key) {
  return hashCode(key, this.SIZE);
};

HashTable.prototype.set = function (key, value) {
  // if 13 is lengthOfHash.... > 12
  if (this.lengthOfHash > this.threeQuarters) {
    // save oldStorage to copy
    let oldStorage = this.storage;
    // UPDATE size, threeQuarters, and also storage to new Array
    this.SIZE = this.SIZE * 2;
    this.threeQuarters = Math.floor(this.SIZE * 0.75);
    this.storage = new Array(this.SIZE);
    this.lengthOfHash = 0;

    // refactor for later -- rehash everything

    for (let i = 0; i < oldStorage.length; i++) {
      const element = oldStorage[i];
      if (!element) continue;
      // otherwise...copy element to objVal
      let objVal = {};
      let keysOfOldObj = Object.keys(element);
      for (let key of keysOfOldObj) {
        objVal[key] = element[key];
      }
      // objVal is now copied, and now we must rehash
      let newKey = keysOfOldObj[0];
      const a = this.address(newKey);
      if (!this.storage[a]) {
        this.storage[a] = {};
        this.lengthOfHash++;
      }
      this.storage[a] = objVal;
    }
  }
  // VAL is different, key stays same

  const a = this.address(key);
  if (!this.storage[a]) {
    this.storage[a] = {};
    this.lengthOfHash++; // update hash length
  }
  this.storage[a][key] = value; // otherwise, store in an array
};

HashTable.prototype.get = function (key) {
  const a = this.address(key);
  return this.storage[a][key];
};

HashTable.prototype.remove = function (key) {
  // if this.
  if (this.SIZE > 16 && this.lengthOfHash < this.SIZE - this.threeQuarters) {
    // make sure to
    let oldStorage = this.storage;
    // UPDATE size, threeQuarters, and also storage to new Array
    this.SIZE = Math.floor(this.SIZE / 2);
    this.threeQuarters = Math.floor(this.SIZE * 0.75);
    this.storage = new Array(this.SIZE);
    this.lengthOfHash = 0;

    // refactor for later
    for (let i = 0; i < oldStorage.length; i++) {
      const element = oldStorage[i];
      if (!element) continue;
      // otherwise...copy element to objVal
      let objVal = {};
      let keysOfOldObj = Object.keys(element);
      for (let key of keysOfOldObj) {
        objVal[key] = element[key];
      }
      // objVal is now copied, and now we must rehash
      let newKey = keysOfOldObj[0];
      const a = this.address(newKey);
      if (!this.storage[a]) {
        this.storage[a] = {};
        this.lengthOfHash++;
      }
      this.storage[a] = objVal;
    }
  }
  // make sure to run this
  const a = this.address(key);
  delete this.storage[a][key];
  this.lengthOfHash--;
};

// Do not modify
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
//#endregion

// Do not remove!!
module.exports = HashTable;

// // test case
// let hash = new HashTable();
// // ccreate random

// for (let i = 50; i < 1000; i++) {
//   hash.set(makeid(), Math.floor(Math.random() * 100));
// }

// function makeid() {
//   // stack overflow :)
//   let result = '';
//   let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   let charactersLength = characters.length;
//   for (let i = 0; i < 3; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

// console.log(hash.storage, '\n', 'hash Length', hash.lengthOfHash, 'hashSize:', hash.SIZE);

// // for (let o of hash.storage) {
// // }
// // for (let i = 0; i < 10; i++) {
// //   hash.remove();
// // }
