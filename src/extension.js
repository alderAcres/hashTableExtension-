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
// I may not get this all just yet!
// Good links
// http://rvbsanjose.github.io/hash-table-resizing/
// https://medium.com/@sooeung2/hash-table-in-javascript-d213057711c2

function HashTable() {
  this.SIZE = 16;
  this.numOfBuckets = 0;
  this.storage = new Array(this.SIZE);
  // Not sure why for result, check the links above
  this.result = {};
}

// Resize function
HashTable.prototype.resize = function (newLimit) {
  // Keep a copy of the old storage before resetting it
  let oldStorage = this.storage;
  // Update the size limit of the storage
  let storageLimit = newLimit;
  // Clear the original storage
  this.storage = [];

  // Iterate through each bucket in the oldStorage
  for (let i = 0; i < oldStorage.length; i += 1) {
    let bucket = oldStorage[i];
    if (bucket) {
      // Reassign for each bucket
      for (let j = 0; j < bucket.length; j += 1) {
        const hash = hashCode[(bucket[j][0], storageLimit)];
        let newBucket = this.storage(hash);
        if (newBucket) {
          newBucket.push([bucket[j][0], bucket[j][1]]);
        } else {
          newBucket = [];
          newBucket.push([bucket[j][0], bucket[j][1]]);
        }
      }
    }
  }
};

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
  // Convert key to hash value with hashCode function
  // In hashCode function, pass in key, this.SIZE
  const hash = hashCode(key, this.SIZE);

  // Is this.storage undefined ie is there anything in there?
  // If it is undefined, assign it to an empty object
  if (this.storage[hash] === undefined) {
    this.storage[hash] = {};
    // We're adding a hash, so increase the numOfBuckets value by 1
    this.numOfBuckets += 1;
  }
  // With hash value, this.storage.hash assigned to value
  // This will overwrite an existing value with the new value
  this.storage[hash][key] = value;

  // Resize the hash if greater than 75% full
  // Dale a tu cuerpo alegria Macarena
  // Que tu cuerpo es pa' darle alegria cosa buena
  // Dale a tu cuerpo alegria, Macarena
  // HEEEEEEEEEEYYYYYYYY MACARENA

  if (this.numOfBuckets / this.SIZE > 0.75) {
    // TODO: This code needs work
    this.result.resize(storageLimit * 2);
  }
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
  // Get the hash from the key
  // Return storage[hash]
  const hash = hashCode(key, this.SIZE);

  // If this.storage[hash] is undefined, return undefined
  if (this.storage[hash] === undefined) return undefined;

  return this.storage[hash][key];
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
  const hash = hashCode(key, this.SIZE);
  // If the key doesn't exist, return undefined
  if (this.storage[hash] === undefined) return undefined;

  // Decrease numOfBuckets
  this.numOfBuckets -= 1;

  // Resize the hash if less than 25% full
  if (this.numOfBuckets / this.SIZE < 0.25) {
    // TODO: This code needs work
    this.result.resize(storageLimit / 2);
  }
  // Value of the deleted key that will be returned after being deleted from the hash table
  const returnValue = this.storage[hash][key];
  // Delete key/value pair from the hash table
  delete this.storage[hash][key];
  // Return value of deleted key
  return returnValue;
};

// YOUR CODE ABOVE

// hashCode is a given function
function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
