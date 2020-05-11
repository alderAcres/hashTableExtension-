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

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
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
HashTable.prototype.set = function(key, value) {
  
  // if we haven't encountered a particular hashcode yet, initialize it to empty object.
  if (!this.storage[hashCode(key, this.SIZE)])
    this.storage[hashCode(key, this.SIZE)] = {};
  // set the object's property found at hascode as key and value
  this.storage[hashCode(key, this.SIZE)][key] = value;

  if (this.numOfSlotsTaken() >= this.SIZE * 0.75) {
    this.increaseSize();
  }
};

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
  if (!this.storage[hashCode(key, this.SIZE)])
    return;
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
HashTable.prototype.remove = function(key) {
  if (this.storage[hashCode(key, this.SIZE)]) {
    // store value in a variable that will be returned later
    let delVal = this.storage[hashCode(key, this.SIZE)][key];
    
    // delete property from object.
    delete this.storage[hashCode(key, this.SIZE)][key];

    // if there are no more key values in the object after deleting the appropriate key.
    if (Object.keys(this.storage[hashCode(key, this.SIZE)]).length === 0) {
      delete this.storage[hashCode(key, this.SIZE)];
    }

    // reize if drops below 25%
    if (this.numOfSlotsTaken() <= this.SIZE * 0.25) {
      this.decreaseSize();
    }
    
    // return variable
    return delVal
  }
};


// HELPER: handles increasing the size of the hash (double) and rehashing all current elements;
HashTable.prototype.increaseSize = function() {
  // get all keys and values,
  const items = this.getAllItems()

  // double size of storage
  this.SIZE *= 2;
  this.storage = new Array(this.SIZE);

  // add all items back into storage;
  this.setAllItems(items);
};

// HELPER: handles decreasing the size of the hash (double) and rehashing all current elements;
HashTable.prototype.decreaseSize = function() {
  if (this.SIZE <= 16 ) return;
  // get all keys and values,
  const items = this.getAllItems()

  // half the storage, and take the maximum of halfing & 16
  this.SIZE = Math.max(16, Math.floor(this.SIZE * 0.5));
  this.storage = new Array(this.SIZE);

  // add all items back into storage;
  this.setAllItems(items);
};

// HELPER: returns number of slots taken regardless of collisions!
HashTable.prototype.numOfSlotsTaken = function() {
  let numOfSlotsTaken = 0;
  for (let i = 0; i < this.storage.length; i++) {
    if (this.storage[i] !== undefined)
      numOfSlotsTaken++;
  }
  return numOfSlotsTaken;
};

// HELPER: grabs all items even if there were collisions and returns an object
HashTable.prototype.getAllItems = function() {
  return this.storage.reduce((acc, el) => {
    if (el) {
      acc = {...acc, ...el};
    }
    return acc;
  }, {});
}

// HELPER: adds all items back into storage
HashTable.prototype.setAllItems = function(items) {
  Object.keys(items).forEach(itemKey => {
    this.set(itemKey, items[itemKey]);
  })
}


// IGNORE: PERSONAL TESTS

// hash = new HashTable();

// console.log(hash.storage);

// for (let i = 0; i < 40 ; i++) {
//   hash.set(`${i}`, i);
// }

// console.log(hash.storage);

// for (let i = 0; i < 35 ; i++) {
//   hash.remove(`${i}`);
// }

// console.log(hash.storage);

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
