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



// YOUR CODE ABOVE
function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {

  const index = hashCode(key, this.SIZE)
  if (!this.storage[index]) {
    const newObj = {};
    newObj[key] = value;
    this.storage[index] = newObj;
  } else {
    this.storage[index].key = value
  }

  const numOfItems = this.storage.reduce((acc, curr) => {
    return curr ? acc+=1 : acc;
  }, 0);

  if (numOfItems >= this.SIZE / 4 * 3) {
    this.SIZE = 32;
    this.storage.forEach(x => {
      // Rehash each element to new index.
    })
  }

  return Object.keys(this.storage[index]).length;
};

// Test
// const newTable = new HashTable();
// console.log(newTable)
// console.log(newTable.set(2, 'Maria'));
// console.log(newTable)

HashTable.prototype.get = function(key) {
  const index = hashCode(key, this.SIZE);
  return this.storage[index][key];
};

HashTable.prototype.remove = function(key) {
  const index = hashCode(key, this.SIZE);
  const returnValue = this.storage[index][key];
  delete this.storage[index][key];
  return returnValue;
};

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
