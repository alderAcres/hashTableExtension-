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
  // a count of the number of unique key-value pairs in the hashtable
  this.count = 0;
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

// 
/**
 * resize - Method that dynamically resizes the hashtable when the load factor exceeds some threshold
 * @param {number}  newSIZE - the new size of the hashtable
 * @return {undefined}
 */
HashTable.prototype.resize(newSIZE) {
  // initialize new hashtable
  // compute new buckets for each existing entry in the current hashtable
  // copy over the buckets to their new locations in the new hashtable
  // reassign storage to point to the new hashtable
  // reassign size to the size of the new hashtable
}

HashTable.prototype.set = function (key, value) {
  // check if hashtable exceeds load factor
  // if so, resize the table before inserting 
  if (this.count >= 0.75 * this.SIZE) {
    this.resize(2 * this.SIZE);
  }
  // compute the hash of the passed in key
  const hashedKey = hashCode(key, this.SIZE);
  // this hashedKey is the "bucket" that the key-value pair will be placed in
  // each bucket will be an object
  if (!this.storage[hashedKey]) {
    // if that bucket object does not yet exist, create an new one, insert
    // the key-value pair into the bucket. then put that bucket in the correct
    // location in the hashtable
    const newBucket = {};
    newBucket[key] = value;
    this.storage[hashedKey] = newBucket;
  } else {
    // if it does exist, there might be a collision!
    // if the key already exists in the bucket, then we are overwriting and we
    // should not increment count. we return the current count
    if (this.storage[hashedKey][key]) {
      this.storage[hashedKey][key] = value;
      return this.count;
    }
    // otherwise, it is definitely a collision;
    this.storage[hashedKey][key] = value;
  }
  // increment the count of unique pairs in the hashtable
  this.count += 1;
  // return the new number of items stored in the hashtable
  return this.count;
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
  // compute the hash of the passed in key to determine which bucket to look at
  const hashedKey = hashCode(key, this.SIZE);
  // access the object in the bucket and use the unhashed key to retrieve its
  // associated value
  const value = this.storage[hashedKey][key];
  return value;
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
  // compute the hash of the passed in key to determine which bucket to look at
  const hashedKey = hashCode(key, this.SIZE);
  // if there is no object in the bucket then it does not exist in the hashtable
  if (!this.storage[hashedKey]) return;
  // access the object in the bucket and delete the key-value pair
  const removedValue = this.storage[hashedKey][key];
  // delete the entry from the hashtable
  delete this.storage[hashedKey][key];
  // return the value
  // decrement the count of unique pairs in the hashtable
  this.count -= 1;
  // check if after removing an item if the load factor is less than 25%
  // if so, resize the hashtable
  if (this.count <= 0.25 * this.SIZE && this.SIZE >= 32) {
    this.resize(0.5 * this.SIZE);
  }
  // eslint-disable-next-line consistent-return
  return removedValue;
};

// Do not modify
function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}


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
