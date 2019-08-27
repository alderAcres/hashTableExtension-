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

// PASTE AND MODIFY YOUR CODE BELOW ***************************************

function HashTable() {
  this.SIZE = 16;

  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  const hashValue = hashCode(key, this.SIZE);
  if (this.storage[hashValue] === undefined) {
    this.storage[hashValue] = {};
  }
  this.storage[hashValue][key] = value;
  const itemsInHash = Object.keys(this.storage).length;
  if (itemsInHash >= this.SIZE * 0.75) {
    this.SIZE *= 2;
    const keysInStorage = Object.keys(this.storage);
    keysInStorage.forEach(keyInStorage => {
      this.set(keyInStorage, value);
      this.remove(keyInStorage);
    });
  }
  return itemsInHash;
};

// My own tests:
// const testHashTable = new HashTable();
// testHashTable.set('testKey', 'test value');
// testHashTable.set('testKey2', 'test value2');
// console.log(testHashTable.set('testKey', 'test value collision 1'));
// console.log(testHashTable);

HashTable.prototype.get = function(key) {
  const hashValue = hashCode(key, this.SIZE);
  const value = this.storage[hashValue][key];
  return value;
};

HashTable.prototype.remove = function(key) {
  const hashValue = hashCode(key, this.SIZE);
  if (this.storage[hashValue] === undefined) {
    return undefined;
  }
  const returnValue = this.storage[hashValue][key];
  if (this.storage[hashValue][key] !== undefined) {
    delete this.storage[hashValue][key];
    // this if statement removes object at hashValue if it becomes empty after the delete operation
    if (Object.keys(this.storage[hashValue]).length === 0) {
      delete this.storage[hashValue];
    }
  }

  return returnValue;
};

// YOUR CODE ABOVE ********************************************************

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
