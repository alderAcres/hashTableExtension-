/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.STORED = 0;
  
  this.storage = new Array(this.SIZE);
}

const alexTest = new HashTable;
console.log(alexTest);

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
  index = hashCode(key, this.SIZE);
  console.log(index);

  if (this.storage[index] === undefined) this.storage[index] = {};
  if (this.storage[index][key] === undefined) this.STORED += 1;

  this.storage[index][key] = value;
  
  return this.STORED;
};

console.log(alexTest.set ('alex', 123));
console.log(alexTest);
console.log(alexTest.set ('alex', 789));
console.log(alexTest);
console.log(alexTest.set ('jzq', 456));
console.log(alexTest);

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
  index = hashCode(key, this.SIZE);
  console.log(index);

  return this.storage[index][key];
};

console.log(alexTest.get('alex'));
console.log(alexTest.get('jzq'));

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  index = hashCode(key, this.SIZE);
  console.log(index);

  if (this.storage[index] === undefined) return undefined;
  const removedValue =  this.storage[index][key];
  if (removedValue === undefined) return undefined;

  delete this.storage[index][key];
  if (Object.keys(this.storage[index]).length === 0) delete this.storage[index];

  this.STORED -= 1;

  return removedValue;
};

console.log(alexTest.remove('alex'));
console.log(alexTest.remove('jzq'));
console.log(alexTest.remove('jzq'));

console.log(alexTest);

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
