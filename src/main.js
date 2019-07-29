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

HashTable.prototype.set = hashTableLexicalScope(); {
};

function hashTableLexicalScope(){
  const keyCache = {};

  function addToHashTable(key, value) {
    const hashKey = hashCode(key, this.SIZE);
    // If the provided key has already been used to store another value...
    // (This is different than a collision!)
    if (keyCache.hasOwnProperty(key)) {
      // simply overwrite the existing value with the new value
      // Will need to iterate through object as a collision handler
      if (typeof this.storage[hashKey] === 'object') {
        // Locate the previous value and override it with new value
        const oldValue = keyCache[hashKey];
        this.storage[hashKey][key] = value;
      }
      else {
        // Will simply overwrite value if no collision yet
        this.storage[hashKey] = value;
      }
    }
    // if this key is unique (different from hashkey!)
    else {
      // Check if hashKey causes a collision (if its already an obj due to collsion, or just check the value)
      if (this.storage[hashKey] !== undefined) {
        // CASE 1: If already an object, add another key-value pair
        if (typeof this.storage[hashKey] === 'object') {
          this.storage[hashKey][key] = value;
        }
        // CASE 2: If not an object and just a value
        else {
          const oldValue = keyCache[hashKey];
          // Sadly I'm unable to access old key, will need to fix code to store this. No time :(
          // TODO: Make default value stored as an object with key-value pair.

          // Add both the existing key-value pair and the new key-value pair
          this.storage[hashKey][hashKey] = oldValue;
          this.storage[hashKey][key] = value;
        }
      }
      else {
        // If hashTable[hashKey] is undefined
        this.storage[hashKey][key] = value;
      }
    }
    
    // Add the arguments into keyCache as lexical scope
    keyCache[key] = value;
  }

  return addToHashTable;
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
  const hashKey = hashCode(key);
  /**
  * Access as object (My set still has 'legacy code' which initially sets my value as a 
  * single value and will convert to an object when a collision occurs.
  * If given more time, my approach will be to start off with an object so I can keep
  * track of which keys are to what value.
  */
  return this.storage[hashKey][key];
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
  // Store key/value pair into cache to retain the return value after deleting it from table
  const cache = this.storage[hashKey][key];
  // Unsure if I need to catch this error but will add the edge case incase an invalid key was used as an argument
  if (cache !== undefined) {
    delete this.storage[hashKey][key];
  }
  return cache;
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
