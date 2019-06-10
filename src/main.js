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
  const curHashKey = hashCode(key, this.SIZE);
  console.log(curHashKey)

  //if this is the first time this hashkey has been added in/used. handling collisions with an object
  if (!this.storage[curHashKey]) {
    this.storage[curHashKey] = {};
    //something now exists at this particular hashIndex. occupised size of current hashTable goes up by 1
    this.totalItems += 1;
  } 

  //checking if this value exists before adding. if not, increase totalItems by 1. if so, the value will just be overwritten, so no need to increment totalItems
  // if(!this.storage[curHashKey][key]) this.totalItems += 1;
  
  this.storage[curHashKey][key] = value;

  //return total nums of items in hashtable
  console.log('new total items is ,', this.totalItems);
  return this.totalItems;

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

  const curHashKey = hashCode(key, this.SIZE);

  //checks if anythig is in the corresponding hashKey
  if(!this.storage[curHashKey]) return 'this key does not exist';
  //checks if key exists in hte collision-handling object
  else if (!this.storage[curHashKey][key]) return 'this key does not exist at this hash index';
  //confirms that a value for the key exists. returns that back;
  else if(this.storage[curHashKey].hasOwnProperty(key)) {
    return this.storage[curHashKey][key];
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
  const curHashKey = hashCode(key, this.SIZE);
  let removedKey;

  if(this.storage[curHashKey][key]) {
    removedKey = this.storage[curHashKey][key];
    delete this.storage[curHashKey][key];
    //this.totalItems -= 1;
  }

  const newSizeOfCollObj = Object.keys(this.storage[curHashKey]).length;

  if(newSizeOfCollObj === 0) {
    this.storage[curHashKey] = undefined;
    this.totalItems -=1;
  }

  console.log('new total items is ,', this.totalItems);

  return removedKey;

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
