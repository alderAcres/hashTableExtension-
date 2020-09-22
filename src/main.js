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
  this.items = 0;
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
  //Key must a string
  if (typeof key !== 'string') return 'Please input a valid key';
  //Convert key into hashcode
  let ind = hashCode(key, this.SIZE);
  //Check if bucket exists
  if (this.storage[ind] === undefined) {
    this.storage[ind] = [{key, value}];
    this.items++;
  } else {
  //If collision, check if key is in bucket
    let keyUpdate = false;
    for (let i = 0; i < this.storage[ind].length; i++) {
      //If key is in bucket, update value
      if (this.storage[ind][i]['key'] === key) {
        this.storage[ind][i]['value'] = value;
        keyUpdate = true;
      }
    } 
  //If key was not updated, then we have to add the new key to bucket to avoid collision
    if (!keyUpdate) {
      this.storage[ind][this.storage[ind].length] = {key, value};
      this.items++;
    }
  }
  return this.items;
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
  //Key must be a string
  if (typeof key === 'string') {
    //Convert key into hashcode
    let ind = hashCode(key, this.SIZE);
    //If bucket does not exist, return key not found.
    if (!this.storage[ind]) return 'Key not found';
    //If bucket exists, iterate to check if key is in bucket
    for (let i = 0; i < this.storage[ind].length; i++) {
      //If found, retrieve value of specified key
      if (this.storage[ind][i]['key'] === key) return this.storage[ind][i]['value']
    }
  }
  //If key not found in bucket, return key not found.
  return 'Key not found';
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
  //Key must be a string
  if (typeof key === 'string') {
    //Convert key into hashcode
    let ind = hashCode(key, this.SIZE);
    //If bucket does not exist
    if (!this.storage[ind]) return undefined;
    //If bucket exists, iterate to check if key is in bucket
    for (let i = 0; i < this.storage[ind].length; i++) {
    //If key is found, check if bucket length. Delete entire bucket if it only contains one key, otherwise delete specified key
      if (this.storage[ind][i]['key'] === key) {
        let removed = this.storage[ind][i]['value'];
        if (this.storage[ind].length === 1) delete this.storage[ind];
        else delete this.storage[ind][i];
        return removed;
      }
    }
  }
  //If key not found in bucket
  return undefined;
}

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
