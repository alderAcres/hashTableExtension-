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
  this.SIZE = 2;  
  this.storage = new Array(this.SIZE);
}

/**
* set - Adds given value to the hash table with specified key.
*/
HashTable.prototype.set = function(key, value) {
  const hashVal = hashCode(key, this.SIZE);
  if (!this.storage[hashVal]) {
    this.storage[hashVal] = {[key]: value};
  }
  this.storage[hashVal][key] = value;

  // create counter to track # of undefined properties
  let count = 0;
  for (let i = 0; i < this.storage.length; i++) {
    if (this.storage[i] !== undefined) {
      count += 1;
    }
  }
  
  // check undefined properties against size
  let maxStorage = 0.75 * this.SIZE;
  // if count is larger than max storage, double the size
  if (count > maxStorage) {
    this.SIZE = this.SIZE * 2;
    // reset all key value pairs to undefined
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i] !== undefined) {
        this.set(key, undefined);
      }
    }
    // rerun hashcode function and store key
    const hashVal2 = hashCode(key, this.SIZE);
    if (!this.storage[hashVal2]) {
      this.storage[hashVal2] = {[key]: value};
    }
    this.storage[hashVal2][key] = value;
  }
};

// const newHash = new HashTable();
// console.log(newHash);

// newHash.set('mood', 'happy');
// newHash.set('time', '8oclock');
// newHash.set(3, 3);
// console.log(newHash);
// console.log('size ', newHash.SIZE);

/**
* get - Retrieves a value stored in the hash table with a specified key
*/
HashTable.prototype.get = function(key) {
  const hashVal = hashCode(key, this.SIZE);
  if (this.storage[hashVal]) {
    return this.storage[hashVal][key];
  };
  return undefined;
};

// console.log(newHash.get('mood'));


/**
* remove - delete a key/value pair from the hash table
*/
HashTable.prototype.remove = function(key) {
  const getKey = this.get(key);
  this.set(key, undefined);  // if we assign the value of undefined to key, the key still exists in the object with the value undefined. How can we remove it?
  
  // create count to track # of properties after removal
  let count = 0;
  for (let i = 0; i < this.storage.length; i++) {
    if (this.storage[i] !== undefined) {
      count += 1;
    }
  }

  // create variable for minimum storage
  let minStorage = 0.25 * this.SIZE;
  // check if size is greater than 16 and count is less than minStorage
  if (this.SIZE > 16 && count < Math.floor(minStorage)) {
    this.SIZE = this.SIZE / 2; // does this reset my table elements to undefined or simply remove everything above the size count?

    // rehash everything
    const hashVal2 = hashCode(key, this.SIZE);
    if (!this.storage[hashVal2]) {
      this.storage[hashVal2] = {[key]: value};
    }
    this.storage[hashVal2][key] = value;
  }
  // return removed item
  return getKey;
}

// newHash.remove('time');
// console.log('removed time ', newHash);


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
