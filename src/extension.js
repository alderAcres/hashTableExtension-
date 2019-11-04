/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW
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

  this.numOfItems = 0;
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
  let index = hashCode(key, this.SIZE);
  
  if (this.storage[index]) {
    this.storage[index][key] = value;
  }
  else {
    this.storage[index] = {};
    this.storage[index][key] = value;
  }
  this.numOfItems += 1;

  // If adding the new item pushed the number of stored items to over 75% of the hash table's SIZE,
  // This assumes we're checking for indexes of this.storage, not total count of items
  // if total count of items, replace 'Object.keys(this.storage).length' with this.numOfItems 
  if (Object.keys(this.storage).length > ((this.SIZE/4) * 3)) {
    //then double the hash table's SIZE and rehash everything
    this.SIZE *= 2;

    //cycle through all objects in storage
    for (let i = 0; i < Object.keys(this.storage).length; i++) {
      //check if an object with more than 1 item exists at that index in storage
      if (this.storage[i] && Object.keys(this.storage[i]).length > 0) {
        //cycle through and rehash all the items in that column of storage
        for (let objKey in obj) {
          //Would using this.remove(objKey) inside this.set cause an error? => this.set(objKey, this.remove(objKey));
          let newVal = obj[objKey];
          this.set(objKey, newVal);
          delete this.storage[i][objKey];
        }
      }
    }
  }

  return this.numOfItems;
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
  let index = hashCode(key, this.SIZE);

  if (this.storage[index]) {
    return this.storage[index][key];
  }
  return 'No value exists';

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
  let index = hashCode(key, this.SIZE);

  // check if this.SIZE > 16 and removing the key will drop numOfItems (or number of indexes being used?)
  // create new storage of size/2
  // cycle through all values of this.storage, pushing them into new storage
  // cut size in half for reals
  // replace this.storage with new storage 

  if (this.storage[index] && this.storage[index][key]){
    let value = this.storage[index][key];
    delete this.storage[index][key];
    this.numOfItems -= 1;
    return value;
  }
  else {return undefined};
};

// YOUR CODE ABOVE

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
