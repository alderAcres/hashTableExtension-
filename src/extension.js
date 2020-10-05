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
  this.numOfItems = 0;
  
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
  //check if adding this item will be over 75% of storage's size
  if((this.storage.length + 1) > (.75 * this.SIZE)) {
    //double hash table's size
    this.SIZE = this.SIZE * 2
    const copy = [...this.storage]
    this.storage = new Array(this.SIZE)
    //iterate through copy,
    for(let i = 0; i < copy.length; i++) {
      //rehash everything
      //if value is an object
      if(typeof(copy[i]) === object){
        //save keys and values
        const entries = Object.entries(this.copy[i])
        //for each key and value, rehash and save into storage
        entries.forEach(arr => {
          //save key and value
          const [k, v] = arr
          //rehash key with new size
          const hash = this.hashCode(k, this.SIZE)
          if(!this.storage[hash]) this.storage[hash] = {}
          this.storage[hash][k] = v
        })
      }
    }
    
  }
  // retrieve hash
  const hash = this.hashCode(key, this.SIZE)
  // access hash in storage, save hash and storage
  // if hash doesn't exist, instantiate an empty object
  if(!this.storage[hash]) this.storage[hash] = {}
  this.storage[hash][key] = value
  return this.storage.length
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
  //retrieve hash
  const hash = this.hashCode(key, this.SIZE)
  //access hash at storage with key
  const value = this.storage[hash][key]
  return value
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
  //store hash
  const hash = this.hashCode(key, this.SIZE)
  //access value at hash/key in storage
  const value = this.storage[hash][key]
  //if value exists, delete
  if(this.storage[hash][key]) {
    delete this.storage[hash][key]
    //decrement number of items in hash table
    this.numOfItems--
    return `${value} deleted`
  } else {
    return undefined
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
