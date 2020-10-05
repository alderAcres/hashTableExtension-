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


const { delete, del, delete } = require("request");

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.USED = 0;
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
  //if new object increment storage by 1 to show 1 more element of hash table is being used
  //otherwise push key value pair into existing object
  if(this.storage[tableEl] === undefined){
    this.storage[tableEl] = {};
    this.storage[tableEl][key] = value;
    this.USED += 1;
  }else{
    this.storage[tableEl][key] = value;
  }

  //if 75% is used, resize table
  if(this.USED/this.SIZE >= .75){
    //create new table with double the size
    let newArr = new Array(this.SIZE*2);
    //reset used to 0 so we can increment it as we place in new elements;
    this.USED = 0;
    //loop through all current storage
    for(let i = 0; i < this.storage.length; i++){
      //if storage exists at this element
      if(this.storage[i] !== undefined){
        //rehash all key value pairs to the new size
        let keysArr = Object.keys(this.storage[i])
        let valArr = Object.values(this.storage[i])
        for(let j = 0; j < keysArr; j++){
          let tableEl = hashCode(keysArr[j] ,this.size*2)
          //if object doesnt exist at this element then create new object and increment used by 1
          if(newArr[tableEl] === undefined){
            newArr[tableEl] = {};
            newArr[tableEl][keysArr[j]] = valArr[j];
            this.USED += 1;
          }else{
            //otherwise insert key value pair into existing object;
            newArr[tableEl][keysArr[j]] = valArr[j];
          }
        }
      }
    
    }
    //set storage to newArr created and change size to be double;
    this.storage = newArr;
    this.SIZE *= 2;
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
    if(Object.keys(this.storage[tableEl]).length === 0){
      delete this.storage[tableEl];
      this.USED -= 1;
    }
    return retVal;
  }else{
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
