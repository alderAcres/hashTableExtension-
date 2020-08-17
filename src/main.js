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

  const hashed = hashCode(key, this.SIZE);

  //if the hashed address has no data stored, create an object with the key-value pair and 
  //store the object at the address
  if (!this.storage[hashed]){
    const properties = {key: value};    
    this.storage[hashed] = properties; 
  } 

  //when the hashed address already contains another key-value pair, add the new key-value pair to the object
    //if the provided key has already been used to store another value at the hashed address, this execution simply 
    //overwrite the existing value with the new value
  this.storage[hashed][key] = value;
  
  return this.storage.length;
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
  const stored = this.storage[hashCode(key, this.SIZE)]; 
  //if key is not found in the hash table, return undefined
  if (!stored[key]) return undefined; 

  return stored[key];

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
  const stored = this.storage[hashCode(key, this.SIZE)];

  //if the key does not exist in the hash table, return undefined
  if (!stored[key]) return undefined;

  const deleted = stored[key];
  delete stored[key];
  return deleted;
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


//test cases
// const testTable = new HashTable();
// console.log(testTable);

// testTable.set("key1", "value1");
// testTable.set("key2", "value2");
// console.log(testTable.get("key1")); // "value1"
// console.log(testTable.get("try")); //"undefined"
// console.log(testTable.get("key2")); // "value2"
