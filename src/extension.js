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

// return void
HashTable.prototype.remove = function (key) {
  // no input
  if (key === undefined) return 'Must pass in key';

  const hashIndex = hashCode(key, this.SIZE);
  // not found
  if (
    this.storage[hashIndex] === undefined ||
    this.storage[hashIndex][key] === undefined
  ) {
    return undefined;
  }

  // If it's only one pair in the bucket, reinitiate bucket to undefined.
  if (Object.keys(this.storage[hashIndex]).length === 1) {
    this.storage[hashIndex] = undefined;
    return;
  }
  // otherwise just delete the key:value pair in the bucket
  delete this.storage[hashIndex][key];
  return;
};

// testing

const hashTable = new HashTable();
for (let i = 0; i < 20; i++) {
  hashTable.set(i, i.toString());
}
console.log(hashTable.storage);

// YOUR CODE ABOVE

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
