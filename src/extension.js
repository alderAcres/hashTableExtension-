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

function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
  // Incrementing when we add to avoid looping through to get number of buckets used.
  this.numberOfitemsStored = 0;
}

let table = new HashTable();
// PASTE AND MODIFY YOUR CODE BELOW

// Wasnt able to finish :(
HashTable.prototype.set = function (key, value) {
  let bucketPosition = hashCode(key, this.SIZE);
  // If num of buckets used is greater than 75%
  if (this.numberOfItemsStored > this.SIZE * (75 / 100)) {
    let tempArr = [];
    this.SIZE = this.SIZE * 2;
    bucketPosition = hashCode(key, this.SIZE);
    //storing all values so that we can re enter them into hash table with new hashcode
    this.storage.forEach((obj) => {
      for (const [key, value] of Object.entries(obj)) {
        tempArr.push([key, value]);
      }
    });
    tempArr.forEach((arr) => {});

    this.storage = new Array(this.SIZE);
  }

  if (typeof this.storage[bucketPosition] !== 'object') {
    this.storage[bucketPosition] = { length: 0 };
    this.numberOfitemsStored++;
  }
  this.storage[bucketPosition][key] = value;
  this.storage[bucketPosition].length++;
  return this.storage[bucketPosition].length;
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

// Do not remove!!
module.exports = HashTable;
