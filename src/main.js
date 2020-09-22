/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.COUNTER = 0;
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
  const result = hashCode(key, this.SIZE);

  if (this.storage[result]) {
    if (!this.storage[result][key]) this.COUNTER++;
    this.storage[result][key] = value;
  } else {
    this.storage[result] = {};
    this.storage[result][key] = value;
    this.COUNTER++;
  }
  return this.COUNTER;
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
  const result = hashCode(key, this.SIZE);

  if (this.storage[result]) {
    return this.storage[result][key];
  } 
  return undefined;
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
  const result = hashCode(key, this.SIZE);
  const value = this.get(key);

  if (value) {
    delete this.storage[result][key];
    this.COUNTER--;
  }
  return value;
};

// const hash = new HashTable();
// console.log(hash);
// console.log(hash.set('19', 'hi'));
// console.log(hash);
// console.log(hash.set('8', 'hey'));
// console.log(hash.set('10', 'hello'));
// console.log(hash);
// console.log(hash.get('8'));
// console.log(hash.get('19'));
// console.log(hash.get('10'));
// console.log(hash.get('11'));
// console.log(hash.remove('11'));
// console.log(hash.remove('10'));
// console.log(hash.remove('19'));
// console.log(hash);
// console.log(hash.remove('8'));
// console.log(hash);


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
