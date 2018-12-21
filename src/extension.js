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
  //Everything mostly as before except: Check the hash table's current size using this.storage.length.
  //If the size is 12 or higher (meaning 75% has been filled), we will need to rehash everything. 
    //Create a NEW HASH TABLE table by calling the HashTable function and doubling the size. 
    //Loop over the current hash table (this.storage), grab each object. 
      //Then, grab all of that object's keys using Object.keys. 
      //Then, loop over that object's keys and pass each one into a the hashCode with the NEW DOUBLED SIZE.
      //Then do what you did before -- adding each key:value to a bin and storing that bin at the NEW HASHKEY in the NEW HASHTABLE.


//ORIGINAL SET CODE
  // //Create a unique hashkey by passing the given key into the hash function
  // let hashkey = hashCode(key, this.SIZE);
  // //Create a new bin
  // let bin = {};
  // //Add the key:value pair to that bin object. 
  // bin[key] = value;
  // //If it doesn't exist, add our bin to the storage object (hashtable) at the hashkey location.
  // if(!this.storage[hashkey]){
  //   this.storage[hashkey] = bin;
  // }
  // //If a bin already exists in that hashkey location, add the key:value pair to the existing bin.
  // else if(this.storage[hashkey]){
  //   this.storage[hashkey][key] = value;
  // }


   


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


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  //Create the hashkey by passing the given key into the hash function.
  let hashkey = hashCode(key, this.SIZE);
  //Use the hashkey to go to the specific spot in the hash table.
  //Identify the specific key:value pair by using key, then use delete to get rid of it.
  //If the key doesn't exist there, return undefined.
  if(this.storage[hashkey][key]){
    delete this.storage[hashkey][key];
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
