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
  // set hash number for current function calling using hash code
  const hash = hashCode(key, this.SIZE)
  // set the give key and value as an object at the calculated current hash = value will overwrite if key has already been used
  // need to use bracket notatioin on key b/c it's a variable
  hashTable.storage[hash]= {[key]: value};
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
  // find has for key that we are looking up
  const hash = hashCode(key, this.SIZE)
  // return the value of the key that we are looking up making sure to only return the value of key we are looking up if there is more than one property stored at the hash
  return hashTable.storage[hash][key];
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
  // set hash for remove function call
  const hash = hashCode(key, this.SIZE)
  // if the property doesn't exist at the hash, return undefined
  if (hashTable.storage[hash] === undefined) return undefined;
  // otherwise delete the property at the hash.
  delete hashTable.storage[hash]; 
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

const hashTable = new HashTable();
hashTable.set('test1', 1)
hashTable.set('test2', 2)
hashTable.set('test1', 'testx')
console.log(hashTable.get('test1'))
hashTable.remove('test1')