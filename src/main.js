/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.size = 16;
  this.storage = new Array(this.size);
  this.usedBuckets = 0;
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
  //find out which bucket our hashCode wants to store our key value pair
  const bucket = hashCode(key, this.size);
  //check if there is anything in the bucket
  if (!this.storage[bucket]) {
    //create an object at the bucket if the bucket is empty. We are using a bucket to avoid collision
    this.storage[bucket] = {};
    //store the key value pair at the bucket that the hashCode pointed to
    this.storage[bucket][key] = value;
    //increase our usedBuckets counter to keep track how full out HashTable is
    this.usedBuckets++
  } else {
    //if the bucket is being used, input key value pair into our object
    this.storage[bucket][key] = value;
  }
  //check if we have used 75% of our buckets and if so double it size by invoking our doubleHashTable method
  if (this.usedBuckets >= 0.75 * this.size) {
    //create a function that doubles my HashTable, doubleHashTable
  }
};

//our resizing Hashtable method that need to double our HashTable and make a deep clone of our this.storage
HashTable.prototype.doubleHashTable = function () {
  //double our size
  this.size *= 2;
  //reset our counter that keeps track how many buckets have been used
  this.usedBuckets = 0


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
HashTable.prototype.get = function (key) {
  //find which bucket our hashCode store our key in
  const bucket = hashCode(key, this.size);
  //check if key value pair exist
  if (this.storage[bucket[key]]) {
    //if key value pair is found return the value
    return this.storage[bucket][key];
  } else {
    //if nothing is at the key let the user know
    return "Nothing found at this key"
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
HashTable.prototype.remove = function (key) {
  //find which bucket our hashCode store our key in
  const bucket = hashCode(key, this.size);
  //check if key value pair exist
  if (!this.storage[bucket][key]) {
    //if nothing is found at kjey let user know
    return "Nothing to remove at this key"
  } else {
    //if value found at key declare a variable to store a copy of it
    const temp = this.storage[bucket][key];
    //delete the key value pair
    delete this.storage[bucket][key];
    //return the deleted key value pair
    return temp;
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
