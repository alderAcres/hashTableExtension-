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
}


HashTable.prototype.set = function(key, value) {
  // check hash table's capacity
  let hashSlotsFilled = 0;
  for (let i = 0; i < this.SIZE; i += 1) {
    if (this.storage[i]) {
      hashSlotsFilled += 1;
    };
  };
  if (hashSlotsFilled + 1 > Math.floor(0.75 * this.SIZE)) {
    this.SIZE = this.SIZE * 2;
    return this.set(key, value);
  };

  // if re-hash not tripped because of capacity, hash like normal
  let insertionIndex = hashCode(key, this.SIZE);
  if (!this.storage[insertionIndex]) {
    this.storage[insertionIndex] = {};
  };
  this.storage[insertionIndex][key] = value;
};


HashTable.prototype.get = function(key) {
  let checkIndex = hashCode(key, this.SIZE);
  return this.storage[checkIndex][key];
};

// 2. remove:
//       - If the hash table's SIZE is greater than 16 and the result of removing the
//         item drops the number of stored items to be less than 25% of the hash table's SIZE
//         (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.

HashTable.prototype.remove = function(key) {
  // check hash table's capacity
  if (this.SIZE > 16) {
    let hashSlotsFilled = 0;
    // count hash slots occupied, if size is greater than 16
    for (let i = 0; i < this.SIZE; i += 1) {
      if (this.storage[i]) {
        hashSlotsFilled += 1;
      };
    };
    // if size was greater than 16 AND slots filled - 1 (to be removed) will be less than 25% capacity, half size and re-run
    if (hashSlotsFilled - 1 < Math.floor(0.25 * this.SIZE)) {
      this.SIZE = this.SIZE / 2;
      return this.remove(key, value);
    };
  };

  // if re-hash not tripped because of capacity, hash like normal
  let checkIndex = hashCode(key, this.SIZE);
  if (!this.storage[checkIndex][key]) {
    return undefined;
  } else {
    const searchedKeyVal = this.storage[checkIndex][key];
    delete this.storage[checkIndex][key];
    return searchedKeyVal;
  };
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
