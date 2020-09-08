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
  // pass our key argument (along with the size of the hash table)
  // into the hash function and save the return value to a variable
  const index = hashCode(key, this.SIZE);
  // if there is already a key/value pair stored at the bucket associated with the index
  // and there isn't already an array there to deal with collisions...
  if (this.storage[index] && !Array.isArray(this.storage[index])) {
    // ...store the key/value pair that is there in a variable
    const existingValue = this.storage[index];
    // create an empty array to deal with the collision and insert it into the bucket
    const collisionArray = [];
    this.storage[index] = collisionArray;
    // create an array to hold the key/value pair
    const keyValue = [key, value];
    // push the exisitng value into the array
    collisionArray.push(existingValue);
    // and push our new key/value pair into that array too
    collisionArray.push(keyValue);
    // if there already is an array in the bucket to deal with collisions
  } else if (Array.isArray(this.storage[index])) {
    // save the bucket's array under a different name that's easier to deal with
    const collisionArray = this.storage[index];
    // create an array to hold the key/value pair
    const keyValue = [key, value];
    // and push the key/value pair into the collision array
    collisionArray.push(keyValue);
  } else {
    // otherwise, add our value to the appropriate bucket
    // in the hash table by using our index variable
    this.storage[index] = value;
  }
  // if the amount of items is now 75% of the size of the hash table...
  if (Object.entries(this.storage).length === (this.SIZE * 0.75)) {
    // double the size of the hash table
    this.SIZE *= 2;
    // and rehash everything
    return this.set(key, value);
  }
  // return the number of items stored in the hash table
  return Object.entries(this.storage).length;
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
  // pass our key argument (along with the size of the hash table)
  // into the hash function and save the return value to a variable
  const index = hashCode(key, this.SIZE);
  // if the value of the bucket associated with the index is an array
  // (and therefore other keys have values stored there too)
  if (Array.isArray(this.storage[index])) {
    // save the bucket's array under a different name that's easier to deal with
    const collisionArray = this.storage[index];
    // iterate through this array, looking for an element that matches our key
    for (let i = 0; i < collisionArray.length; i += 1) {
      // if we find one...
      if (collisionArray[i][0] === key) {
        // ...return the associated value
        return collisionArray[i][1];
      }
    }
  } else {
    // otherwise, if we aren't dealing with collisions,
    // return the value retrieved from the bucket associated with the index variable
    return this.storage[index];
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
  // pass our key argument (along with the size of the hash table)
  // into the hash function and save the return value to a variable
  const index = hashCode(key, this.SIZE);
  // save the key/value pair in the bucket associated with our index variable
  const deletedValue = this.storage[index];
  // delete that key/value pair from the hash table
  delete this.storage[index];
  // return the deleted value
  return deletedValue;
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
