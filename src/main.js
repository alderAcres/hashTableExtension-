/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.quantity = 0;
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

  //every key:value pair is stored in the object
  const resultObj = {};
  //get index where key:value pair will be stored
  const indexInArr = hashCode(key, this.size);
  //get access to the array with stored key:value pairs
  const resultArr = [this.storage[indexInArr]];
  
  for (let i = 0; i < resultArr.length; i++) {
    //check every element for the key to handle overriding
    //!!extremely inefficient! needs to be done differently (linked list??)!
    let currentObj = resultArr[i];
    for (let innerKey in currentObj) {
      //if the key exists override it with different value
      if (innerKey === key) currentObj[innerKey] = value;
      //else add key:value pair to the resultArr
      else resultArr.push(resultObj[key] = value);
    }
  }

  //increment quantity by 1
  this.quantity++;
  //return new quantity
  return this.quantity;
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

  //get index where key:value pair is stored
  const indexInArr = hashCode(key, this.size);
  //get access to the array with stored key:value pairs
  const resultArr = [this.storage[indexInArr]];

  //loop through this array
  for (let i = 0; i < resultArr.length; i++) {
    const currObj = resultArr[i];
    for (let innerKey in currObj) {
      //check if key is the same as provided paramether
      //return value if it is
      if (innerKey === key) return currObj[innerKey];
    }
  }

  //return something else if there is no such key
  return `There is no ${key} in the Hash Table`
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
  //get index where key:value pair is stored
  const indexInArr = hashCode(key, this.size);
  //get access to the array with stored key:value pairs
  const resultArr = [this.storage[indexInArr]];

  //loop through this array
  for (let i = 0; i < resultArr.length; i++) {
    const currObj = resultArr[i];
    for (let innerKey in currObj) {
      //check if key is the same as provided paramether
      if (innerKey === key) {
        //remember deleted value
        const deletedValue = currObj[innerKey];
        //delete property
        delete currObj[innerKey];
        //decrement quantity
        this.quantity--;
        //return deleted value
        return deletedValue;
      }
    }
  }

  //return something else if there is no such key
  return `There is no ${key} in the Hash Table`
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
