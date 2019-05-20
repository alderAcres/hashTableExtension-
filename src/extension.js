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
HashTable.prototype.set = function(key, value) {
  !this.storage[hashCode(key, this.SIZE)] ? this.storage[hashCode(key, this.SIZE)] = {} : null;
  this.storage[hashCode(key, this.SIZE)][key] = value;
  if(this.getNumEmpty() < this.SIZE * .25){ //if we'd push it over the edge, change size and rehash everything.
    this.SIZE = this.SIZE * 2; // double the actual size
    this.rehash();
  }
};

HashTable.prototype.getNumEmpty = function() {
  let numEmpty = 0;
  for (let i = 0; i < this.SIZE; i += 1) {
    if(!this.storage[i] || Object.keys(this.storage[i]).length === 0) {
      numEmpty ++;
    }
  }
  return numEmpty;
}

HashTable.prototype.rehash = function() {
  let curKey;
  let curVal;
  let curBucketKeys;
  let newStorage = new Array(this.SIZE);
  for (let i = 0; i < this.storage.length; i += 1) {
    if (this.storage[i]) { // if there's something stored at this index
    curBucketKeys = Object.keys(this.storage[i]);
      for(let j = 0; j < curBucketKeys.length; j += 1) { // loop through all keys in this bucket
        curKey = curBucketKeys[j];
        curVal = this.storage[i][curBucketKeys[j]];
        !newStorage[hashCode(curKey, this.SIZE)] ? newStorage[hashCode(curKey, this.SIZE)] = {} : null;
        newStorage[hashCode(curKey, this.SIZE)][curKey] = curVal;
      }
    }
  }
  this.storage = newStorage;
} 

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
  return this.storage[hashCode(key,this.SIZE)] ? this.storage[hashCode(key,this.SIZE)][key] : undefined;
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
  const objWithDelVal = this.storage[hashCode(key,this.SIZE)];
  if(objWithDelVal){
    const delVal = objWithDelVal[key];
    if(delVal) {
      delete objWithDelVal[key];
    }
    if(this.getNumEmpty() > Math.floor(0.75 * this.storage.length)){
      this.SIZE = this.SIZE / 2;
      this.rehash();
    }
    return delVal;
  }
  return undefined
};
const h = new HashTable();
h.set('a',1);
// h.set('A',2);
h.set('b',2);
h.set('c',3);
h.set('d',4);
console.log(h.storage); 
h.remove('d')
console.log(h.storage); 
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
