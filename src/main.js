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
  this.items = 0;
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
  //invoke the hashCode function, passing in key and size to get a hashIndex, store as hashIndex
  let hashIndex = hashCode(key, this.SIZE);
  console.log(hashIndex)

  //assign value to hashIndex on hash table
  this.storage[hashIndex] = value;

  //pre increment and return number of items in hash table
  return ++this.items;
  
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
  //invoke the hashCode function, passing in key and size to get a hashIndex, store as hashIndex
  let hashIndex = hashCode(key, this.SIZE);

  //return the value at hashIndex
  return this.storage[hashIndex];
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
  //invoke the hashCode function, passing in key and size to get a hashIndex, store as hashIndex
  let hashIndex = hashCode(key, this.SIZE);

  //store the value at hashIndex as temp
  let temp = this.storage[hashIndex];

  //delete the key/val pair at hashIndex and decrement this.items
  delete this.storage[hashIndex];
  this.items--;

  //return temp
  return temp;
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
// const myHash = new HashTable();
// myHash.set('key1', true); 
// myHash.set('key2', false);
// myHash.set('key3', 3); 

// console.log(myHash.storage);

// myHash.get('key3'); 

// console.log(myHash.remove('key2')); //should return false

// console.log(myHash.storage) //should not include key2
// console.log(myHash.items) //should be 2


