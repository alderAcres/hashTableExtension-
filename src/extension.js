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
  this.itemsStored = 0;
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
  // use hash function to get new index
  let newIndex = hashCode(key, this.SIZE);
  // if there is nothing at this 'index', put an object there
  if (!this.storage[newIndex]){
    this.storage[newIndex] = {};
  }
  // if this key already exists, return undefined
  if (this.storage[newIndex][key]){
    return undefined
  }
  // put the value into the object we created at the correct index of our storage array
  // this should handle collisions as well
  this.storage[newIndex][key] = value;
  // increment and return itemsstored
  this.itemsStored++;
  // ** RUN THE CHECK HERE ON SIZE OF STORAGE AND IF WE HAVE TO RESIZE
  // *********************
  // *********************
  // I do have slight confusion on resizing.  The code I have in this file will resize when the number of values in the storage array is 75% of the total storage array length.  So if we start at size 16, this will resize when we add 12 values.  But I was uncertain whether we should be resizing after we have filled up 12 spots.  For example, if we have added 12 values, but have had 2 collisions, then only 10/16 spots in the array would be filled.  It would be simple to change, as I would only increment my counter of how many spots are filled if I went into the conditional on line 47/48, as opposed to incrementing every time i add a new value to the storage array.  Just was unsure the proper method.  I remember in the original assigmnet we pair programmed through, the tests were based off of items added, not spots filled.  So I followed that same logic in the examples here, I would just like some clarification on the proper methods for resizing.  Basically, should we resize when we add 12 values, or resize when we fill up 12 spots in our array.  (Yes I know 75%, not 12.  12 is just easier to explain based off our original example starting at size 16)
  // ***************************************************************************
  if (this.itemsStored >= this.SIZE * .75){
    this.resize(this.SIZE * 2);
  }
  return this.itemsStored;
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
  // get the index to look at
  let index = hashCode(key, this.SIZE)
  // if the key exists in the object at this index, return the value
  if (this.storage[index]){
    if (this.storage[index][key]){
      return this.storage[index][key];
    }
  } else {
    // if this key does not exist, return false
    return false
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
  // easy/cheating way to both store value we want to later return, or see if that key does not exist in our hash table 
  let toReturn = this.get(key);
  // if that key doesnt exist, return false
  if (toReturn === false){
    return false;
  }
  let index = hashCode(key, this.SIZE);
  // now we know the key exists.
  // check to see if its the only thing in the object.
  if (Object.keys(this.storage[index]).length === 1){
    // if so, delete whole object
    delete this.storage[index]
  } else {
    // if not, delete key value pair
    delete this.storage[index][key];
  }
  // now decrement itemsStored and return that stored value 
  this.itemsStored--;
  // RUN THE CHECK HERE ON SIZE OF STORAGE AND IF WE HAVE TO RESIZE
  
  if (this.SIZE > 16 && this.itemsStored <= this.SIZE * .25){
    this.resize(this.SIZE * .5);
  }
  return toReturn;
};

HashTable.prototype.resize = function(size){
  // reset size to our new size
  this.SIZE = size;
  // cache everything in old storage array
  let storageCache = this.storage;
  // reset storage array with new size
  this.storage = new Array(this.SIZE);
  // iterate through every object in the storage array
  storageCache.forEach(obj => {
    // iterate through every key in the object
    for (let key in obj){
      let index = hashCode(key, this.SIZE);
      // if nothing there, create new object and assign index/value, taking from the obj in the cached storage
      if (!this.storage[index]) {
        let newObj = {};
        newObj[key] = obj[key];
        this.storage[index] = newObj;
      } else {
        // if collision, just add the value to the object already at that index, taking the value from the obj in the cached storage
        this.storage[index][key] = obj[key];
      }
    }
  })
}

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
