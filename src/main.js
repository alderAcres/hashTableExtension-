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
  this.counter = 0; //used to keep track on number of items stored
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

  //use hashCode function to get the index we want from the key parameter
  const index = hashCode(key, this.SIZE);

  //put the value into the array at the index given by hashCode, but we need to deal with colisions.
    if (!this.storage[index]){ //check if object already exists at index of storage
      this.storage[index] = {}; //if not, create that object
    }
    //add the key-value pair into the object
    this.storage[index][key] = value;
    this.counter++;
    return this.counter;
    
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
  //use hashcode to get the index to look at
  //use key to look for the value in the object at the index we're looking at

  return this.storage[hashCode(key, this.SIZE)][key];

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
  const index = hashCode(key, this.SIZE); //get index to look for through hashCode

  if (this.storage[index][key]){ //if storage at index has the key property
    const holder = this.storage[index][key]; //use a holder that we'll return
    delete this.storage[index][key]; //delete the key value pair from the object
    this.counter--; //update the counter;

    return holder; //return our holder
  }

  return undefined; //if storage at index doesnt have the key property, return undefined
};

// console.log(hashCode('aa', 16))
// console.log(hashCode('aq', 16))
// const test = new HashTable();
// test.set('aa', 7);
// test.set('aq', 8);
// console.log(test);
// test.remove('aa');
// test.remove('aq');
// test.set('aa', 9);
// console.log(test);
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
