/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;
  // keeps track of current size
  this.currentSIZE = 0;
  this.storage = new Array(this.SIZE);
}

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

// method to resize the hash
HashTable.prototype.resize = function (newSIZE) {
  // size will be reassigned to new size
  this.SIZE = newSIZE;
  // have a reference to old storage
  const oldStorage = this.storage;
  // new storage will be new array of new this.size
  this.storage = new Array(this.SIZE);
  // need to iterate over old storage
  oldStorage.forEach((el) => {
    // iterate again over the stored objects
    for (let key in el) {
      // get new hashKey for each key
      let newHashKey = hashCode(key, this.SIZE);
      if (!this.storage[newHashKey]) {
        // if new storage does not have exisiting item at the new hashKey, create a temp object and place the keyvalue pair
        this.storage[newHashKey] = {};
      }
      // if new hash key already exists then put the key value pair in the obj
      this.storage[newHashKey][key] = el[key];
      // increment current size
      this.currentSIZE++;
    }
  });

  // if new storage does not have exisiting item at the new hashKey, create a temp object and place the keyvalue pair
  // increment current size

  // if new hash key already exists then put the key value pair in the obj
  // increment current size
};

// PASTE AND MODIFY YOUR CODE BELOW
HashTable.prototype.set = function (key, value) {
  // creates a hashKey with given key and size
  const hashKey = hashCode(key, this.SIZE);

  // console.log(hashKey);
  // need to check if a key value pair is already at the generated hashKey (collision)
  // if not, create a new object to store
  if (!this.storage[hashKey]) {
    this.storage[hashKey] = {};
  }
  //  put the key value pair in the object
  this.storage[hashKey][key] = value;

  // increment current size
  this.currentSIZE += 1;
  // need to have a check if currentsize is more than or equal to 75% of size
  if (this.currentSIZE >= this.SIZE * 0.75) {
    // double the size, then call resize function
    const doubleSIZE = this.SIZE * 2;
    this.resize(doubleSIZE);
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
  // generate the hashKey
  const hashKey = hashCode(key, this.SIZE);
  // console.log(hashKey);
  // look inside the object in storage with the hashkey, then retrieve the value with given key
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
HashTable.prototype.remove = function (key) {
  // generate hashKey
  const hashKey = hashCode(key, this.SIZE);

  // need to go inside the storage with hashKey
  // determine if the object has only one key-value pair
  // if so, delete the whole object, then fill back up with undefined
  if (Object.keys(this.storage[hashKey]).length === 1) {
    // store the deleted object
    const removedObj = this.storage[hashKey];
    this.storage.splice(hashKey, 1, undefined);
    // decrement current size;
    this.currentSIZE -= 1;
    // call resize on half size
    if (this.SIZE >= 16 && this.currentSIZE <= Math.floor(this.SIZE * 0.25)) {
      const halfSIZE = this.SIZE / 2;
      this.resize(halfSIZE);
    }
    // return removed item
    return removedObj[0][key];
    // if object hold multiple key value pair, need to only delete the specified key value pair
  } else {
    // store the deleted value
    const removed = this.storage[hashKey][key];
    // delete the key value pair
    delete this.storage[hashKey][key];
    this.currentSIZE -= 1;
    // call resize on half size
    if (this.SIZE >= 16 && this.currentSIZE <= Math.floor(this.SIZE * 0.25)) {
      const halfSIZE = this.SIZE / 2;
      this.resize(halfSIZE);
    // return deleted value
    return removed;
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
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
