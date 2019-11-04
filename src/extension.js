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
  this.numberOfStoredItems = 0
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

 1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything
*/
HashTable.prototype.set = function(key, value) {
  
  let index = hashCode(key, this.SIZE);
  this.numberOfStoredItems++;

  if(this.numberOfStoredItems/this.SIZE >= .75){
    this.SIZE = 2*this.SIZE;
    //must go through whole hash table and call the set function on all key/value pairs;
    for(let i = 0;i <= this.SIZE; i++){
      let indexObject = this.storage[i];
      for(let key in indexObject){//loops through object that acts as storage;
        let entryValue = indexObject[key];
        let newHashIndex = hashCode(key, this.SIZE);
        if(this.storage[newHashIndex]){
          this.storage[newHashIndex][key] = value;//reassing
          delete entryValue //then delete the old entry to avoid duplicates
        }else{
          this.storage[newHashIndex] = {};
          this.storage[newHashIndex][key] = value;
          delete entryValue;
        }

        

    }


  }
}
  else if(this.storage[index]){
    this.storage[index][key] = value;
    
  }
  else{
    this.storage[index] = {};
    this.storage[index][key] = value;
    
   
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
  let index = hashCode(key, this.SIZE);
  // console.log("index");
  // console.log(index)
  if(this.storage[index][key])return this.storage[index][key];
  return "Value not found"
  //if this.storage[key] doesn't exist

};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table

 2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/
HashTable.prototype.remove = function(key) {
  let index = hashCode(key, this.SIZE);
  if(this.storage[index][key])this.numberOfStoredItems--;

  if(this.SIZE > 16 && this.numberOfStoredItems/this.SIZE <.25){
    let prevSize = this.SIZE;
    this.SIZE = this.SIZE/2;//halves the storage size
    //////////////////
    for(let i = 0;i <= prevSize; i++){
      if(this.storage[i]){
        let indexObject = this.storage[i];
      for(let key in indexObject){//loops through object that acts as storage;
        let entryValue = indexObject[key];
        let newHashIndex = hashCode(key, this.SIZE);
        if(this.storage[newHashIndex]){
          this.storage[newHashIndex][key] = value;//reassigning
          delete entryValue //then delete the old entry to avoid duplicates
        }else{
          this.storage[newHashIndex] = {};
          this.storage[newHashIndex][key] = value;
          delete entryValue;
        }
      }

        

    }


  }
    ////////////////////
  
  else if(this.storage[index]){//checks if there is a key/value pair stored in the hash table
    delete this.storage[index];
    
    
  }return undefined

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
