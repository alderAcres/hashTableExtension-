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

  this.stored = 0;
}

HashTable.prototype.set = function(key, value) {
  let location = hashCode(key, this.SIZE);
  if(this.storage[location]) {
    this.storage[location][key] = value;
  } else {
    this.storage[location] = {};
    this.storage[location][key] = value;
  }
  this.stored++;
  if(this.stored > this.SIZE * 3 / 4) {
    let storedElements = {};
    let storedElementsKeys = [];
    for(let i = 0; i < this.SIZE; i++) {
      if(this.storage[i]) {
        let keys = Object.keys(this.storage[i]);
        for(let x in keys) {
          storedElements[keys[x]] = this.storage[i][keys[x]];
          storedElementsKeys.push(keys[x]);
        }
      }
      delete this.storage[i];
    }
    this.SIZE = this.SIZE * 2;
    this.stored = 0;
    for(let i in storedElementsKeys) {
      this.set(storedElementsKeys[i], storedElements[storedElementsKeys[i]])
    }
  }
};

HashTable.prototype.get = function(key) {
  let location = hashCode(key, this.SIZE);
  if(this.storage[location]) {
    return this.storage[location][key];
  }
  return undefined;
};

HashTable.prototype.remove = function(key) {
  let location = hashCode(key, this.SIZE);
  if(!this.storage[location] || !this.storage[location][key]) {
    return undefined;
  }
  let returnValue = this.storage[location][key];
  delete this.storage[location][key];
  this.stored--;
  if(this.stored < this.SIZE * 1 / 4) {
    let storedElements = {};
    let storedElementsKeys = [];
    for(let i = 0; i < this.SIZE; i++) {
      if(this.storage[i]) {
        let keys = Object.keys(this.storage[i]);
        for(let x in keys) {
          storedElements[keys[x]] = this.storage[i][keys[x]];
          storedElementsKeys.push(keys[x]);
        }
      }
      delete this.storage[i];
    }
    this.SIZE = this.SIZE / 2;
    this.stored = 0;
    this.storage = new Array(this.SIZE);
    for(let i in storedElementsKeys) {
      this.set(storedElementsKeys[i], storedElements[storedElementsKeys[i]])
    }
  }
  return returnValue;
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

