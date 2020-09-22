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
HashTable.prototype.set = function (key, value) {
  let hashIdx = hashCode(key, this.SIZE);
  if (!this.storage[hashIdx]) this.storage[hashIdx] = {};

  this.storage[hashIdx][key] = value;

  //Get current number of elements in hash
  let curSize = this.checkSize();

  // Since we added an element, we must check to see if it is greater than 75% of current size
  if (curSize > this.SIZE * 0.75) {
    // If so, double the size and call the resize function
    this.SIZE = this.SIZE * 2;
    this.reSize();
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
  let hashIdx = hashCode(key, this.SIZE);
  if (!this.storage[hashIdx]) return undefined;
  else return this.storage[hashIdx][key];
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
  //Get hash location
  let hashIdx = hashCode(key, this.SIZE);
  // if no value - return undefined

  if (!this.storage[hashIdx]) return undefined;
  else {
    let value = this.storage[hashIdx][key];
    delete this.storage[hashIdx][key];

    // Get current size of Hash
    let curSize = this.checkSize();
    // Since we just deleted an element, we much check to see if we are under 25%
    // capacity AND at at least a size 16
    if (curSize < this.SIZE * 0.25 && this.SIZE > 16) {
      this.SIZE = this.SIZE * 0.5;
      this.reSize();
    }

    return value;
  }
};

// Get Size Function - will return the total number of elements stored in the hash
HashTable.prototype.checkSize = function () {
  let curCount = 0;
  //Iterate through each "Bucket" of the hash
  this.storage.forEach((bucket) => {
    //If there are elemetns in the hash bucket, use object.keys to get length
    if (Object.keys(bucket)) curCount += Object.keys(bucket).length;
  });
  return curCount;
};

HashTable.prototype.reSize = function () {
  // Temp storage to store all key value pairs of Hash
  let tempStorage = [];
  // Iterate over bucket and push to tempStorage all data
  this.storage.forEach((bucket) => {
    for (let key in bucket) {
      tempStorage.push([key, bucket[key]]);
    }
  });
  //Reset storage to new empty array of NEW size
  this.storage = new Array(this.SIZE);

  //Iterate through the tempstorage to rehash all of the data into newly sized hash
  tempStorage.forEach((el) => {
    let [key, value] = el;
    let hashIdx = hashCode(key, this.SIZE);
    if (!this.storage[hashIdx]) this.storage[hashIdx] = {};

    this.storage[hashIdx][key] = value;
  });
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

//Testing
// let ht = new HashTable();
// ht.set("first key", "first value");
// ht.set("second key", "second value");
// ht.set("third key", "third value");
// ht.set("fourth key", "fourth value");
// ht.set("fifth key", "fifth value");
// ht.set("sixth key", "sixth value");
// ht.set("seventh key", "seventh value");
// ht.set("eigth key", "eight value");
// ht.set("ninth key", "ninth value");
// ht.set("tenth key", "tenth value");
// ht.set("eleventh key", "eleventh value");
// ht.set("12th key", "12th value");
// console.log(ht); // Should be size 16   12 items (75%)
// ht.set("13th key", "13th value");
// console.log(ht); // Should resize to 32  13 items Over 75% of prev size 16
// ht.remove("first key");
// ht.remove("second key");
// ht.remove("third key");
// ht.remove("fourth key");
// ht.remove("fifth key");
// console.log(ht); //   Size should still be 16 (25%)
// ht.remove("sixth key");
// console.log(ht); // Should resize to 16  7 items Under 75% of prev size 32
