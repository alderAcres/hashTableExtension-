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

let newHash = new HashTable;

console.log(newHash);

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
  let itemsStored = 0;
  let index = hashCode(key, this.SIZE);

  if (!this.storage[index]) {
    this.storage[index] = {};
  };

  this.storage[index][key] = value;

  for (let i = 0; i < this.SIZE; i++) {
    if (this.storage[i] != null) itemsStored++;
  };

  return itemsStored;
};

console.log(newHash.set('published first:', 'the pig and the pony'));
console.log(newHash.set('published second:', 'pink corn moon'));

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
  let index = hashCode(key, this.SIZE);

  return this.storage[index][key];
};

console.log(newHash.get('published first:', 'the pig and the pony'));
console.log(newHash.get('published second:', 'pink corn moon'));

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let index = hashCode(key, this.SIZE);
  
  let returnVal = this.storage[index][key];

  delete this.storage[index][key];
  console.log(this.storage[index]);

  for (let i = 0; i < this.SIZE; i++) {
    let el = this.storage[i];
    if (el && Object.keys(el).length === 0) {
      delete this.storage[i];
    }
  }

  return returnVal;
};

console.log(newHash);
console.log(newHash.remove('published first:', 'the pig and the pony'));
console.log(newHash);
console.log(newHash.remove('published second:', 'pink corn moon'));
console.log(newHash);


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
