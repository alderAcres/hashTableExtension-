/* eslint-disable */
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
  this.DOUBLE_SIZE_THRESHOLD = 0.75;
  this.HALF_SIZE_THRESHOLD = 0.35;
  this.numItems = 0;
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
  let binNum = hashCode(key, this.SIZE);

  // Add new object to store things if bin was empty
  if (this.storage[binNum] === undefined) this.storage[binNum] = {};

  // Test to see if we are overwriting the key, only want to increment number of items if not overwriting
  if (this.storage[binNum][key] === undefined) {
    this.numItems += 1;
    // If exceeding desired size - should have placed the item first and then rehased everything, would have been easier
    if (this.numItems > this.SIZE * this.DOUBLE_SIZE_THRESHOLD) {
      // Get key values
      var keyValToRehash = this.getAllKeyValPairs();
      // Double size and reset storage
      this.SIZE *= 2;
      this.storage = new Array(this.SIZE);
      this.numItems = 1; //The one that will be added at the end of this set call.
      // Replace all values
      for (rehashKey in keyValToRehash) {
        this.set(rehashKey, keyValToRehash[rehashKey]);
      }
      // Get new bin number for current item
      binNum = hashCode(key, this.SIZE);
      if (this.storage[binNum] === undefined) this.storage[binNum] = {};
    }
  }

  // Store/Overwrite key value
  this.storage[binNum][key] = value;

  // Return new number of items
  return this.numItems;
};

HashTable.prototype.getAllKeyValPairs = function(){
  let collectedKeyVal = {};
  this.storage.forEach(function(binObj){
    if (binObj !== undefined) {
      Object.keys(binObj).forEach(function(key){
        collectedKeyVal[key] = binObj[key];
      })
    }
  })
  return collectedKeyVal;
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
  let binNum = hashCode(key, this.SIZE);

  // Returns the value stored with the key or undefined if the key/value pair was never set
  return this.storage[binNum][key];
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
  let binNum = hashCode(key, this.SIZE);

  // Check for an object in that bin
  if (this.storage[binNum] === undefined) return undefined;

  // Gets the value stored with the key or undefined if the key/value pair was never set
  let returnValue =  this.storage[binNum][key];

  // If the value exists, remove and decrement the number of items
  if (returnValue !== undefined){
      delete this.storage[binNum][key];
      this.numItems -= 1;
      //  DIDNT GET TO IMPLEMENT DOWNSIZING HERE ):
  }

  return returnValue;
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
