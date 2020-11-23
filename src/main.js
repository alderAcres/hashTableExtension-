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
HashTable.prototype.set = function (key, value) {
  // get the value from the hash function 
  let index = hashCode(key, this.SIZE);
  // create a bucket variable to store place where the keyt/value pairs will be stored
  let bucket = this.storage[index];
  
  // check that a bucket exists, if it is not create the bucket and insert it into the hash table
  if (!bucket) {
    let bucket = [];
    this.storage[index] = bucket;
  }
  
  // If the provided key has already been used to store another value, simply overwrite
  //  the existing value with the new value.
  let isOverriden = false;
  for (let i = 0; i < bucket.length; i++) {
    let pairs = bucket[i];
    if (pairs[0] === key) {
      pairs[1] = value;
      isOverriden = true;
    }
  }
  
  // if there is collision
  if (!isOverriden) {
    bucket.push([key, value])
  }
  
  // woulld this work?
  return this
   
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
  // get the value from the hash function 
  let index = hashCode(key, this.SIZE);
  // create a bucket variable to store place where the value will be stored
  let bucket = this.storage[index];
 
  // if there is nothing stored at that index return undefined
  if (!bucket) return undefined;

  // if there is a bucket, go inside the bucket and and return the appropriate value
  for (let i = 0; i < bucket.length; i++) {
    let pairs = bucket[i];
    if (pairs[0] === key) {
      return pairs[1];
    }
  }
 
  // if you can't find the key you are looking return undefined
  return undefined;

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
  // get the value from the hash function 
  let index = hashCode(key, this.SIZE);
  // create a bucket variable to store place where the value will be stored
  let bucket = this.storage[index];
  
  // if there is nothing to remove return undefined
  if (!bucket) return undefined;

  //loop through the bucket
  for (let i = 0; i < bucket.length; i++) {
    let pairs = bucket[i];
    //check if key is inside the bucket
    if (pairs[0] === key) {
      //if it is remove that list
      bucket.splice(i, 1);

      return pairs[1];
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
