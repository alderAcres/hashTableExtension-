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
  // needs to deal with collision
  const hash = hashCode(key, this.SIZE);
  if (!this.storage[hash]) {
    this.storage[hash] = {
      [key]: value,
    }
  } else {
    this.storage[hash][key] = value;
  }
};

const newHash = new HashTable();
newHash.set('name', 'adam');
console.log(newHash);
newHash.set('name', 'steven');
console.log(newHash);

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
  const hash = hashCode(key, this.SIZE);
  return this.storage[hash];
};

newHash.set('hi', 'steven');
console.log('check', newHash.get('name'));


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // use the get method to get the key
  // create a variable and initialize it to the evaluated result of invoking the hashCode function on the input key

  const value = this.get(key);
  const hash = hashCode(key, this.SIZE);
  if (key === undefined) return undefined;
  if (value) delete this.storage[hash][key];
  return value;
};

console.log(newHash.remove('name'));
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
