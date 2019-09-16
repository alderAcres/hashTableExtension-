/* eslint-disable no-else-return */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
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

  // used to test against SIZE for resizing
  this.filledBuckets = 0;
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
  // find index to insert key:value into
  const index = hashCode(key, this.SIZE);

  // go to 'bucket' at index & check if it is undefined
  if (this.storage[index] === undefined) {
    // if undefined, initialize an empty object which will handle collisions
    this.storage[index] = {};

    // increment filledBuckets (for resizing later)
    this.filledBuckets += 1;
  }

  // on every run set the key:value in the bucket
  this.storage[index][key] = value;

  // test if resizing is required
  if (this.filledBuckets / this.SIZE >= 0.75) this.resize(2);
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
  // returning false if nothing is found
  // find index to access
  const index = hashCode(key, this.SIZE);
  let value;

  // check is bucket is undefined
  // if bucket is undefined return false (no key:value in the hash table)
  if (!this.storage[index]) return false;
  // eslint-disable-next-line no-else-return
  else {
    // else initialize variable to the value in the `index` bucket at `key`
    value = this.storage[index][key];
  }
  // if that variable is undefined, return false
  // (testing !value here could have unwanted side effects if the value is falsey?)
  if (value === undefined) return false;
  // eslint-disable-next-line no-else-return
  else return value;
  // else return the value found
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
  // find index to access
  const index = hashCode(key, this.SIZE);

  // check if value exists
  if (this.storage[index] === undefined || this.storage[index][key] === undefined) {
    return undefined;
  } else {
    // store value to be deleted
    const value = this.storage[index][key];

    // remove value from hashTable
    delete this.storage[index][key];

    // reset slot to undefined if zero items in bucket?
    if (Object.keys(this.storage[index]).length === 0) {
      this.storage[index] = undefined;

      // decrement filled buckets
      this.filledBuckets -= 1;

      // test if resizing is required
      if (this.filledBuckets / this.SIZE <= 0.25 && this.SIZE > 16) this.resize(0.5);
    }

    // return the stored value;
    return value;
  }
};

HashTable.prototype.resize = function (factor) {
  // store all the key:value pairs to be rehashed
  const rehashThese = {};

  this.storage.forEach((bucket) => {
    // iterate through all buckets
    // console.log(bucket)
    if (bucket) {
      // bucket is defined
      Object.keys(bucket).forEach((key) => {
        // iterate through keys within the bucket and add values to rehash these obj
        rehashThese[key] = bucket[key];
      });
    }
  });

  // resize the storage (readjust size), reset filledbuckets counter
  this.storage = new Array(this.SIZE * factor);
  this.SIZE = this.SIZE * factor;
  this.filledBuckets = 0;

  // iterate through all items in rehashThese, and use set on each
  // this will update filledBuckets as necessary
  Object.keys(rehashThese).forEach((key) => {
    this.set(key, rehashThese[key]);
  });
};

// tests
// const hashTable = new HashTable();
// for (let i = 0; i < 14; i += 1) {
//   hashTable.set(`key ${i}`, `value ${i}`);
// }

// console.log(hashTable);

// // remove  a bunch of key value pairs until the table has to shrink back down
// for (let i = 0; i < 6; i += 1) {
//   hashTable.remove(`key ${i}`, `value ${i}`);
// }
// console.log(hashTable);

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
