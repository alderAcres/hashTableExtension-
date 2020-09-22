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
  //get hash index
  const hashIndex = hashCode(key, this.SIZE);
  //if key exist, replace with new key/value
  if(this.storage[hashIndex]){
    this.storage[hashIndex][key] = value;
  //if key does not exist, add empty object and add key/value pair  
  } else {
    this.storage[hashIndex] = {};
    this.storage[hashIndex][key] = value;
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
  //get hash index
  const hashIndex = hashCode(key, this.SIZE);
  //return undefined if key does not exist
  if(this.storage[hashIndex][key] === undefined) return;
  //return value of key
  return this.storage[hashIndex][key];
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
  //get hash index
  const hashIndex = hashCode(key, this.SIZE);
  //return undefined if key does not exist
  if(this.storage[hashIndex][key] === undefined) return;
  //get removed key/value
  const removedValue = this.storage[hashIndex][key];
  //delte key/value
  delete this.storage[hashIndex][key];
  //return removed key/value
  return removedValue;
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


//TEST:
let testTable = new HashTable()
console.log(testTable.set("test", 100))
console.log(testTable.set("grade", 90))
console.log(testTable)
console.log(testTable.get("grade"))
console.log(testTable.remove("grade"))
console.log(testTable)