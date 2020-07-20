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
  // check if key is a string, if not make it one
  // if (typeof key !== 'string') key = key.toString();

  // send it through the hashCode
  const hash = hashCode(key, this.SIZE);
  // check if the bucket is defined
  if (!this.storage[hash]) {
    // if not, make it empty object
    this.storage[hash] = {};
  }

  if (this.storage[hash][key] !== undefined) return 'key already exists';

  this.storage[hash][key] = value;

  // mdn says returns a pointer to where it's stored...
  return hash;
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
  const hash = hashCode(key, this.SIZE);
  
  return this.storage[hash][key];
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
  const hash = hashCode(key, this.SIZE);
  if (!this.storage[hash][key]) return undefined;
  
  const removed = this.storage[hash][key];
  // this.storage[hash][key] = undefined;
  delete this.storage[hash][key]; // I remember this didn't work how a previous test wanted, but it felt odd to leave the key in the object floating around even if it has an undefined value. I'll look up later which of these two options is better.

  return removed;
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

let table = new HashTable();
console.log(table.set('4', true));
console.log(table.set('matt', 30));
console.log(table.set('denis', 'fellow'));
table.set('jen', 'facemask');
console.log(table.get('4'));
console.log(table.get('jen'));

console.log(table)
console.log(table.storage[4])
console.log(table.set('matt', 'alabama'));

console.log(table.remove('4'));
console.log(table.remove('matt'));
console.log(table);

// Do not remove!!
module.exports = HashTable;
