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
  // declare a variable invoking key and current size
  const index = hashCode(key, this.SIZE);
  // check if index exits
  if (!this.storage[index]) {
    // if it doesn't
    // add an object with a key pair value
    // setting an object makes it easier to retrieve or delete later
    this.storage[index] = { [key]: value };
  } else {
    // it does exit add another key pair value
    this.storage[index][key] = value;
  }
};

HashTable.prototype.get = function(key) {
  // declare a hashed index
  const index = hashCode(key, this.SIZE);
  // at index of storage retrieve value from obj via key
  // (all stores in storage are objects)
  return this.storage[index][key];
};

HashTable.prototype.remove = function(key) {
  // declare hashed value
  const index = hashCode(key, this.SIZE);
  // instantiate returned result
  let removed;
  // check if storage at index exits
  if (!this.storage[index]) removed = undefined;
  else if (Object.keys(this.storage[index]).length === 1) {
    // save removed value
    removed = this.storage[index][key];
    // if storage at index has 1 key pair value
    // set index to be empty
    this.storage[index] = undefined;
  } else if (Object.keys(this.storage[index]).length > 1) {
    // else delete key from storage at index
    // save removed value
    removed = this.storage[index][key];
    delete this.storage[index][key];
  }  
  // return removed element
  return removed;
};


const resize = (array, size) => {
  // if
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
