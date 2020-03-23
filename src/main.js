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
HashTable.prototype.set = function (key, value) {
  //declare a new variable 'index' (our hashed key), which determines where in the array the value is stored
  const index = hashCode(key, this.SIZE);
  //check if value exists in the storage array 
  if (this.storage[index] !== undefined) {
    // if no, store new object w/ key:valur pair originally passed in
    this.storage[index][key] = value;
    // if yes, set element of storage at index of key: value pair to prevent collision
  } else {
    const collisionObject = {};
    collisionObject[key] = value;
    this.storage[index] = collisionObject;
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
HashTable.prototype.get = function (key) {
  //declare variable index, which indexes the location of the value stored
  const index = hashCode(key, this.SIZE);
  //declare a variable 'output' that accesses the storage at index 'key'
  const output = this.storage[index]
  //return output
  return output;
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  //declare variable 'index', which stores the hashed key 
  const index = hashCode(key, this.SIZE);

  //check if key exists in the hash table
  if (index === undefined) return 'undefined'
  //declare variable 'output' which accesses the hashed key in the storage array
  const output = this.storage[index]; console.log(output);
  //delete the key in the storage array
  delete this.storage[index];
  //return 'output' which is the deleted key 
  return output;
};

//Begin Test Cases=========================================
const hash = new HashTable();
hash.set('Jimmy', 'Phong');
hash.set('Jasd', 'Test');
console.log(hash);
console.log(hash.get('Jimmy'));
console.log(hash.remove('Jimmy'));
console.log(hash.remove('No'));





//End Test Case=========================================

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
