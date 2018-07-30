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
  const index = new hashCode(key, this.storage.length);
  //if bucket is empty, store
  if(!this.storage[index]){
    this.storage[index] = [key, value];
  }
  //if not empty,
  else {
    //iterate key/value pairs in the bucket, check if same key exists; if exists, overwrite with new value
    this.storage[index].forEach(el => {
      if(el[0] === key){
        el[1] = value;
      }
    })
    //if not same key, create new key/value pair
    this.storage[index].push([key, value])
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
  const index = new hashCode(key, this.storage.length);
  let result;
  //if bucket is empty
  if(!this.storage[index]){
    return undefined;
  }
  //if not empty, iterate bucket then return value
  else {
    this.storage[index].forEach(el => {
      if(el[0] === key){
        result = el[1];
      }
    })
    //if the key doesn't exist in the bucket (case of collision)
    return result;
  }

  // const index = new hashCode(key, this.storage.length);
  // //if bucket is empty
  // if(!this.storage[index]){
  //   return undefined;
  // }
  // //if not empty, iterate bucket then return value
  // else {
  //   this.storage[index].forEach(el => {
  //     if(el[0] === key){
  //       return = el[1];
  //     }
  //   })
  //   //if the key doesn't exist in the bucket (case of collision)
  //   return undefined;
  // }
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
  const index = new hashCode(key, this.storage.length);

  let result;
  //if bucket is empty
  if(!this.storage[index]){
    return result;
  }
  //if not empty, iterate bucket then return value
  else {
    this.storage[index].forEach(el => {
      if(el[0] === key){
        result = el[1];
      }
    })
    //if the key doesn't exist in the bucket (case of collision)
    return result;
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
