/**
* HashTable costructor
*
* construct a new hash table
//key is converted into an integer index by hash function
//this index decides where key-value pair belongs
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
}

console.log(new Array(this.SIZE))//undefined

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
  //decl variable, assign to empty obj(do i need this?)
  // const bucket = {};
  const bucket = this.storage;
  //if no key, add each new key-value pair into HashTable's bucket
  if(key === undefined) bucket.key = value;
  //if key already has value, overwrite existing value with new value
  if(bucket.hasOwnProperty('key')) bucket.key = value;
  //if hashed address(index?) has key-value pair, avoid collision by separate chaining or linear probing(??)

  //push key-value pair into HashTable array
  for(const[key, value] of Object.entries(bucket)) {
    bucket.push([key, value]);
  }
  //return index/key of object ---> this will be index of array
  return bucket.storage;
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
  //decl variable(do i need this?)
  const array = this.storage; //can i do this?
  //iterate through HashTable array
  for(let i = 0; i < array.length; i++) {
    //check to see if key exists; if it does, return corresponding value stored
    if(array[i][0]) return array[i];
    //if more than 1 value is stored at an address, (closure?)
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
  const array = this.storage;
  //iterate through HashTable 
  for(let i = 0; i < array.length; i++) {
    //if key is undefined, return undefined
    if(!array[i][0]) return undefined; 
    //if key is defined, delete key and delete value
    if(array[i][0]) delete array[i];
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
