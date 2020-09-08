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
  const maxSize = 0.75 * this.SIZE;

  //Note: Size only exceeds if total elements taken up are over 75% (i.e. 13 elements). Collisions would not count
  // Alright, out of time.

  //get the address with hash function
  const address = hashCode(key, this.SIZE);
  //check if address is currently empty, create a new bucket
  if (!this.storage[address]) {
    this.storage[address] = [];
    //add key,value into buckets
    this.storage[address][0].push([key, value]);
  }
  for (let index = 0; index < this.storage[address][0].length; index += 1) {
    const current = this.storage[address][0];
    //if key is tied to another value in current address, replace with new value
    if (current[index][0] === key) {
      current[index][1] = value;
    } else {
      //if key doens't exist, push in new key and value
      current.push([key, value]);
    }
  }
  // return the new number of items stored in the hash table
  return this.storage.length;
};

/**
 * get - Retrieves a value stored in the hash table with a specified key
 *
 * - If more than one value is stored at the key's hashed address, then you must retrieve
 *   the correct value that was originally stored with the provided key
 *
 * @param {string} key - key to lookup in hash table
 * @return {string|number|boolean} The value stored with the specified key in the
 * hash table
 */
HashTable.prototype.get = function (key) {
  //get the address with hash function
  const address = hashCode(key, this.SIZE);
  //if no bucket exists at address, prompt user for a valid key
  if (!this.storage[address]) return 'Please enter a valid key.';
  //check if key exists in bucket
  for (let index = 0; index < this.storage[address][0].length; index += 1) {
    const current = this.storage[address][0];
    if (current[index][0] === key) return value;
  }
  return `There are no values associated with ${key}.`;
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
  //get the address with hash function
  const address = hashCode(key, this.SIZE);
  //return undefined if bucket does not exist
  if (!this.storage[address]) return;
  //return undefined if key does not exist
  let current = this.storage[address][0];
  for (let index = 0; index < current.length; index += 1) {
    if (current[index][0] !== key) return undefined;
  }
  //remove key/value pair
  //find out index of key to be deleted
  let indexOfKey;
  current.forEach((array, index) => {
    if (array[0] === key) {
      indexOfKey = index;
    }
  });
  //store value (to be returned) in a variable before deletion of key/value pair
  const valueToBeDeleted = this.storage[0][indexOfKey][1];

  //deleting key/value pair
  this.storage[0].splice(indexOfKey, 1);

  return valueToBeDeleted;
};

// YOUR CODE ABOVE

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
