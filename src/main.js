/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.numStored = 0;
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
HashTable.prototype.set = function (key, value) {
  const input = hashCode(key, this.SIZE);
  if (this.storage[input] !== undefined) {
    this.storage[input][key] = value;
    this.numStored += 1;
  } else {
    let obj = {};
    obj[key] = value;
    this.storage[input] = obj;
    this.numStored += 1;
  }
  return this.numStored;
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
HashTable.prototype.get = function (key) {
  return typeof this.storage[hashCode(key,this.SIZE)] === 'object' ? this.storage[hashCode(key, this.SIZE)][key] : undefined;
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  const output = this.get(key);
  if (output === undefined) return undefined;
  this.storage[hashCode(key, this.SIZE)] = undefined;
  return output;
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

// Testing
// const hash = new HashTable();
// hash.set('john',4);
// hash.set('kyle', 'hello');
// hash.set('will',50);
// hash.set('bob','foo');
// hash.set('bob','hi');
// hash.set('shoe','lace');
// hash.set('jay','joe');
// hash.set('ron','paul');
// hash.set('blah','blargh');
// console.log(hash.remove('bob'));
// console.log(hash.get('bob'));
// console.log(hash.get('will'));
// console.log(hash.storage);

// Do not remove!!
module.exports = HashTable;
