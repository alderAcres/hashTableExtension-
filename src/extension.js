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
  const capacity = this.storage.reduce((acc, cur) => {
    if (Object.keys(cur).length === 0 || undefined) {
      return acc;
    }
    return acc + 1;
  }, 0);

  if (capacity > this.SIZE * 0.75) {
    const previousData = this.storage.reduce((acc, cur) => {
      return { ...acc, ...cur };
    }, {});
    this.SIZE *= 2;
    this.storage = new Array(this.SIZE);
    Object.keys(previousData).forEach((e) => {
      this.set(e, previousData[e]);
    });
  }

  // get index by calling hashCode with key;
  const binNumber = hashCode(key, this.SIZE);
  // store key value pair as an object in storage at binNumber
  const obj = {};
  // if there is no data in the storage at binNumber, create an obj with key/value pair passed in as a parameter
  // and assign it inside the storage at binNumber
  if (!this.storage[binNumber]) {
    obj[key] = value;
    this.storage[binNumber] = obj;
    // if there is data already in storage at binNumber, combine current data with new obj and storage as one object to reduce collision
  } else {
    this.storage[binNumber][key] = value;
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
  // run hashCode to find out where to look for key in hash table
  const binNumber = hashCode(key, this.SIZE);
  // if data in hash table at binNumber contains key return the value of the key
  if (Object.keys(this.storage[binNumber]).includes(key.toString())) {
    return this.storage[binNumber][key];
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
HashTable.prototype.remove = function (key) {
  // run hashCode to find out where to look for key in hash table
  const binNumber = hashCode(key, this.SIZE);
  // if key exists in storage at the binNumber
  if (this.storage[binNumber][key]) {
    // assign temporary variable to hold value
    const deletedValue = this.storage[binNumber][key];
    // delete the key in the hashtable at the binNumber
    delete this.storage[binNumber][key];
    // return out the temporary variable
    return deletedValue;
  }
};

// YOUR CODE ABOVE

function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
