const { delete } = require("request");

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
  //call hash function on key for size of this array
  let tableEl = hashCode(key, this.SIZE);
  //if this element in the storage array is undefined, define it and push key as key and value as value into new object stored in hash table
  //otherwise push key value pair into existing object
  if(this.storage[tableEl] === undefined){
    this.storage[tableEl] = {};
    this.storage[tableEl][key] = value;
  }else{
    this.storage[tableEl][key] = value;
  }
  return;

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
  //access table at element corresponding to key
  let tableEl = hashCode(key, this.SIZE);
  //as long as this table el is defined return the value corresponding to key in object
  if(this.storage[tableEl]!== undefined){
    return(this.storage[tableEl][key])
  }
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
  //check hashtable at element to see if key value pair exists
  let tableEl = hashCode(key, this.SIZE);
  if(this.storage[tableEl][key]!==undefined){
    //delete if exists
    let retVal = this.storage[tableEl][key];
    delete this.storage[tableEl][key];
    return retVal;
  }else{
    return undefined;
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

// let hash = new HashTable();
// hash.set("hello", "stuff");
// hash.set("hello2", "stuff1");
// console.log(hash.get("hello2"))
// hash.remove("hello2");
// console.log(hash);

// Do not remove!!
module.exports = HashTable;
