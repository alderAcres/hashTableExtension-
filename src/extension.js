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

// 1. set:
// - If adding the new item will push the number of stored items to over 75% of
//   the hash table's SIZE, then double the hash table's SIZE and rehash everything

HashTable.prototype.set = function(key, value) {
// iterate over the hash table to count the number of key/value pairs stored
  // create a variable count = 0;
  let count = 0;
  // create a for loop
  for (let i = 0; i < this.storage.length; i++) { 
    // if the index is not undefined; access the keys (possibly using Object.keys) and count how many there are (using length method on Object.keys) add them to count
    if (this.storage[i]) {
      let countAtIndex = Object.keys(this.storage[i]).length; 
      count += countAtIndex;
    }
  }
  // check if adding another key/value pair will push the number of stored items to over 75% of the hash table's SIZE
  if ((count + 1) > (this.SIZE * 0.75)) {

    // rehash everything
    // clone the hash table
    let clonedTable = this.storage.slice();
    // reset all the values within the hash table (objects at each index will be assigned to {}
    for (let j = 0; j < this.storage.length; j++) {
      this.storage[j] = {};
    }
    // if so, double the SIZE;
    this.SIZE = this.SIZE * 2;
    // itirate over the clone for the reassignment of hashes
    for (let k = 0; k < clonedTable.length; k++) {
      // locate each key at each index of the clone
      for (let key in clonedTable[k]) {
        let keyToHash = clonedTable[k][key];
        // hash that key
        let hashedCopy = hashCode(keyToHash, this.SIZE);
        // add that key/value pair to the now larger, empty hash table
        this.storage[hashedCopy][key] = clonedTable[k][key];
      }
    }   
    // and if it won't push the number of stored items to over 75% of the hash table's SIZE, then use the function written in main;
  } else {
    let hashedIndex = hashCode(key, this.SIZE);
    // insert an empty object to be used as storage at each index
    if (this.storage[hashedIndex] === undefined) {
      this.storage = {};
    } else {
      // put the new key/value pair into this object. 
      // if the object is empty, the key/value pair gets added no problem.
      // if it's not empty, and the given key isn't present, the key/value pair gets added. if the key is present, it will get overwritten.
      this.storage[hashedIndex][key] = value;
      // increment size to reflect addition.  
      this.SIZE++;
    }
  }
    return this.SIZE;
};

// 2. remove:
// - If the hash table's SIZE is greater than 16 and the result of removing the
//   item drops the number of stored items to be less than 25% of the hash table's SIZE
//   (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.

HashTable.prototype.remove = function(key) {
    // copy the snippet of code above that is used to calculate the number of stored items
    // iterate over the hash table to count the number of key/value pairs stored
      // create a variable count = 0;
      let count = 0;
      // create a for loop
      for (let i = 0; i < this.storage.length; i++) { 
        // if the index is not undefined; access the keys (possibly using Object.keys) and count how many there are (using length method on Object.keys) add them to count
        if (this.storage[i]) {
          let countAtIndex = Object.keys(this.storage[i]).length; 
          count += countAtIndex;
        }
      }
  // check if the hash table's SIZE is greater than 16 AND removing the item drops the number of stored items to be less than 25% of the hash table's SIZE
    if ((this.SIZE > 16) && ((count - 1) < (this.SIZE * 0.25))) {

    // rehash everything (copying the code above)
      // clone the hash table
      let clonedTable = this.storage.slice();
      // reset all the values within the hash table (objects at each index will be assigned to {}
      for (let j = 0; j < this.storage.length; j++) {
        this.storage[j] = {};
      }
      // reduce the hash table's SIZE by 1/2 
      this.SIZE = this.SIZE / 2;
      // itirate over the clone for the reassignment of hashes
      for (let k = 0; k < clonedTable.length; k++) {
        // locate each key at each index of the clone
        for (let key in clonedTable[k]) {
          let keyToHash = clonedTable[k][key];
          // hash that key
          let hashedCopy = hashCode(keyToHash, this.SIZE);
          // add that key/value pair to the now larger, empty hash table
          this.storage[hashedCopy][key] = clonedTable[k][key];
        }
      }   
    } else {
      let hashedIndex = hashCode(key, this.SIZE);
      if (this.storage[hashedIndex][key]) {
        let deletedItem = this.storage[hashedIndex][key];
        delete this.storage[hashedIndex][key];
        return deletedItem;
      } else {
        return undefined;
      }
    }
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
