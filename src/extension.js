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
HashTable.prototype.set = function(key, value) {
  let location = hashCode(key, this.SIZE);
  const arrSize = (this.storage.length + 1) / 4;


  if (this.storage[location] === undefined && arrSize >= .75) {
    const tempArr = this.storage;
    this.SIZE = (this.SIZE * 2)
    tempArr.forEach((obj, i, arr) => {
      if (obj !== undefined) {
        const objKeyArr = Object.keys(obj);
        objKeyArr.forEach((keyOld) => {
          let location = hashCode(keyOld, this.SIZE);
          if (this.storage[location] === undefined) {
            this.storage[location] = {};
            this.storage[location][keyOld] = obj[keyOld];
          }
          if (this.storage[location] !== undefined) this.storage[location][keyOld] = obj[keyOld];
        })
      }
    })
  }

  if (this.storage[location] === undefined) {
    this.storage[location] = {};
    this.storage[location][key] = value;
  }
  if (this.storage[location] !== undefined) this.storage[location][key] = value;
};

const hashTable = new HashTable();
hashTable.set('hello', 9);
hashTable.set('pie', 6);

hashTable.set('hi', 7);
console.log(hashTable.storage)
hashTable.set('lacking', 34)

// console.log(hashTable.get('world'))
// hashTable.remove('world');
// console.log(hashTable.storage)
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
  const location = hashCode(key, this.SIZE);

  return this.storage[location][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/
HashTable.prototype.remove = function(key) {
  const location = hashCode(key, this.SIZE);
  const objLength = Object.keys(this.storage[location]);
  const arrSizePercent = Number((((this.storage.reduce((sum, existObj) => {
    if (existObj) sum = sum + 1;
    return sum;
  }, 0)) - 1) / this.SIZE).toFixed(2));
  const ifRemoved = Object.keys(this.storage[location]).length;

  if (this.SIZE > 16 && ifRemoved === 1 && arrSizePercent < 0.25) {
    if (objLength) delete this.storage[location][key];
    if (objLength === 0) return undefined;

    const objKeyArr = Object.keys(obj);
    this.SIZE = this.SIZE / 2;
    objKeyArr.forEach((keyOld) => {
      let location = hashCode(keyOld, this.SIZE);
      if (this.storage[location] === undefined) {
        this.storage[location] = {};
        this.storage[location][keyOld] = obj[keyOld];
      }
      if (this.storage[location] !== undefined) this.storage[location][keyOld] = obj[keyOld];
    })
  } else {
    if (objLength) delete this.storage[location][key];
    if (objLength === 0) return undefined;
  }
};


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
