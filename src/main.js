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
  console.log(this.storage)
  console.log(this.storage[0])  
}

// console.log(HashTable())
// let testHashTable = HashTable();
// console.log(testHashTable.prototype.set('cho','rock'))

//Its a technique to convert a range of key values into a range of indexes of an array. 
//Its used to implement an associative array, a structure that can map keys to values.
//A Hash Table uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.

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

//input: key, value
//output: no return, just setting the key value pair in storage arr and inner obj

HashTable.prototype.set = function(key, value) {
    // call hashCode fn to retrive code from input key -> this is the index of Hash Table array
    // if value is blank/undefined in the storage arr, create an empty object
      // check if key is already exist in obj, if does, overwrite value, 
      // else, create KVP  
    let arrIndex = hashCode(key);  
    if (this.storage[arrIndex] === undefined) this.storage[arrIndex] = {};
    else {
      if (!this.storage[arrIndex][key]) this.storage[arrIndex][key] = value;
      else {
        while (this.storage[arrIndex][key] !== undefined)
        {index++;}
        this.storage[arrIndex][key] = value;
      }
    }
};

//console.log(HashTable.set('cho','rock')); // Question: how can I make this console.log working?

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

//input: key
//output: value
HashTable.prototype.get = function(key) {
  // find hascode from input key
  // iterate through key of the storage arr index(found by hashcode where key lives)
  // if key found,
    // return value of input key
  let arrIndex = hashCode(key);
  let innerObj = this.storage[arrIndex];
  for (let innerObjKey in innerObj) {
    if (innerObjKey) {
      return innerObj[innerObjKey];
    }
  }
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
  // find hascode from input key
  // iterate through key of the storage arr index(found by hashcode where key lives)
  // if key found,
    //delete
  // if the key does not exist in the hash table, return undefined
  let arrIndex = hashCode(key);
  let innerObj = this.storage[arrIndex];
  for (let innerObjKey in innerObj) {
    if (innerObjKey) {
      let deletedValue = innerObj[innerObjKey];
      delete innerObjKey;
      return deletedValue;
    } else {
      return false;
    }
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

//console.log(hashCode('cho', 16))

// Do not remove!!
module.exports = HashTable;
