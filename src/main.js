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
  const itemLocation = hashCode(key, this.SIZE);
  if(!this.storage[itemLocation]){
    this.storage[itemLocation] = {};
    this.storage[itemLocation][key] = value;
  }
  this.storage[itemLocation][key] = value;
  
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

  const itemLocation = hashCode(key, this.SIZE);
  if(!this.storage[itemLocation][key]) return undefined;

  return this.storage[itemLocation][key];
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
  const itemLocation = hashCode(key, this.SIZE);
  if(!this.storage[itemLocation][key]) return undefined

  const rmItem = {}
  rmItem[key] = this.storage[itemLocation][key];
  delete this.storage[itemLocation][key];
  return rmItem;
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

// const container = new HashTable();
// container.set("burger", "$3.99")
// container.set("banana", "$5.00")
// container.set("fries", "$1.99")
// container.set("chicken", "$4.99")
// container.set("api", "$2.00")
// console.log(container.remove("chicken"));
// console.log(container.storage);
// console.log(container.get("banana"))
// Do not remove!!
module.exports = HashTable;
