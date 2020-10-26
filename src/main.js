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
  if (!key || !value) return 'Please enter a proper key/value pair.';
  if (typeof key === 'object') return 'Key must be convertible to a string.';
  // make an object using the pair
  const object = {};
  object[key] = value;
  // convert the key into a hash code using the hashCode
  const code = hashCode(key, this.SIZE);
  // put the object in the storage with the hash code as key
  if (this.storage[code]) {
    // handle collisions
    if (!this.storage[code][key]) this.storage[code][key] = value;
  } else {
    this.storage[code] = object;
  }
  // return # of items in storage
  return this.storage.reduce((a,c) => a += c ? 1 : 0, 0);
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
  const code = hashCode(key, this.SIZE);
  return this.storage[code][key];
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
  const code = hashCode(key, this.SIZE);
  const value = this.storage[code][key];
  delete this.storage[code][key];
  return value;
};

const hash = new HashTable;
hash.set('chris', 31);
hash.set('chris', 32);
hash.set('shirley', 32);
console.log(hash.get('chris'));
console.log(hash.remove('shirley'));
console.log(hash.storage);

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
