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

  this.length = 0;
}

const hashTable = new HashTable();

HashTable.prototype.set = function(key, value) {
  // run the key through the hash function to get the index
  const index = hashCode(key, this.SIZE);
  // check if the storage at the given index is undefined
  if (!this.storage[index]) {
    // YES? set to be an empty array
    this.storage[index] = [];
  }

  let match = false;
  // iterate over each element's first element - if there is a match - overwrite
  for (let i = 0; i < this.storage[index].length; i++) {
    if (this.storage[index][i][0] === key) {
      this.storage[index][i] = [key, value];
      match = true;
      break;
    }
  }

  // if no match -  push the new array with 2 elements: 1st - key, 2nd - value - to this.storage at the found index
  if (!match) {
    this.storage[index].push([key, value]);
    this.length++;
  }

  // check if the length is greater than this.size * 0.75
  if (this.length > this.SIZE * 0.75) {
    // YES? double this.SIZE
    this.SIZE = this.SIZE * 2;
    // store previous storage
    const oldStorage = [...this.storage];
    // define a new Storage
    this.storage = new Array(this.SIZE);
    this.length = 0;
    // iterate over the oldStorage
    for (let i = 0; i < oldStorage.length; i++) {
      // rehash everything and add to this.storage
      if (oldStorage[i]) {
        for (let j = 0; j < oldStorage[i].length; j++)
        this.set(oldStorage[i][j][0], oldStorage[i][j][1]);
      }
    }
  }

  return this.length;
};
hashTable.set('purple', 25);
hashTable.set('purple', 26);
hashTable.set('pink', 20);
hashTable.set('p', 20);
hashTable.set('i', 20);
hashTable.set('blue', 20);
hashTable.set('red', 20);
hashTable.set('orange', 20);
hashTable.set('yellow', 20);
hashTable.set('k', 20);
hashTable.set('o', 20);
hashTable.set('regrwg', 20);
hashTable.set('ewgewgew', 20);
hashTable.set('pweggewgew', 20);
hashTable.set('egwewgwre', 20);
console.log(hashTable.storage.length);


HashTable.prototype.get = function(key) {
  // hash the key to get an index
  const index = hashCode(key, this.SIZE);

  // check if this.storage at the given index is undefined
  if (!this.storage[index]) return;

  // iterate over the this.storage[index] - find the given key - return the value
  for (let i = 0; i < this.storage[index].length; i++) {
    if (this.storage[index][i][0] === key) return this.storage[index][i][1];
  }

  return;
};
console.log(hashTable.get('pink'));


HashTable.prototype.remove = function(key) {
  // hash the key to get an index
  const index = hashCode(key, this.SIZE);

  // check if this.storage at the given index is undefined
  if (!this.storage[index]) return;

  // iterate over this.storage[index] - find the given key
  for (let i = 0; i < this.storage[index].length; i++) {
    if (this.storage[index][i][0] === key) {
      // delete nested array
      const removedValue = this.storage[index].splice(i, 1)[0][1];
      if (this.storage[index].length === 0) {
        this.storage[index] = undefined;
      }
      this.length--;
      return removedValue;
    }
  }

  return;
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
