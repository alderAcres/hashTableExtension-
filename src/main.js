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
  let index = hashCode(key, this.SIZE);
  //check if index exist
  if (this.storage[index] === undefined) {
    this.storage[index] = ([[key, value]]);
    console.log(this.storage[index])
  } else {
    let inStorage = false;
    for (let i = 0; i < this.storage[index].length; i++) {
      //check if key exist at this index
      if (this.storage[index][i][0] === key) {
        //if it does, rewrite the value
        console.log(value,key)
        this.storage[index][i][0] = value;
        console.log(this.storage[index][i][0])
        // set inStore to true;
        inStorage = true;
      } 
    }
    //if inStorage is false
    if (inStorage === false) {
      //add new item at the end of this index
      this.storage[index].push([[key, value]]);
      console.log(this.storage[index])
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
  for (let i = 0; i < this.storage.length; i++) {
    //check key is in first index
    if (this.storage[i] !== undefined) {
      //loop through the array
      for (let j = 0; j < this.storage[i].length; j++) {
        //if there is a match, return it
        if (this.storage[i][j][0] === key) {
          return this.storage[i][j][1];
        }
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


let test = new HashTable();
test.set('a','b');

console.log(test.get('a'));


