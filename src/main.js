/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;

  this.numElements = 0;
  
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
  // Hash the key.
  const internalKey = hashCode(key, this.SIZE);

  // Insert into hash table.
  // If the bucket is undefined, init a new chaining array.
  if (this.storage[internalKey] === undefined) {
    this.storage[internalKey] = [[key, value]];
    this.numElements++;
  } else {
    // Else, elements exist in bucket.
    let alreadyInHashTable = false;

    // Iterate through array chain, checking for existence of key.
    for (let i = 0; i < this.storage[internalKey].length; i++) {
      // If we've found the key, just reset its value in the chain.
      if (this.storage[internalKey][i][0] === key) {
        alreadyInHashTable = true;
        this.storage[internalKey][i][1] = value;
      }
    }

    // If the key is not in the chain, push key/value on the chain.
    if (!alreadyInHashTable) {
      this.storage[internalKey].push([key, value]);
      this.numElements++;
    }
  }

  // Return number of elements in the array.
  return this.numElements;
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
  // Hash the key.
  const internalKey = hashCode(key, this.SIZE);

  // If there is nothing on the chain, return undefined.
  if (this.storage[internalKey] === undefined) return undefined;

  // Iterate through the chain, looking for the key.
  for (let i = 0; i < this.storage[internalKey].length; i++) {
    // If key found, return value.
    if (this.storage[internalKey][i][0] === key) return this.storage[internalKey][i][1];
  }

  // Otherwise, return undefined.
  return undefined;
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
  // Hash the key.
  const internalKey = hashCode(key, this.SIZE);

  // If nothing in bucket, return undefined.
  if (this.storage[internalKey] === undefined) return undefined;

  // Otherwise, bucket found, iterate backwards.
  let returnValue = undefined;

  // Iterate backwards through the bucket.
  for (let i = this.storage[internalKey].length-1; i >= 0; i--) {
    // If the key is found, set the return value.
    if (this.storage[internalKey][i][0] === key) returnValue = this.storage[internalKey][i][1];
    // Delete the key/value from the chain.
    this.storage[internalKey].splice(i,1);
    // Decrement elements.
    this.numElements--;
    // Delete the chain if no elements remain in bucket.
    if (this.storage[internalKey].length === 0) this.storage[internalKey] = undefined;
    break;
  }

  // Return the return value.
  return returnValue;
};


// Do not modify
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
