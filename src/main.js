/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
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
  this.length = 0; // counter for number of items added to the table
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
  this.length += 1;
  
  const hashKey = hashCode(key, this.SIZE);
  // using object to handle the collision. While linked list if preferable,
  // the time limit makes me go with a simpler solution
  // that doesnt require writing a linked list:)
  if (this.storage[hashKey] === undefined) {
    const obj = {};
    obj[key] = value;
    this.storage[hashKey] = obj;
  } else {
    // dont forget to decrement the length if we're overwriting
    if (this.storage[hashKey][key]) this.length -= 1;
    this.storage[hashKey][key] = value;
  }
  if (this.length >= this.SIZE * 0.75) {
    const copyOfStorage = this.storage;
    this.SIZE = this.SIZE * 2;
    this.length = 0;
    this.storage = new Array(this.SIZE);
    for (const bucket of copyOfStorage) {
      if (bucket) {
        for (const key in bucket) {
          this.set(key, value);
        }
      }
    }
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
HashTable.prototype.get = function(key) {
  const hashKey = hashCode(key, this.SIZE);
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
HashTable.prototype.remove = function(key) {
  const hashKey = hashCode(key, this.SIZE);
  const toBeRemoved = this.storage[hashKey][key];
  if (toBeRemoved) {
    this.length -= 1;
  }
  delete this.storage[hashKey][key];
  if (this.SIZE > 16 && this.length < this.SIZE / 4) {
    const copyOfStorage = this.storage;
    this.SIZE = this.SIZE / 2
    this.length = 0;
    this.storage = new Array(this.SIZE);
    for (const bucket of copyOfStorage) {
      if (bucket) {
        for (const key in bucket) {
          this.set(key, bucket[key]);
        }
      }
    }
  }
  return toBeRemoved;
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

// Do not remove!!
module.exports = HashTable;
