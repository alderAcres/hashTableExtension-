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
  //find result num in hash table to store key/value in storage
  let hashedResult = hashCode(key, this.SIZE);
  //check to see if the hash table already has a value at hashedResult index
  if(this.storage[hashedResult]){
    //if table has value at hashedResult, create a new key value pair at hashedResult containing key and value
    this.storage[hashedResult][key] = value;
  } else {
    //if not, create an object at hashedResult with key/value pair
    this.storage[hashedResult] = {
      [key] : value
    };
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
  //find key's hashed index
  let hashedResult = hashCode(key, this.SIZE);
  //if index exists, find and return value that matches key
  if(this.storage[hashedResult][key]){
    let value = this.storage[hashedResult][key];
    return value;
  } else return console.log("Key not found")
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
    //find hashed index of key
    let hashedResult = hashCode(key, this.SIZE);
    //if key exists at hashed index, delete key/value pair
    if(this.storage[hashedResult][key]){
      delete this.storage[hashedResult][key]
      //if key doesn't exist at hashed index, return undefined
    } else return undefined;
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

//TESTING
// let table = new HashTable();
// table.set("hello",111)
// table.set("world",222)
// table.set("goodbye",333)
// console.log(table.get('goodbye'))
// table.remove('world');
// console.log(table)
