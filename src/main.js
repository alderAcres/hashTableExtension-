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
    const newObj = {};
    let index = hashCode(key, this.SIZE);
    let result = this.storage[index];
    if(!this.storage[index]) {
      newObj[key] = value;
      this.storage[index] = newObj;
    } else {
      result[key] = value;
    }
    return this.storage;
};

// let hash = new HashTable;
// console.log(hash.set('j', 5));
// console.log(hash.set('s', 8));
// console.log(hash.set('f', 5));
// console.log(hash.set('d', 5));
// console.log(hash.set('e', 5));
// console.log(hash.set('w', 5));
// console.log(hash.set('js', 5));
// console.log(hash.set('ja', 5));
// console.log(hash.set('jm', 5));
// console.log(hash.set('jn', 5));
// console.log(hash.set('jb', 5));
// console.log(hash.set('jv', 5));
// console.log(hash.set('q', 5));
// console.log(hash.set('r', 5));
// console.log(hash.set('t', 5));
// console.log(hash.set('y', 6));
// console.log(hash.set('u', 5));
// console.log(hash.set('i', 5));

// console.log(hash)


// console.log(hash.set('j', 7)); 

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
    const hashFunc = hashCode(key, this.SIZE);
    let result = this.storage[hashFunc];
    if(Object.keys(result).length > 1) {
      return result[key];
    }
    return result[key];
};

// console.log(hash);
// console.log(hash.get('s'))
// console.log(hash.get('j'))
// console.log(hash.get('y'))

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
    const hashFunc = hashCode(key, this.SIZE);
    let result = this.storage[hashFunc];
    let deleteKey = result[key];
    if(!result[key]) {
      return undefined;
    }
    delete result[key];
};
// console.log(hash.remove('s'));
// console.log(hash);
// console.log(hash.set('s', 9));
// console.log(hash.set('s', 10));

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
