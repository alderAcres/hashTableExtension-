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
  //create an index variable and set hashCode with key, size
  let index = hashCode(key, this.SIZE);
  let counterIndex = 0;
  //check if this.storage already has the index and it exists,
  if (this.storage[index]) {
    //if it does, then create and store the object in a variable to dig in to later to deal with collision
    const newObj = this.storage[index];
    //reference the object that we created to set its own key/value pair (so there can be multiple) - if there is already a key, then overwrite it with the new value
    newObj[key] = value;
    for (key in this) {
      counterIndex++;
    } 
    if (counterIndex > this.SIZE*.75) {
      this.SIZE*=2;
      HashTable.set(key,value);
    }
    //if it doesn't, then create a new obj at the hashCode index with its own, new key/value pair
  } else {
    this.storage[index] = {[key] : value};
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
  //create an index variable that will store the hashCode 
  let index = hashCode(key,this.SIZE);
  //check if the storage contains a key value pair at key:index
  if (this.storage[index]) {
    //if yes, store in a constant
    const newObj = this.storage[index];
    //retrieve the constant at the desired key and return
    return newObj[key];
    //if it doesn't exist, then return undefined.
  } else {
    return undefined;
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
  //create a constant named index to run and store the hashCode
  let index = hashCode(key,this.SIZE);
  const newObj = this.storage[index];
  //check if the storage contains at index
  if (newObj[key]) {
    //if yes, store in constant so we can access it's key/value pair
    //delete the key/value pair inside of the obj
    delete newObj[key];
    //if the key doesn't exist, then return undefined.
  } else {
    return undefined;
  }
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
