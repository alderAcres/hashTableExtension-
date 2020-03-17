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
  this.SIZE = 4;
  
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
HashTable.prototype.set = function (key, value) {
  // create a counter
  let counter = 0;

  // count up how many items are in this.storage's buckets by looping over the outer array
  for (let i = 0; i < this.SIZE; i += 1) {
      // only check indexes that have keys
      if (this.storage[i] !== undefined) {
      const keys = Object.keys(this.storage[i]);
      // and looping over all the keys...
      for (let j = 0; j < keys.length; j += 1) {
        // add to a counter for every key in this bucket
        counter += 1;
      }
    }
  }

  // check whether the number of items plus the new item will be > 75% of this.SIZE
  if ((counter + 1) > ((this.SIZE / 4) * 3)) {
    // if it is, double this.SIZE
    this.SIZE *= 2;
    // also... loop over the outer array
    for (let i = 0; i < this.SIZE; i += 1) {
      // for each index, loop over all the keys in that bucket. Only check indexes that have keys
      if (this.storage[i] !== undefined) {
        const keys = Object.keys(this.storage[i]);
        // and looping over all the buckets
        for (let j = 0; j < keys.length; j += 1) {
          // save each key and delete the key/value pair from the bucket
          const savedKey = keys[j];
          const savedValue = this.storage[i][savedKey];
          delete this.storage[i][savedKey];
          // add the key back to the table
          this.set(savedKey, savedValue);
        }
      }
    }
  }

  // figure out the index where we want to store this key/value pair by running the key through the hashing function
  const index = (hashCode(key, this.SIZE));
  // if an object doesn't exist at this index yet, create an empty object at the index
  if (typeof this.storage[index] !== 'object') {
    this.storage[index] = {};
  }
  // in the object, add/overwrite the key value pair
  this.storage[index][key] = value;
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
HashTable.prototype.get = function (key) {
  // run key through hashing function to get index
  const index = (hashCode(key, this.SIZE));
  // return the value stored at the key
  return this.storage[index][key];
}

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // run key through hashing function to get index
  let index = (hashCode(key, this.SIZE));
  // check whether the key/value pair exists
  if (this.storage[index][key]) {
    // if it does, we need to check whether removing this key/value pair will make the table too small
    // but first, we only need to check that if this.SIZE is great than 16
    if (this.SIZE > 16) {
      // create a counter
      let counter = 0;

      // count up how many items are in this.storage's buckets by looping over the outer array
      for (let i = 0; i < this.SIZE; i += 1) {
        // only check indexes that have keys
        if (this.storage[i] !== undefined) {
          const keys = Object.keys(this.storage[i]);
          // and looping over all the keys...
          for (let j = 0; j < keys.length; j += 1) {
            // add to a counter for every key in this bucket
            counter += 1;
          }
        }
      }

      // check whether the number of items minus the deleted item will be < 25% of this.SIZE
      if ((counter - 1) > (this.SIZE / 4)) {
        // if it is, we will halve this.SIZE, but not yet
        this.SIZE /= 2;
        // also... loop over the outer array with the original size so we don't miss anything
        for (let i = 0; i < (this.SIZE * 2); i += 1) {
          // for each index, loop over all the keys in that bucket. Only check indexes that have keys
          if (this.storage[i] !== undefined) {
            const keys = Object.keys(this.storage[i]);
            // and looping over all the buckets
            for (let j = 0; j < keys.length; j += 1) {
              // save each key and delete the key/value pair from the bucket
              const savedKey = keys[j];
              const savedValue = this.storage[i][savedKey];
              delete this.storage[i][savedKey];
              // add the key back to the table - this will use the new size
              this.set(savedKey, savedValue);
            }
          }
        }
      }

      // now that we're done with resizing, check the index again
      // run key through hashing function to get index
      index = (hashCode(key, this.SIZE));
      const saved = key;
      // if so, delete it and return the key
      delete this.storage[index][saved];
      return saved;
    }
  return undefined;
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

// TESTS
const table = new HashTable();
table.set('test', 'it\'s working! test is here');
table.set('great', 'great is here');
table.set('anotherOne', 'another one here');
table.set('heyThere', 'hey there made it');
console.log(table);
table.remove('great');
console.log(table);
