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

//input: key, value 
//init a var called index and assign it to invocation of hashCode
//Check if the index does not exist 
  //if it doesn't exist, place an empty object at that index 
//If index does exist 
  //push key valu epair into object 
//check if key exists at that index 
  //if it does exist, 
    //replace value with new value 
//return number of items in storage 
//ouput: number 

HashTable.prototype.set = function(key, value) {
  let index = hashCode(key, this.SIZE);
  if(!this.storage[index]){
    this.storage[index] = {};
  }
  else {
    this.storage[index][key] = value;
  }
  return this.SIZE;
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

//input: key
//check if key exists in storage 
  //if yes, return the value 
//ouput: value 

HashTable.prototype.get = function(key) {
  let index = hashCode(key, this.SIZE);
  if(this.storage[index][key]) {
    return this.storage[index][key];
  }
  else return false;
};




/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/

//input: key
//check if key exists in storage
  //if it does, 
    //init var to store the key/val pair 
    //delete the key/val pair 
    //return the var that stored the pair
//else if key does not exist 
  // return undefined
//output: value or undefined

HashTable.prototype.remove = function(key) {
  if(this.storage[index][key]){
    let removed = this.storage[index][key];
    delete this.storage[index][key];
    return removed;
  }
  else return undefined; 
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
