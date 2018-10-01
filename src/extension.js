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
  let hash = hashCode(key, this.SIZE);
  let keyName = `${key}`;
  let bucketItem = [keyName, value];

  if ( !Array.isArray(this.storage[hash]) ) {
    this.storage[hash] = [ bucketItem ];
  }
  else {
    this.storage[hash].push(bucketItem);
  }
};

HashTable.prototype.remove = function(key) {
  let hash = hashCode(key, this.SIZE);
  let hashArray = this.storage[hash];
  let removedItem;

  if (hashArray.length) {
    for (let i = 0; i < hashArray.length; i++) {
      if (hashArray[i][0] === key) {
        removedItem = hashArray[i][1];
        hashArray.splice(i, 1);
      }
    }
  }
  
  return removedItem;
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
