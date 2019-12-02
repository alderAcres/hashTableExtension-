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
  let occupied = 0;
  for (let element of this.storage) {
    if (element !== undefined && Object.entries(element).length !== 0) {
      occupied += 1;
    }
  }
  const arrOfKeys = [];
  // if adding the new item will push the number of stored items to over 75% of the hash table's SIZE, then double the hash table's SIZE
  if (occupied + 1 > Math.floor(this.SIZE * 0.75)) {
    this.SIZE *= 2;
    // save all the keys needed to rehash
    for (let element of this.storage) {
      if (element !== undefined && Object.keys(element).length !== 0) {
        arrOfKeys.concat(Object.keys(element));
      }
    }
  }
  // remember to include our input key
  arrOfKeys.push(key);
  // rehash everything
  for (let k of arrOfKeys) {
    const address = hashCode(k , this.SIZE);
    if (this.storage[address]) {
      this.storage[address][k] = value;
    } else {
      this.storage[address] = {[k]: value};
    }
  }
};

HashTable.prototype.get = function(key) {
  const address = hashCode(key, this.SIZE);
  if (this.storage[address] && this.storage[address].hasOwnProperty(key)) {
    return this.storage[address][key];
  }
  return undefined;
};

HashTable.prototype.remove = function(key) {
  const address = hashCode(key, this.SIZE);
  let valueRemoved;
  // if an address is not empty, and the key is found
  if (this.storage[address] && this.storage[address].hasOwnProperty(key)) {
    // save its corresponding value so we can return it later
    valueRemoved = this.storage[address][key];
    // delete the key and value pair from this address
    delete this.storage[address][key];
  }
  // return the value we removed, or undefined if the key does not exist in the hash table
  return valueRemoved;
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
