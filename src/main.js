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
* param {string} key - key to be used to create hashed address
* param {string|number|boolean} value - value to be stored in hash table
* return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  //create hash value using hashCode function provided with parameters key, and size of HashTable
  const hash = hashCode(key, this.SIZE);
  //check if storage at hash exists
    //if no, set storage at hash equal to empty {}
  if(!this.storage[hash]){
    this.storage[hash] = {};
  }
  //once ln 32 executes or if storage at hash already exists, create new key/value pair in object
  this.storage[hash][key] = value;
};

let testTable = new HashTable();
testTable.set('hi', 5);
testTable.set('h', 6);
console.log(testTable);
testTable.set('hi', 7);
console.log(testTable);
/**
* get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed address, then you must retrieve
*   the correct value that was originally stored with the provided key
*
* param {string} key - key to lookup in hash table
* return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/
HashTable.prototype.get = function(key) {
  //create hash value for using hashCode function provided with parameters key, and size of HashTable
  const hash = hashCode(key, this.SIZE);
  //return value associated with key at correct hash location
  return this.storage[hash][key];
};
console.log(testTable.get('hi'));
console.log(testTable.get('h'));
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* param {string} key - key to be found and deleted in hash table
* return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  //create hash value using hashCode function provided with parameters key, and size of HashTable
  const hash = hashCode(key, this.SIZE);
  //if hash element in array doesnt exist or if key at hash element doesnt exist, return undefined
  if(!this.storage[hash] || !this.storage[hash][key] ){
    return undefined;
  }
  //create new variable to store soon to be deleted key/value pair at hash
  let deletedKey = this.storage[hash][key];
  //delete key value pair from 'bucket'
  delete this.storage[hash][key];
  //return value of deleted key **not sure if this is required**
  return deletedKey;
};
console.log(testTable.remove('h'));
console.log(testTable.remove('f'));
console.log(testTable);

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
