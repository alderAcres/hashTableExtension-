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
* set - If adding the new item will push the number of stored items to over 75% of the hash table's SIZE, then double the hash table's SIZE and rehash everything
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  // establish index based through hashCode function
  const index = hashCode(key, this.SIZE);
  // locate index of HashTable array and determine if it is empty (undefined)
  if (!this.storage[index]) {
    // if empty, create new object w/ new key/val property and add to array
    const newObj = {}; // create new empty object
    newObj[key] = value; // add property
    this.storage[index] = newObj; // add object to array index
  }
  // else, simply add the new property to preexisting object
  this.storage[index][key] = value;

  // EXTENSION (Incomplete)
  // calculate number of undefined elements in storage
  let undef = 0;
  this.storage.forEach(el => {
    if (el === undefined) {
      undef += 1;
    };
  });
  // if number of undefined elements is <= 25% of storage array length
  if () {
    // double storage array length
    this.SIZE *= 2;
  }
};

/**
* get - If the hash table's SIZE is greater than 16 and the result of removing the item drops the number of stored items to be less than 25% of the hash table's SIZE (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/
HashTable.prototype.get = function(key) {
  // establish index based through hashCode function
  const index = hashCode(key, this.SIZE);
  // locate index of HashTable array and return result at index or undefined if empty
  return this.storage[index] ? this.storage[index][key] : undefined;

  // EXTENSION (Incomplete)
  // if this.SIZE > 16 and number of undefined elements is >= 75% of storage array length; divide storage length in half.
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
  // establish index based through hashCode function
  const index = hashCode(key, this.SIZE);
  // locate index of HashTable array and determine if it is empty (undefined)
  if (!this.storage[index]) {
    return undefined;
  } else { // else, delete and return key/val pair;
    const removed = this.storage[index][key]; // create copy of property to be deleted in order to ultimately return;
    delete this.storage[index][key]; // delete key/val pair
    return removed;
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
