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
  if (this.storage[internalKey] === undefined) {
    this.storage[internalKey] = [[key, value]];
    this.numElements++;
  } else {
    let alreadyInHashTable = false;
    for (let i = 0; i < this.storage[internalKey].length; i++) {
      if (this.storage[internalKey][i][0] === key) {
        alreadyInHashTable = true;
        this.storage[internalKey][i][1] = value
      }
    }
    if (!alreadyInHashTable) {
      this.storage[internalKey].push([key, value]);
      this.numElements++;
    }
  }

  // Resize upwards!
  if (this.numElements > Math.round(this.SIZE*3/4)) {
    // Set new size and init new storage.
    this.SIZE = this.SIZE*2;
    const tempStorage = new Array(this.SIZE);

    // iterate through current storage.
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i] !== undefined) {
        for (let j = 0; j < this.storage[i].length; j++) { // Iterate through chain.

          // Get a new hash code.
          const internalKey = hashCode(this.storage[i][j][0], this.SIZE);

          // Put into temp storage.
          // If no chain in temp...
          if (tempStorage[internalKey] === undefined) {
            // Build a chain.
            tempStorage[internalKey] = [[this.storage[i][j][0], this.storage[i][j][1]]];
          } else { // Chain exists...
            let alreadyInHashTable = false;
            // Check for existance of key.
            for (let i = 0; i < tempStorage[internalKey].length; i++) {
              if (tempStorage[internalKey][i][0] === key) {
                alreadyInHashTable = true;
                tempStorage[internalKey][i][1] = value
              }
            }
            // If its not on the chain, push to end.
            if (!alreadyInHashTable) {
              tempStorage[internalKey].push([this.storage[i][j][0], this.storage[i][j][1]]);
            }
          }
        }
      }
    }

    // assign new storage.
    this.storage = tempStorage;
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

  if (this.storage[internalKey] === undefined) return undefined;

  for (let i = 0; i < this.storage[internalKey].length; i++) {
    if (this.storage[internalKey][i][0] === key) return this.storage[internalKey][i][1];
  }

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

  // nothing in bucket
  if (this.storage[internalKey] === undefined) return undefined;

  // bucket found, iterate backwards.
  let returnValue = undefined;

  for (let i = this.storage[internalKey].length-1; i >= 0; i--) {

    if (this.storage[internalKey][i][0] === key) returnValue = this.storage[internalKey][i][1];
    this.storage[internalKey].splice(i,1);
    this.numElements--;
    if (this.storage[internalKey].length === 0) this.storage[internalKey] = undefined;
    break;

  }

  // Resize downwards!
  if (this.SIZE >= 16 && this.numElements < Math.round(this.SIZE*1/4)) {
    this.SIZE = this.SIZE/2;
    const tempStorage = new Array(this.SIZE);

    // iterate through current storage.
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i] !== undefined) {
        for (let j = 0; j < this.storage[i].length; j++) {

          // new hash code.
          const internalKey = hashCode(this.storage[i][j][0], this.SIZE);

          // put into temp storage
          if (tempStorage[internalKey] === undefined) {
            tempStorage[internalKey] = [[this.storage[i][j][0], this.storage[i][j][1]]];
          } else {
            let alreadyInHashTable = false;
            for (let i = 0; i < tempStorage[internalKey].length; i++) {
              if (tempStorage[internalKey][i][0] === key) {
                alreadyInHashTable = true;
                tempStorage[internalKey][i][1] = value
              }
            }
        
            if (!alreadyInHashTable) {
              tempStorage[internalKey].push([this.storage[i][j][0], this.storage[i][j][1]]);
            }
          }

        }
      }
    }

    // assign new storage.
    this.storage = tempStorage;

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
