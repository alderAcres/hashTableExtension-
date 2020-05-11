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

  this.count = 0
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
  //determine the index by evaluating the key with the table size in the hashCode function
  let index = hashCode(key, this.SIZE); 
  //if the index is undefined, make it an empty object
  if (this.storage[index] === undefined) {
    this.storage[index] = {};
  };
  //add key/value pair to object at that index
  this.storage[index][key] = value;
  //increase count of hash table by 1, return count
  this.count++;
  return console.log(`There are ${this.count} items in this Hash Table.`)
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
  //determine index by invoking hashCode on key and size
  let index = hashCode(key, this.SIZE);
  //return the value that associates with the given key at that index
  return this.storage[index][key];
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
  //determine index by invoking hashCode on key with table size
  let index = hashCode(key, this.SIZE);
  //if there is nothing stored at the index, return undefined
  if (!this.storage[index]) return undefined; 
  //otherwise delete the key/value pair at that index
  let toBeRemoved = this.storage[index][key];
  if (Object.keys(this.storage[index] === 1)) {
    delete this.storage[index];
    this.count--;}
    else {
    delete this.storage[index][key];
    }
    this.count--
    return toBeRemoved;
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