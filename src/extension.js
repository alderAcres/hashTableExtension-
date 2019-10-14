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

HashTable.prototype.set = function(key, value) {
  let index = hashCode(key, this.SIZE);

  if ((this.items + 1) > (.75 * this.SIZE)) {
    this.increaseHashSize();
  }

  if (this.storage[index] === undefined) {
    this.storage[index] = {};
  }

  this.storage[index][key] = value;
  this.items += 1;
  return this.items;
};

HashTable.prototype.increaseHashSize = function() {
  this.SIZE *= 2;
  this.items = 0;
  keyPairs = {};

  this.storage.forEach( hashSpace => {
    if (hashSpace != undefined) {
      for (let key in hashSpace) {
        keyPairs[key] = hashSpace[key];
      }
    }
  });

  for (let newKey in keyPairs) {
    this.set(newKey, keyPairs[newKey]);
  }
}

HashTable.prototype.get = function(key) {
  let index = hashCode(key, this.SIZE);

  return this.storage[index][key];
};

HashTable.prototype.remove = function(key) {
  let index = hashCode(key, this.SIZE);
  let returnValue = undefined;

  if(this.items - 1 < .25 * this.SIZE) {
    this.decreaseHashSize();
  }

  returnValue = this.storage[index][key];

  delete this.storage[index][key];

  return returnValue;
};

HashTable.prototype.decreaseHashSize() {

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

// Do not remove!!
module.exports = HashTable;
