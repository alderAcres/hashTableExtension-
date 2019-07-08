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

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.items = 0;
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
HashTable.prototype.resize = function(newSize) {
  this.SIZE = newSize
  const contents = Object.values(this.storage);
  delete this.contents;
  this.contents - new Array(this.SIZE);
  for(let bucketContents of contents){
    if(bucketContents){
      for(let item in bucketContents){
        this.set(Object.keys(item)[0],Object.values(item)[0]);
      }
    }
  }
};


HashTable.prototype.set = function(key, value) {
  // resize if over 75%
  if(this.get(key) === undefined){
    this.items += 1;
    if(Math.floor(this.items / this.SIZE) * 100 > 75){
      this.resize(this.SIZE * 2);
    }
  }

  const bucket = hashCode(key, this.SIZE);
  // if bucket never used then create an object to hold objects
  if(this.storage[bucket] === undefined) this.storage[bucket] = {};
  this.storage[bucket][key] = value;
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
  const bucket = hashCode(key, this.SIZE);
  if(this.storage[bucket] !== undefined){
    return this.storage[bucket][key];
  }
  else return undefined;
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
  // decrement items and resize if required
  if(this.get(key) !== undefined){
    this.items -= 1;
    if((Math.floor(this.items / this.SIZE) * 100) < 25){
      this.resize(Math.floor(this.SIZE / 2));
    }
  }

  const bucket = hashCode(key, this.SIZE);
  if(this.get(key) !== undefined){
    const valueOfKeyToRemove = this.storage[bucket][key];
    delete this.storage[bucket][key];
    return valueOfKeyToRemove;
  } 
  return undefined;
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

const ht = new HashTable();

// Do not remove!!
module.exports = HashTable;
