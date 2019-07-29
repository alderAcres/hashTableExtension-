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
  // Store our storage location in a variable by putting the output of hash function into a variable called storageLocation

  // counter variable that will increment as we iterate over our storage array
  let sizeCounter = 0;
  for (let i = 0; i < this.storage.length; i += 1) {
    if (this.storage[i]) sizeCounter += 1;
  }
  // If the used space is greater than 75%
  if (sizeCounter / this.SIZE > 0.75) {
    // Create a new hash table that is double the size
    const newHashTable = new Array(this.SIZE * 2);

    // Iterate over the old hash table and pull out all of the values.
    for (let i = 0; i < this.storage.length; i += 1) {
      if (typeof this.storage[i] === "object") {
        const storageLocationKeys = Object.keys(this.storage[i]);
        const storageLocationValues = Object.values(this.storage[i]);
        for (let j = 0; j < storageLocationKeys.length; j += 1) {
          // Read existing key and send it to hash function for the new hashed location
          const newStorageLocation = hashCode(
            storageLocationKeys[j],
            this.SIZE * 2
          );

          if (!newHashTable[newStorageLocation][storageLocationKeys[j]]) {
            newHashTable[newStorageLocation] = {};
            newHashTable[newStorageLocation][storageLocationKeys[j]] = value;
          } else
            newHashTable[newStorageLocation][storageLocationKeys[j]] =
              storageLocationValues[j];
        }
      }
    }

    // Once everything is copied over, redirect this.storage to newHashTable AND double the size property
    this.SIZE = this.SIZE * 2;
    this.storage = newHashTable;
  }

  const storageLocation = hashCode(key, this.SIZE);

  // If nothing is stored at storageLocation, create a new object and to store the key value pair
  if (!this.storage[storageLocation][key]) {
    this.storage[storageLocation] = { key: value };
  } else this.storage[storageLocation][key] = value; // Else, add the key value pair to the object.
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
  // Send key to hash function and store location in variable storageLocation
  const storageLocation = hashCode(key, this.SIZE);
  // If the key does not exist on the object stored at the hashed location, return false
  if (this.storage[storageLocation][key]) {
    return false;
  } else return this.storage[storageLocation][key]; // Else, return the value associated with the key.
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
  // Send key to hash function and store location in variable storageLocation
  const storageLocation = hashCode(key, this.SIZE);
  // If the key does not exist on the object stored at the hashed location, return false
  if (this.storage[storageLocation][key]) {
    return false;
  } else delete this.storage[storageLocation][key]; // Else, return the value associated with the key.
};

// YOUR CODE ABOVE

function hashCode(string, size) {
  "use strict";

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
