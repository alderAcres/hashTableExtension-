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
  //declare a const to represent hashed key;
  const hashedKey = hashCode(key, this.SIZE);
  //check for collision, if there is store the key value pair within the obj;
  if (this.storage[hashedKey] !== undefined) {
    this.storage[hashedKey][key] = value;
    
  } else {
    const hashObj = {};
    hashObj[key] = value;
    this.storage[hashedKey] = hashObj;
  }
};

const hash = new HashTable;

hash.set('clara', 'hi');
hash.set('clar1', 'bye');
hash.set('kim', '5');
console.log(hash);

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
  const hashedKey = hashCode(key, this.SIZE);
  //declare a const to represent the value at the specified key;
  const hashObj= this.storage[hashedKey];
  //return value;
  return hashObj[key];
};

console.log(hash.get('clar1'));
console.log(hash.get('kim'));

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  const hashedKey = hashCode(key, this.SIZE);
  const hashObj = this.storage[hashedKey];
  const value = hashObj[key];
  delete this.storage[hashedKey][key];
  return value;
};

console.log(hash.remove('clara'))


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

// console.log(hashCode('clara', 16))
// console.log(hashCode('clar1', 16))

// Do not remove!!
module.exports = HashTable;
