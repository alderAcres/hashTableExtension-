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
  // determine which hash bucket to navigate to and store in hash const:
  const hash = hashCode(key, this.SIZE);
  // check if anything exists within hash bucket => if not, initialize obj w/ key:value pair:
  if (!this.storage[hash]) {
    this.storage[hash] = {
      [key]: value,
    };
  // otherwise, add element as key:value pair within existing object (overwrite if key exists):
  } else {
    this.storage[hash][key] = value;
  }
  // returns the new number of items stored in hash table:
  return this.storage;
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
  // determine which hash bucket to navigate to and store in hash const:
  const hash = hashCode(key, this.SIZE);
  // check if hash bucket is empty or if no value is stored within bucket at the key
  // return out of function
  if (!this.storage[hash] || this.storage[hash][key] === undefined) return;
  // otherwise, return the value stored within the bucket at the key provided:
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
HashTable.prototype.remove = function(key) {
  // determine which bucket to navigate to and store in hash const:
  const hash = hashCode(key, this.SIZE);
  // check if hash bucket if empty or if no value is stored in key; return out of function
  if (!this.storage[hash] || this.storage[hash][key] === undefined) return undefined;
  // otherwise, store the target value to be deleted in const
  // delete the value from hash table, then return deleted value:
  const deletedValue = this.storage[hash][key];
  delete this.storage[hash][key];
  return deletedValue;
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

// tests for functionality:
// const test = new HashTable();
// test.set('first', 'a');
// test.set('second', 'b');
// test.set('third', 'c');
// test.set('fourth', 'd');
// console.log(test);
// console.log(test.get('first'));
// console.log(test.remove('second'));
// console.log(test);
// console.log(test.set('second', 'g'));
// console.log(test.remove('fifth'));
// console.log(test.set('first', 'k'));
