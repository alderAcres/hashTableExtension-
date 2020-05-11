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
  this.itemsStored = 0;
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
  // use hash function to get new index
  let newIndex = hashCode(key, this.SIZE);
  // if there is nothing at this 'index', put an object there
  if (!this.storage[newIndex]){
    this.storage[newIndex] = {};
  }
  // if this key already exists, return undefined
  if (this.storage[newIndex][key]){
    return undefined
  }
  // put the value into the object we created at the correct index of our storage array
  // this should handle collisions as well
  this.storage[newIndex][key] = value;
  // increment and return itemsstored
  this.itemsStored++;
  return this.itemsStored;
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
  // get the index to look at
  let index = hashCode(key, this.SIZE)
  // if the key exists in the object at this index, return the value
  if (this.storage[index]){
    if (this.storage[index][key]){
      return this.storage[index][key];
    }
  } else {
    // if this key does not exist, return false
    return false
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
  // easy/cheating way to both store value we want to later return, or see if that key does not exist in our hash table 
  let toReturn = this.get(key);
  // if that key doesnt exist, return false
  if (toReturn === false){
    return false;
  }
  let index = hashCode(key, this.SIZE);
  // now we know the key exists.
  // check to see if its the only thing in the object.
  if (Object.keys(this.storage[index]).length === 1){
    // if so, delete whole object
    delete this.storage[index]
  } else {
    // if not, delete key value pair
    delete this.storage[index][key];
  }
  // now decrement itemsStored and return that stored value 
  this.itemsStored--;
  return toReturn;
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
