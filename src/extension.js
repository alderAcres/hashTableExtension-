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
  let addressIndex = hashCode(key, this.SIZE);
  const newBucket = {};
  if (this.storage[addressIndex]) {
    this.storage[addressIndex][key] = value;
  } else {
    newBucket[key] = value;
    this.storage[addressIndex] = newBucket;
  }
  let numberOfItems = 0;
  for (let i = 0; i < this.storage.length; i+=1) {
    // Directions for "number" of items unclear - are items every key/value pair? or elements of the storage array?
    // 1. Below is the method if "items" are every key/value pair
    if (this.storage[i]) {
      numberOfItems += 1;
    }
    //2. Below is the method if "items" are elements of the storage array
    // if (this.storage[i]) {
    //   Object.keys(this.storage[i]).forEach(() => numberOfItems += 1);
    // }
  }

  if (numberOfItems > Math.floor(this.SIZE * .75)) {
    this.SIZE *= 2;
    const newTable = new HashTable();
    newTable.SIZE = this.SIZE;
    for (let i = 0; i < this.storage.length; i+=1) {
      if (this.storage[i]) {
        Object.entries(this.storage[i]).forEach(([key, value]) => {
          newTable.set(key, value);
        })
      }
    }
    this.storage = newTable.storage;
  }
  return numberOfItems;
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
  let addressIndex = hashCode(key, this.SIZE);
  if (this.storage[addressIndex]) {
    return this.storage[addressIndex][key];
  } else {
    return 'Does Not Exist';
    // or False *** Didn't put return false in case value that is stored could be false *** See below example
  }
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
  let addressIndex = hashCode(key, this.SIZE);
  let deleted;
  if (this.storage[addressIndex]) {
    deleted = this.storage[addressIndex][key];

    if (Object.keys(this.storage[addressIndex]).length === 1) {
      delete this.storage[addressIndex];
    } else {
      delete this.storage[addressIndex][key];
    }

    // Possibly Make lines 124 - 143 since we are repeating it in set ???
    let numberOfItems = 0;
    for (let i = 0; i < this.storage.length; i+=1) {
      if (this.storage[i]) {
        numberOfItems += 1;
      }
    }

    if (this.SIZE > 16 && numberOfItems < Math.floor(this.SIZE * .25)) {
      this.SIZE /= 2;
      const newTable = new HashTable();
      newTable.SIZE = this.SIZE;
      for (let i = 0; i < this.storage.length; i+=1) {
        if (this.storage[i]) {
          Object.entries(this.storage[i]).forEach(([key, value]) => {
            newTable.set(key, value);
          })
        }
      }
      this.storage = newTable.storage;
    }

    return deleted;
  } else {
    return undefined;
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
