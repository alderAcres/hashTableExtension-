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

  //Added an object to every array element. [Using objects as the bucket for HT]
  for(let i = 0; i < this.SIZE; i++) {
    this.storage[i] = {};
  }

  //Total Number of Key/Value pairs (or items) in a bucket. 
  //Used in set function.
  this.totalItems = 0;
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
  let idx = hashCode(key, this.SIZE);
  this.storage[idx][key] = value;
  //Increment total k/v pairs (items) every time its within the idx.
  return ++this.totalItems;
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
  let idx = hashCode(key, this.SIZE);
  let bucket = this.storage[idx];

  //checks if that index has the key, returns true if key is found.
  let checkKey = this.storage[idx].hasOwnProperty(key);
  if(checkKey) {
    return bucket[key];
  } else {
    throw new Error("The Hash Table does not contain this key");
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
  let idx = hashCode(key, this.SIZE);
  let bucket = this.storage[idx];
  //checks if that index has the key
  let checkKey = this.storage[idx].hasOwnProperty(key);
  if(checkKey) {
    delete bucket[key];
  } else {
    throw new Error("The Hash Table does not contain this key");
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

//~~~Uncomment to the code run.~~~
// let ht = new HashTable();
// ht.set("dan", true); ht.set("dxd", 4); ht.set("may", 3);
// console.log(ht);
// ht.get("dan"); ht.get("may");
// console.log(ht);
// ht.remove("dan");
// console.log(ht);


// Do not remove!!
module.exports = HashTable;
