/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.count = 0;
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
  
  // TODO: handle duplicate key with overwrite

  let bucketIndex = hashCode(key, this.SIZE);
  let bucket = this.storage[bucketIndex];

  if (!bucket) {
    bucket = [];
    this.storage[bucketIndex] = bucket;
  }

  let overWrite = false;
  // iterate through bucket looking for conflict to overWrite
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === key) {
      bucket[i][1] = value;
      overWrite = true;
    }
  }
  // if we don't overWrite, make a new tuple in the bucket.
  if (!overWrite) {
    bucket.push([key, value]);
    this._count++
  }
  return this.count;
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
  let bucketIndex = hashCode(key, this.SIZE);
  let bucket = this.storage[bucketIndex];
  if (bucket.length === 1) {/*there is only one tuple*/
    // return tuple
    return this.storage[bucketIndex][0][1];
  } else if (bucket.length > 1) {/*there are many tuples*/
    // loop through bucket to find tuple with our key
    for (var i = 0; i < bucket.length; i++) {
      if(bucket[i][0] === key){return bucket[i][1];}
    }
  }
  /*I don't feel so good...*/
  console.log("Argument Error: Key is either invalid, or does not exist in hash")
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
HashTable.prototype.remove = function(key) {
  let bucketIndex = hashCode(key, this.SIZE);
  let bucket = this.storage[bucketIndex];
  if (bucket) {
    for (var i = 0; i < bucket.length; i++) {
      if(bucket[i][0] === key){
        let removedBucket = bucket.splice(i, 1);
        return removedBucket[0][1];
      }
    }
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

// Do not remove!!
module.exports = HashTable;
