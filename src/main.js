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
  // run the hashCode function to get an id# for data passing in as key and value pairs
  let id = hashCode(key, this.SIZE);
  // access the storage object and check if that id already exist (collition check)
    // if it does not exist, create the obj inside storage with its apropriate id "drawer" and set its key-value pairs
  if (this.storage[id] === undefined) {
    this.storage[id] = {};
    this.storage[id][key] = value
    // if it exist, overwritethe existing value with the new value
  } else if (this.storage[id][key]) {
    this.storage[id][key] = value;
  }
  // if id does not exist create one with its value
  else this.storage[id][key] = value;
};


// test it
let myHashedTable = new HashTable();
// myHashedTable.set('a', 1)
// myHashedTable.set('b', 2)
// // myHashedTable.set('c', 3)
// // myHashedTable.set('c', 4)
// // myHashedTable.set('c', 3)
// myHashedTable.set('a', 3)
console.log(myHashedTable)





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
  // run hashCode to get the id
  let id = hashCode(key,this.SIZE)
  // decl. a veriable 'level' and let it be = to value in storage with its apropriate id
  let level = this.storage[id]
  // if that key dosent exist
  if (level === undefined) {
    return console.log('key not found');
  }
  // if key exist than return that key 
  if (level[key]) {
    return level[key];
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
  // get the id
  let id = hashCode(key, this.SIZE);
  // create a temp veriable to store the data that needs to be returned
  let removedEl = this.storage[id][key];
  // delete that property
  delete this.storage[id][key];
  // if key does not exist return undefined 
  if (!this.storage[id][key]) {
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
