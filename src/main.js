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
  let addressIndex = hashCode(key, this.SIZE);
  const newBucket = {};
  if (this.storage[addressIndex]) {
    this.storage[addressIndex][key] = value;
  } else {
    newBucket[key] = value;
    this.storage[addressIndex] = newBucket;
  }
  let numberOfItems = 0;
  for (let i = 0; i < this.storage.length; i+=1) {
    // Directions for "number" of items unclear - are items every key/value pair? or elements of the storage array?
    // 1. Below is the method if "items" are every key/value pair
    if (this.storage[i]) {
      numberOfItems += 1;
    }
    //2. Below is the method if "items" are elements of the storage array
    // if (this.storage[i]) {
    //   Object.keys(this.storage[i]).forEach(() => numberOfItems += 1);
    // }
  }
  return numberOfItems;
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
  let addressIndex = hashCode(key, this.SIZE);
  if (this.storage[addressIndex]) {
    return this.storage[addressIndex][key];
  } else {
    return 'Does Not Exist';
    // or False *** Didn't put return false in case value that is stored could be false *** See below example
  }
};

const newTable = new HashTable();
newTable.set('dan', true);
newTable.set('dkx', false);
console.log(newTable.storage);
console.log(newTable.get('dkd'));

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let addressIndex = hashCode(key, this.SIZE);
  let deleted;
  if (this.storage[addressIndex]) {
    deleted = this.storage[addressIndex][key];
    delete this.storage[addressIndex][key];
    return deleted;
  } else {
    return undefined;
  }
};


// Do not modify
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
