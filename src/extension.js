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

  // Initialize number of buckets filled in hash table
  this.numItems = 0;
}

/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.
* - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  // Create bucket value to store result of running hashcode on key
  const bucket = hashCode(key, this.SIZE);

  // If the storage at the bucket value is undefined, create an empty object
  if (!this.storage[bucket]) this.storage[bucket] = {};

  // If the storage at the bucket with the parameter key doesn't exist, increment number of items by one
  if (!this.storage[bucket][key]) this.numItems += 1;

  // In the object at the bucket value, store the key value pair given as parameters, which will overwrite if the same key was previously used
  this.storage[bucket][key] = value;

  // If the number of items is now over 75% of storage, double the hash table's size and rehash
  if (this.numItems > 0.75 * this.SIZE) {
    this.SIZE *= 2;
    // Store a copy of the current hashtable
    const hashCopy = new HashTable();
    // Iterate over hashtable storage and set every bucket to undefined
    for (let prop of this.storage) {
      hashCopy.storage[prop] = this.storage[prop];
      this.storage[prop] = undefined;
    }

    // Iterate over copy of hashtable storage
    for (let prop of hashCopy.storage) {
      // If the current storage doesn't have an undefined bucket
      if (hashCopy.storage[prop]) {
        // Iterate over key value pairs in bucket
        for (let currKey in hashCopy.storage[prop]) {
          // Get current value
          const currVal = hashCopy.storage[prop][currKey];
          // Run set with the new doubled this.SIZE
          this.set(currKey, currVal);
        }
      }
    }
  }

  // Return the number of items in the hash table
  return this.numItems;
};

// Tests:
// const hash = new HashTable();
// for (let i = 0; i < 14; i += 1) {
//   hash.set(`round ${i}`, i);
// }
// console.log(hash);

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
  // Get value of bucket at key 
  const bucket = hashCode(key, this.SIZE);

  // If nothing stored at bucket, return key doesn't exist
  if (!this.storage[bucket] || !this.storage[bucket][key]) return "Key does not exist in hash table";

  // Return value stored at bucket with specified key if it exists 
  if (this.storage[bucket][key]) {
    return this.storage[bucket][key];
  } 
};


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
* - If the hash table's SIZE is greater than 16 and the result of removing the
  item drops the number of stored items to be less than 25% of the hash table's SIZE
  (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // Get value of bucket at key
  const bucket = hashCode(key, this.SIZE);

  // If hash table has value at key in that bucket, store that value
  let returnVal;
  if (this.storage[bucket] && this.storage[bucket][key]) {
    returnVal = this.storage[bucket][key];
  } else {
    // Else return undefined
    return undefined;
  }

  // Delete key value pair
  delete this.storage[bucket][key];

  // Return value 
  return returnVal;
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
