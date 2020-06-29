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
  this.items = 0;
}

HashTable.prototype.set = function (key, value) {
  //run key thru hash function to obtain location (index) on storage array, store to variable
  const hashKey = hashCode(key, this.SIZE);
  //if value at that index is undefined, assign it to new object with hash key variable as key and value as value
  if (!this.storage[hashKey]) {
    this.storage[hashKey] = {};
    this.storage[hashKey][key] = value;
  } else {
    //if value exists, just add the key:value pair as a new property on the object. Overwrites should only occur if passed in key is the same
    this.storage[hashKey].key = value;
  }
  // if items is greater than 75% of size, reassign size to 2 * current size
  if (this.items > (3 / 4) * this.SIZE) {
    this.SIZE *= 2;
    //loop thru each index on storage
    for (let obj of this.storage) {
      //loop thru each property in object
      if (obj) {
        for (let key in obj) {
          //store key and value in object variable
          const rehashKey = key;
          const rehashVal = obj[key];
          //delete property
          delete this.storage[obj][key];
          this.items--;
          //run set method on key value pair;
          this.set(rehashKey, rehashVal);
        }
      }
    }
  }

  // increment and return items property;
  return ++this.items;
};

HashTable.prototype.get = function (key) {
  //run key thru hash function to obtain key
  const hashKey = hashCode(key, this.SIZE);
  //return key on object at the index on storage specified by hash key
  return this.storage[hashKey][key];
};

HashTable.prototype.remove = function (key) {
  //run key thru hash function to obtain key
  const hashKey = hashCode(key, this.SIZE);
  //store to variable the property w key value pair at index specified by hash key
  const removed = this.storage[hashKey][key];
  //delete that property on storage obj
  delete this.storage[hashKey][key];
  //decrement items
  this.items--;
  //return stored value var
  return removed;
};

// Do not remove!!
module.exports = HashTable;

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

/** testing **/

let testHT = new HashTable();

for (let i = 0; i < 15; i++) {
  testHT.set(i.toString(), 'hi');
}

console.log(testHT);

// Do not remove!!
module.exports = HashTable;
