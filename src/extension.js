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
  this.SIZE = 4;

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
  const hash = hashCode(key, this.SIZE);

  if (this.storage[hash] === undefined) {
    this.storage[hash] = {};
  }
  this.storage[hash][key] = value;


  const ln = this.storage.filter(x => x !== undefined).length;
  if (ln > this.SIZE * 0.75){
    const masterObj = {};
    this.storage.forEach(x => {
      if (x !== undefined){
        Object.assign(masterObj, x)
      }
    })
    this.SIZE = this.SIZE * 2;
    this.storage = new Array(this.SIZE);
    const arr = Object.entries(masterObj);

    for (let i = 0; i < arr.length; i++){
      this.set(arr[i][0], arr[i][1])
    }

    return this.storage.filter(x => x !== undefined).length;
  }
  return ln;
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
  const lookup = hashCode(key, this.SIZE);
  if (this.storage[lookup][key] === undefined) {
    return undefined;
  }
  return this.storage[lookup][key];
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
  const lookup = hashCode(key, this.SIZE);
  if (this.storage[lookup] === undefined) return undefined
  if (this.storage[lookup][key] === undefined) return undefined;

    const returnValue = this.storage[lookup][key];
    delete this.storage[lookup][key];
    if (Object.entries(this.storage[lookup])[0] === undefined){
      this.storage[lookup] = undefined;
    }

    const ln = this.storage.filter(x => x !== undefined).length;
  if (ln < this.SIZE * 0.25){
    const masterObj = {};
    this.storage.forEach(x => {
      if (x !== undefined){
        Object.assign(masterObj, x)
      }
    })
    this.SIZE = this.SIZE / 2;
    this.storage = new Array(this.SIZE);
    const arr = Object.entries(masterObj);

    for (let i = 0; i < arr.length; i++){
      this.set(arr[i][0], arr[i][1])
    }
  }

    return returnValue;
};


// Do not modify
function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

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


const hashTable = new HashTable();