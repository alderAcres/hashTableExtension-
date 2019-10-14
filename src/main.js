/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.items = 0;
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
  const code = hashCode(key, this.SIZE);
  // console.log(code)
  if (!this.storage[code]) {
    this.storage[code] = {};
    this.storage[code][key] = value;
    return ++this.items;
  } else if (this.storage[code][key]) {
    this.storage[code][key] = value;
    return this.items;
  }
  else if (this.storage[code] && !this.storage[code][key]) {
    this.storage[code][key] = value;
    return ++this.items;
  } 
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
  // console.log(code)
  // console.log(this.storage[code][key])
  if (this.storage[code][key]) {
    return this.storage[code][key]
  } else {
    return undefined;
  }
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
  if (this.storage[code][key]) {
    const temp = this.storage[code][key];
    this.items--;
    delete this.storage[code][key];
    return temp;
  } else {
    return undefined;
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

const hash = new HashTable();
console.log(hash);
console.log(hash.set('Steph', 100));
console.log(hash);
console.log(hash.set('Steph', 101));
console.log(hash.set('codesmith', 200))
console.log(hash)
console.log(hash.get('Steph'));
console.log(hash.get('codesmith'))
console.log(hash.remove('codesmith'))
console.log(hash.items)
console.log(hash.remove('Steph'))
console.log(hash.items)
// console.log(hash.get('hello'));
