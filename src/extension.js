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
  // If adding the new item will push the number of stored items to over 75% of
  // the hash table's SIZE, then double the hash table's SIZE and rehash everything
  // declare a variable called rehash that will be a flag as to whether or not the hash table needs to increase size and rehash addresses
  // loop over this.storage, count # of undefined.
  // if undefined < 25% of hash table (undefined count / hash table length), then reassign rehash to true
  // once we exit for loop, have a conditional that says if rehash = true, then change this.SIZE to this.SIZE * 2
  // then rehash everything in the array -- do this by iterating through the array
  // console.log(this.SIZE, value);
  // // if (this.storage.key === key)
  // let hashAddress = hashCode(key, this.SIZE);
  // if (!this.storage[hashAddress]) {
  //   this.storage[hashAddress] = { [key]: value };
  // }
  // this.storage[hashAddress][key] = value;
  // console.log(key, hashAddress);
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
  // iterate through this.storage
  // if this.storage at the current index .hasOwnProperty(key), then return the value
  for (let i = 0; i < this.storage.length; i += 1) {
    // console.log(this.storage[i]);
    // need to rework this code, in case hashtable is full of data, will this still work?
    if (this.storage[i] !== undefined) {
      let curVal = this.storage[i];
      if (curVal.hasOwnProperty(key)) {
        // console.log(curVal)
        // console.log(curVal[key])
        return curVal[key];
      }
    }
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
  // if the key DOES exist, delete a key/value pair from the hash table
  // how to access the key without the hashCode?
  // iterate through this.storage
  // for (let i = 0; i < this.storage.length; i += 1) {
  //   let currHash = this.storage[i];
  //   console.log(currHash);
  //   if (currHash !== undefined) {
  //     if (currHash.hasOwnProperty(key)) {
  //       delete currHash[key];
  //       // if this.storage at the current index has the key, then delete it;
  //     }
  //   }
  // }
  // // if they key does not exist after looping through this.storage, return undefined -- start off with this conditional;
  // return undefined;
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

const newHashTable = new HashTable();
console.log(newHashTable);
newHashTable.storage[11] = { orange: 1 };
console.log(newHashTable.storage);
newHashTable.set('banana', 8);
console.log(newHashTable.storage);
newHashTable.set('banana', 2);
console.log(newHashTable.storage);
newHashTable.set('apple', 3);
console.log(newHashTable.storage);
console.log(newHashTable.get('orange'));
newHashTable.remove('banana');
console.log(newHashTable.storage);
console.log(newHashTable.remove('banana'));

// Do not remove!!
module.exports = HashTable;
