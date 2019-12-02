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
function HashTable(size=16) {
  this.SIZE = size;
  this.remaining = size;
  this.storage = new Array(size);
}

/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value, resize = true) {
  let hashed = hashCode(key, this.SIZE);
  if (this.storage[hashed]) {
    this.storage[hashed][key] = value;
  } else {
    if (resize && this.remaining-1 < (0.25 * this.SIZE)){
      this.resize(this.SIZE * 2);
      //recalculate hashed with new size
      hashed = hashCode(key, this.SIZE);
    }
    this.storage[hashed] = {};
    this.storage[hashed][key] = value;
    this.remaining--;
  }
};

HashTable.prototype.resize = function(size) {
  let newHash = new HashTable(size);
  let stored;
  for (let i = 0; i < this.SIZE; i++ ) {
    stored = this.storage[i];
    if (stored) {
      for (let key in stored) {
        newHash.set(key, stored[key], false);
      }
    }
  }
  this.SIZE = size;
  this.remaining = newHash.remaining;
  this.storage = newHash.storage;
}



/**
* get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed address, then you must retrieve
*   the correct value that was originally stored with the provided key
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/
HashTable.prototype.get = function(key) {
  return this.storage[hashCode(key, this.SIZE)][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/

// not removing empty objects from the hash table;
HashTable.prototype.remove = function(key) {
  const hashObj = this.storage[hashCode(key, this.SIZE)];
  if (hashObj) {
    delete hashObj[key];
    if (this.storage[hashCode(key, this.SIZE)] === {}) {
      delete this.storage[hashCode(key, this.SIZE)];
      this.remaining++;
      if (this.remaining > (0.75 * this.SIZE)) {
        this.resize(this.SIZE / 2);
      }
    }
  } else {
    return undefined;
  }
};

let myHash = new HashTable(4);
myHash.set('hello', 1);
myHash.set('goodbye', 2);
let keyValues = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
}
for (let key in keyValues) {
  myHash.set(key, keyValues[key]);
}
console.log(myHash);

myHash.remove('hello');
myHash.remove('goodbye');
myHash.remove('a');
myHash.remove('b');

console.log(myHash);


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
