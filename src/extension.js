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
  this.length = 0
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
  let hashKey = hashCode(key, this.SIZE);

  if (((this.length + 1) / this.SIZE) > 0.75) {
    let newStorage = new Array(this.SIZE * 2);

    this.storage.forEach((obj, idx) => {
      if (obj) {
        newStorage[idx] = obj;
      }
    })
    this.storage = newStorage;
  }

  if (!this.storage[hashKey]) {
    this.storage[hashKey] = {};
  }
  if (!this.storage[hashKey][key]) {
    this.storage[hashKey][key] = value;
    this.length++;
  }
  
  return value;
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
  let hashKey = hashCode(key, this.SIZE);

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
  let hashKey = hashCode(key, this.SIZE)
  let lessThanQuarterFilled = Math.floor(this.length - 1 / this.SIZE) < 0.25

  if ( this.SIZE > 16 && lessThanquarterFilled) {
    let newStorage = new Array(this.SIZE / 2);

    this.storage.forEach((obj, idx) => {
      if (obj) {
        newStorage[idx] = obj;
      }
    })

    this.storage = newStorage;
  }


  let temp = this.storage[hashKey][key];
  this.length--;
  return delete this.storage[hashKey][key] ? temp : undefined;
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


// let ht = new HashTable();
// ht.set('a', 5);
// ht.set('b', 5);
// ht.set('c', 5);
// ht.set('d', 5);
// ht.set('e', 5);
// ht.set('f', 5);
// ht.set('g', 5);
// ht.set('h', 5);
// ht.set('i', 5);
// ht.set('j', 5);
// ht.set('k', 5);
// ht.set('l', 5);
// ht.set('m', 5);
// ht.set('r', 5);
// ht.remove('apple')
// console.log(ht)
// console.log(ht.length)