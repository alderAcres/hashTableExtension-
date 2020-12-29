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
  this.numStored= 0;
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
  //create index for hey
  let index= hashCode(key, this.SIZE);
  //if no value is in the index, create empty array, and push in key value pair, return number of items 
  //stored in Hash Table
  if (this.storage[index] === undefined){
    this.storage[index]= [];
    this.storage[index].push([key, value]);
    return ++this.numStored
  } 
  // if there is an item already stored (collision)
  else {
    //we check if the current key has already been used to store another value, if so we replace old value
    //with new value by iterating and replacing value directly
    let keyIncluded= false
    for (let i=0; i < this.storage[index].length; i++){
      if (this.storage[index][i][0] === key){
        this.storage[index][i][1] = value;
        keyIncluded= true;
        return ++this.numStored
      } 
    }
    //if the key has not been used before we simply push in the key-value pair and return number of items
    //stored in the Hash Table
    if (!keyIncluded){
     this.storage[index].push([key, value])
     return ++this.numStored 
    }
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
  //get index for that key
  let index = hashCode(key, this.SIZE);
  //if the the key does not exist in the hashtable, return undefined
  if (this.storage[index] == undefined){
    return undefined
  }
  // if there is only one item at the index, simply return the associated value
  else if (this.storage[index].length === 1){
    return this.storage[index][0][1]
  } else {
    //if there at the index we have a collision, loop through the array and return the 
    //value associated with key we are passing in
    for (let i=0; i < this.storage[index].length; i++){
      if (this.storage[index][i][0]===key){
        return this.storage[index][i][1]
      }
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
  let index= hashCode(key, this.SIZE)
 //if the the key does not exist in the hashtable
  if (this.storage[index] === undefined){
    return undefined
  }
  //if there is only one item at the index
  else if (this.storage[index].length === 1){
    --this.numStored;
    return this.storage[index].pop()
  } 
  //if at the index we have collision
  else {
    for (let i=0; i < this.storage[index].length; i++){
      if (this.storage[index][i][0]===key){
        --this.numStored;
        //declare variable called currPair, keeps track of current pair, which we will delete and return
        let currPair= this.storage[index][i];
        //delete pair at index i
        this.storage[index].splice(i, 1)
        //return key-value pair deleted
        return currPair
      }
    }
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
