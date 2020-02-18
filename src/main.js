/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.length = 0;
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
  if(this.length === (this.size * 75) * 0.1){
    this.size *= 2;
  }

  let index = hashCode(key, this.SIZE);
  
  if(!this.storage[index]){
    this.storage[index] = value;
  } else {
    this.storage[index] = value;
  }

  return ++this.length;
};

const nItem = new HashTable;

console.log(nItem.set("hello", 'hello world'));
console.log(nItem.set("spider", 'world'));
console.log(nItem.set('super', 'world'));
console.log(nItem.storage);

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
  let storedVal = this.storage[hashCode(key, this.SIZE)];

  if(storedVal){
    return storedVal;
  }

  return -1;
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
  let storedVal = this.storage[hashCode(key, this.SIZE)];

  if(storedVal && storedVal !== null){
    delete this.storage[hashCode(key, this.SIZE)];
  } else {
    return;
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
