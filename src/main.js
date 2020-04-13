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

function StoreObj() {
  this.obj = {}
}


// what is a hash table?
// A key is converted into an integer index by using a hash function.
// This index decides the where the key-value pair record belongs.

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

  // key is converted to integer using hash function
  let convertedKey = hashCode(key, this.SIZE)

  // if the convertedKey already exists, store the key-val pairs in their own objs
  if (this.storage[convertedKey] !== undefined){
    let store = new StoreObj(key)
    
    this.storage[convertedKey][store.obj]

    return this.storage[convertedKey]

  }
  this.storage[convertedKey] = value

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
  // return val
  let convertedKey = hashCode(key)
  return this.storage[convertedKey]

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
  // if key doesn't exist
  if (key === undefined){
    return undefined
  }

  // find the hashed address and delete the value associated with it 
  let convertedKey = hashCode(key, this.SIZE)
  delete this.storage[convertedKey]

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




let random = new HashTable()
console.log(random.set('hello', 'jack'))
console.log(random.set('goodbye', 'parsimony'))
console.log(random.set('aloha', 'pflopfish'))


// console.log(random.remove('aloha'))
console.log(random.get('hello'))




// Do not remove!!
module.exports = HashTable;
