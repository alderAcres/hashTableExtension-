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

const HashTable = require("./main");

// PASTE AND MODIFY YOUR CODE BELOW
HashTable.prototype.set = function (key, value) {
  const index = hashCode(key, this.SIZE);
  const newObj = {};
  newObj[key] = value;
  if (this.storage[index]) {
    this.storage[index].push(newObj);
  } else {
    this.items++;
    this.storage[index] = [newObj];
  }

  if (this.items > this.SIZE * 0.75) {
    this.buildNewSet();
  }
  return this.items;
};

HashTable.prototype.buildNewSet = function() {
  this.SIZE = this.SIZE * 2;
  const newArr = new Array(this.SIZE);

  for (let i = 0; i < this.storage.length; i++) {
    if (this.storage[i]) {
      const kvpairs = Object.entries(this.storage[i]);
      kvpairs.forEach((pair) => {
        const newIndex = hashCode(pair[0], pair[1]);
        newArr[newIndex] = this.storage[i];
      });
    }
  }
  this.storage = newArr;
};


HashTable.prototype.get = function (key) {
  const index = hashCode(key, this.SIZE);
  for (let i = 0; i < this.storage[index].length; i++) {
    if (this.storage[index][i][key]) {
      return this.storage[index][i][key];
    }
  }
};

HashTable.prototype.remove = function (key) {
  const index = hashCode(key, this.SIZE);

  for (let i = 0; i < this.storage[index].length; i++) {
    if (this.storage[index][i][key]) {
      const removedItem = this.storage[index][i];
      this.storage[index].splice(i, 1);
      // Decrements this.items if array is empty
      if (!this.storage[index].length) {
        this.items--;
      }
      return removedItem;
    }
  }
};

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
