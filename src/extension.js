/* eslint-disable max-len */
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


// ******* INCOMPLETE *****



// PASTE AND MODIFY YOUR CODE BELOW
function HashTable() {
  this.SIZE = 16;
  this.stored = 0;
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
  // create variable to store result of invoking hashCode passing in key and size of hash table as args.
  const hashedIndex = hashCode(key, this.SIZE);
  // If adding the new item will push the number of stored items to over 75% of the hash table's SIZE
  if (this.storage + 1 > Math.floor((this.SIZE / 4) * 3)) {
    // double the hash table's SIZE
    this.SIZE *= 2;
    // rehash everything
    // iterate over hash table
    this.storage.forEach(bucket => {
      // if current bucket has a value
      if (bucket) {
        // create variable to store current buckets key-value pairs in array
        const entries = Object.entries(bucket);
        // iterate over entries array
        entries.forEach((entry) => {
          // create variables to store temp key and value
          const [tempKey, tempValue] = [entry[0], entry[1]];
          // remove tempKey from bucket
          delete this.storage[hashedIndex][tempKey];
          // get tempKey's new hash code
          const reHash = hashCode(tempKey, this.SIZE);
          // add temporary property at new bucket at reHash's index
          
        })
      }
    })
  }
  // if bucket at hashedIndex does not exist
  if (!this.storage[hashedIndex]) {
    // add empty object to bucket located at hashedIndex
    this.storage[hashedIndex] = {};
    // increment number of stored items by 1
    this.stored += 1;
  }
  // create proprety on object in bucket located at hashedIndex
  this.storage[hashedIndex][key] = value;
  // return number of stored items
  return this.stored;
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
  if (this.stored === 0) return undefined;
  // create varable to store result of invoking hashCode passing in key and size of hash table as args
  const hashedIndex = hashCode(key, this.SIZE);
  // if bucket at hashedIndex is empty, return undefined;
  if (!this.storage[hashedIndex]) return undefined;
  // return value of given key at bucket located at hashedIndex
  return this.storage[hashedIndex][key];
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
  // if hash table is empty, return undefined
  if (this.stored === 0) return undefined;
  // create varable to store result of invoking hashCode passing in key and size of hash table as args
  const hashedIndex = hashCode(key, this.SIZE);
  // if bucket at hashedIndex is empty return undefined
  if (!this.storage[hashedIndex]) return undefined;
  // temporarily store value to be deleted
  const removed = this.storage[hashedIndex][key];
  // delete property with given key at bucket located at hashedIndex
  delete this.storage[hashedIndex][key];
  // decrement stored property on Hash Table
  this.stored -= 1;
  // return removed value
  return removed;
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
