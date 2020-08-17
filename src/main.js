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
  // we need to get the value of the hash function of key
  let hashInd = hashCode(key, this.SIZE);
  // check to see if there is anything at the index provided by the hash function
  if (!this.storage[hashInd]) {
    // if empty we would create an empty object with the key value pair
    this.storage[hashInd] = {};
    this.storage[hashInd].key = value;
  } else {
    // we would add the key value pair into the hash table
    this.storage[hashInd].key = value;
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
  // need to find the object at the hash index
  let hashInd = hashCode(key, this.SIZE);
  // return the key at that has index
  return this.storage[hashInd].key;
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
  // find the object at the hash index
  let hashInd = hashCode(key, this.SIZE);
  // hold the value at the key
  let hold = this.storage[hashInd].key;
  // remove the key value pair with key as key
  delete this.storage[hashInd].key;
  // return the value
  return hold;

};

let hashTable = new HashTable();
hashTable.set('first key', 'first value');
hashTable.set('second key', 'second value');
console.log(hashTable.get('first key')); //.to.be('first value');
console.log(hashTable.get('second key')); //.to.be('second value');
console.log(hashTable.storage.length); //.to.eql(16);
console.log(hashTable.remove('first key')); // .to.eql('first value');
console.log(hashTable.get('first key')); // .to.eql(undefined);


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
