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
// add value to hashtable with given key
// if key exists update value
// handle collisions
  const hashVal = hashCode(key, this.SIZE);

  if(this.storage[hashVal]){
  this.storage[hashVal][key] = value;
  }
  else{
    this.storage[hashVal] = {};
    this.storage[hashVal][key] = value;
  }
};

let newHash = new HashTable();
newHash.set('1', 22);
newHash.set('11', 12);
newHash.set('1', 18);
newHash.set('0', 15);
newHash.set('33', 9);
newHash.set('5', 99);
newHash.set('14', 54);
console.log(newHash.storage)
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
// access value at given key;
// get specified key if both are at the same address
  const hashVal = hashCode(key, this.SIZE);
  return this.storage[hashVal][key];
};

console.log(newHash.get('1'))
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // get value at specified key
  // store value
  // delete key:value pair
  // return out the deleted value
  // if the value doesnt exit return undefineds
  const hashVal = hashCode(key, this.SIZE);
  
  if(!this.storage[hashVal][key]) return undefined;
  const deletedVal = this.storage[hashVal][key];
  delete this.storage[hashVal][key];
  return deletedVal;
};

console.log(newHash.remove('0'))
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
