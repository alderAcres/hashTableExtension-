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
  //take in the key and convert it into a hash value 
  let hashValue = hashCode(key); 
  //check if storage[hashValue] is undefined
  //if so, then create an array and THEN push array of [key, value]
  if(!this.storage[hashValue]){
    this.storage[hashValue] = []; 
    this.storage[hashValue].push([key, value]); 
  } else {
    //if not, then just push an array of [key, value]
    this.storage[hashValue].push([key, value]); 
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
  //instantiate hash value with the key 
  let hashValue = hashCode(key); 
  //initialize a options variable and set it equal to the array at that index 
  let options = this.storage[hashValue]; 
  //Iterate through the options array and check for a matching key 
  for(let i = 0; i < options.length; i++){
    //once found, then just return the value associated with that key 
    if(options[0] === key){
      return options[1]; 
    }
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
  //instantiate hash value with key 
  let hashValue = hashCode(key); 
  //initialize options variable and set it equal to the array at that index 
  let options = this.storage[hashValue]; 
  //iterate through options array to find the key value pair that matches 
  for(let i = 0; i < options.length; i++){
    //once found, then delete the VALUE and return nothing
    if(options[0] === key){
      delete options[1]; 
      return; 
    }    
  }
    
  //if nothing is found, then just return undefined
  return undefined; 
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
