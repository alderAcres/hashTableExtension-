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
//create index by running it through hashcode
let index = hashCode(key, this.SIZE);

//check if object at index is undefined
  if(this.storage[index] === undefined){
    let storeObj = {};
    this.storage[index] = storeObj;
    storeObj[key] = value;
  } else {
  //if object is undefined
    //set key value pair
    if(this.storage[index][key]){
      this.storage[index][key] = value;
    }
      else {
        this.storage[index][key] = value;
      };
  //else if not undefined
    //check if key already exists in object,
      //if it does replace value,

  }

      //if it doesnt add new key/value pair

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
let index = hashCode(key, this.SIZE)
 //create index by running through key through hash code

 //check if item at index is undefined
 //if no item return undefined
  if(!this.storage[index]){
     return undefined;
  } else {
     if(this.storage[index][key]){
        return this.storage[index][key];
     } else {
       return undefined;
     }

  }

 //if not undefined 
   //check if key exists
    //if key exists then return its value

    //if key doesnt exist return undefined
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
  //get index by running key and this.Size through hashCode
  let index = hashCode(key, this.SIZE);

  //check to see if key exists, if it does, add a variable to whats to be deleted, delete item
  //then return variable
   if(this.storage[index][key]){
     let removed = this.storage[index][key];
     delete this.storage[index][key];
     return removed;
   } else {
     return undefined;
   }

  //if key doesnt exist return undefined
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
