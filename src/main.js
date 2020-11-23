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
  // declare helper function to get a random hash address in storage
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
  // get the address from 0 to 16
  const hashAddress = getRandomInt(17);
  //If the provided key has already been used to store another value, simply overwrite the existing value with the new value.
  if (this.storage[hashAddress]){ 
    this.storage[hashAddress][key] = value;
  } else {
    // if hashAddress is undefined in this.storage then create a subarr and set key/value pairs
    this.storage[hashAddress] = {};
    this.storage[hashAddress][key] = value;
  }
};

// const test = new HashTable();
// console.log(test)
// console.log(test.set('hi', 'works'))
// console.log(test)
// console.log(test.set('hello', 'nice'))
// console.log(test)
// console.log(test.set('hi', 'reassign'))
// // console.log(test)

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
  //loop over the storage, to get each object 
 this.storage.forEach(element => {
   //check if passed in key matches present key and return the value assosiated with it
   if(element[key] === key) return element[key]
 });
};

// console.log(test.get(4))

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  ////loop over the storage, to get each object 
  this.storage.forEach(element => {
    //delete key/value pair if passed in key matches existing key
    if(element[key] === key) {
      delete element[key]
    };
  });
 };

 const test = new HashTable();
//  console.log(test)
//  console.log(test.set('hi', 'works'))
// //  console.log(test)
// //  console.log(test.set('hello', 'nice'))
// //  console.log(test)
// //  console.log(test.set('hi', 'reassign'))
//  // console.log(test)
// console.log(test)
//  console.log(test.get(16))

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
