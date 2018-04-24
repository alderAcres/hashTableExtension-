/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable(obj) {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
  this.myCount = 0;
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
  var index = this.hashCode(key, this.SIZE);
  var bucket = this.storage[index];

  if (!bucket){
    var bucket = [];
    this.storage[index] = bucket;
  }

  var override = false;

  for (var i = 0; i < bucket.length; i++){
    var sequence = bucket[i];
    if (sequence[0] === key){
      sequence[1] = value;
      override = true;
    }
  }
  if (!override){
    bucket.push([key, value]);
    this.myCount++;
  if (this.myCount > this.SIZE * .75){
    this.resize(this.SIZE * 2);
  }
}
  return this;
};


// ran out of time! didn't get to put in collision logic yet :( - J

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
  var index = this.hashCode(key, this.SIZE);
  var bucket = this.storage[index];

  if (!bucket){
    return null;
  }
  for (var i = 0; i < bucket.length; i++){
    var sequence = bucket[i];
    if (sequence[0] === key){
      return sequence[1];
    }
  }
  return null;
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
  var index = this.hashCode(key, this.SIZE);
  var bucket = this.storage[index];
  if (!bucket){
    return null;
  }

  for (var i = 0; i < bucket.length; i++){
    var sequence = bucket[i];

    if (sequence[0] === key){
      bucket.splice(i, 1);
      this.myCount--;
      if (this.myCount < this.SIZE * .25){
        this.resize(this.SIZE/2);
      }
      return sequence[1];
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

// Do not remove!!
module.exports = HashTable;
