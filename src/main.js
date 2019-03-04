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
HashTable.prototype.set = function(key, value) {
  const index = hashCode(key, this.SIZE)
  const bucket = new Bucket (key, value)
  
  if(this.storage[index] === undefined){
    this.storage[index] = bucket;
    this.SIZE ++
  } else {
    this.storage[index].value = bucket.value;
  }

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
  const index = hashCode(key, this.SIZE)
  const currentBucket = this.storage[index]

  while(currentBucket.key !== key) currentBucket = currentBucket.next

  return currentBucket.value
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
  const index = hashCode(key, this.SIZE)
  //previousBucket functions as a pointer
  let previousBucket = this.storage[index]
  let removed

  if (this.storage[index] === undefined){
    return undefined
  }

  if(previousBucket.key === key){
    this.storage = undefined
    return previousBucket.value
  }

  while(previousBucket.next !== null){
    if(currentBucket.overflow.key === key){
      removed = previousBucket.overflow.value
      previousBucket.overflow = previousBucket.overflow.overflow
      return removed
    }
  }

  return undefined
};


const hi = new HashTable
hi.set(2, 14)
console.log(hi)

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

function Bucket(key, val) {
  this.key = key;
  this.value = val;
  this.next = null;
}

// Do not remove!!
module.exports = HashTable;
