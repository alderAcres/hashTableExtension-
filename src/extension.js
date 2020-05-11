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
  this.SIZE = 4;

  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function (key, value) {
  // pass key to hash function
  const index = hashCode(key, this.SIZE);
  // if hashed key does not exist, create storage object with hashed key and value
  if (!this.storage[index]) {
    this.storage[index] = {};
  }
  // if hashed key already exists add hashed key and value to object
  this.storage[index][key] = value;
  // if # of keys (length) is 75% or > than this.SIZE, multiply this.SIZE by 2 to double
  if (Object.keys(this.storage).length >= this.SIZE * 0.75) {
    this.SIZE = this.SIZE * 2;
    // const newStorage = {};
    // // pass each key through hashCode again and store and new hashed key index
    // for (let key in this.storage) {
    //   let newIndex = hashCode(this.storage[key], this.SIZE);
    //   newStorage[newIndex][key] = this.storage[index][key];
    // }
    // this.storage = newStorage;
  }
  return Object.keys(this.storage).length;
};

HashTable.prototype.get = function (key) {
  // return value at key at hashed key index
  return this.storage[hashCode(key, this.SIZE)][key];
};

HashTable.prototype.remove = function (key) {
  // create variable to hold and return deleted value
  let deletedKey;
  // get index of key using hashCode
  const index = hashCode(key, this.SIZE);
  // if key at hashed key index does not exist, return undefined
  if (!this.storage[index][key]) {
    return undefined;
  } else {
    // if key exists, assign it to deleted variable, and delete from this.storage
    deletedKey = this.storage[index][key];
    delete this.storage[index][key];
  }
  if (
    this.SIZE > 16 &&
    Object.keys(this.storage).length <= Math.floor(this.SIZE * 0.25)
  ) {
    this.SIZE = this.SIZE / 2;
    // rehash
  }
  // return deleted element
  return deletedKey;
};

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

let myHash = new HashTable();
myHash.set('Stephanie', 'female');
myHash.set('Jim', 'male');
console.log(myHash.set('Julie', 'female'));
console.log(myHash);
// myHash.get('Stephanie');
// myHash.remove('Jim'));
