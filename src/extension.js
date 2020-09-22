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
  
  // add 2 properties to the hashTable constructor to keep track of how full it is and when it would be time to increase or decrease the size of the hash table
  this.increaseLimit = 0.75 * this.SIZE;
  this.decreaseLimit = 0.25 * this.SIZE;

  // in addition to previous new properties, also need to declare a variable called currentCapacity to keep track of when it should be necessary to double the size of the table
  this.currentCapacity = 0;
}

/**
 * set - Adds given value to the hash table with specified key.
 *
 * - If the provided key has already been used to store another value, simply overwrite
 *   the existing value with the new value.
 * - If the hashed address already contains another key/value pair, you must handle
 *   the collision appropriately.
 *SIZE
 * @param {string} key - key to be used to create hashed address
 * @param {string|number|boolean} value - value to be stored in hash table
 * @return {number} The new number of items stored in the hash table
 */
HashTable.prototype.set = function (key, value) {
  // any time set is called, currentCapacity should increase by 1
  this.currentCapacity++;
  // if the current capacity is at the limit of 75% of the size, need to double the size of the array
  if (this.currentCapacity === this.increaseLimit) {
    //double this SIZE
    this.SIZE *= 2;

    // now have to rehash everything, but how???
    
    // retrieve a list of all the existing key-value pairs inside the storage array, store them inside a temporary object
    // nested for loops?
    let tempObj = {};
    // for every object inside the storage array
    this.storage.forEach(index => {
      // for every key-value pair inside each object
      for (let key in index) {
        // store them inside the temporary object
        tempObj[key] = index[key];
      }
    });

    // empty current storage array
    this.storage = new Array(this.SIZE);
    // loop through the temporary object and call set method recursively on every single key-value pair
    for (let i = 0; i < Object.keys(tempObj).length; i++) {
      this.set()
    }
  }

  let hashedKey = hashCode(key, this.SIZE);
  if (this.storage[hashedKey] === undefined) {
    this.storage[hashedKey] = {};
    this.storage[hashedKey][key] = value;
  }
  else {
    let hashedKeyObject = this.storage[hashedKey];
    if (typeof hashedKeyObject === 'object') {
      if (hashedKeyObject.hasOwnProperty(key)) {
        console.log('This key has previously been used at this hashed index, replacing its matching value');
        hashedKeyObject[key] = value;
        return;
      }
      else {
        hashedKeyObject[key] = value;
      }
    }
  }
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
HashTable.prototype.get = function (key) {
  let hashedKey = hashCode(key, this.SIZE);
  if (this.storage[hashedKey] === undefined) {
    console.log('This hashed index is empty');
    return;
  }
  else {
    let hashedKeyObject = this.storage[hashedKey];
    if (hashedKeyObject.hasOwnProperty(key)) {
      return hashedKeyObject[key];
    }
    else {
      console.log('This hashed index does not contain the target key.');
      return;
    }
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
HashTable.prototype.remove = function (key) {
  let hashedKey = hashCode(key, this.SIZE);
  if (this.storage[hashedKey] === undefined) {
    console.log('This hashed index is empty, nothing to remove.');
    return;
  }
  else {
    let hashedKeyObject = this.storage[hashedKey];
    if (hashedKeyObject.hasOwnProperty(key)) {
      delete hashedKeyObject[key];
    }
    else {
      console.log('This hashed index does not contain this key.');
      return;
    }
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
