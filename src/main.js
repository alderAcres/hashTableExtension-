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
  // use hash function to get the index at which to store the provided value
  const hashIndex = hashCode(key, this.SIZE);
  // use hashIndex as the index of the table at which to store the key-value pair
  if (!this.storage[hashIndex]) {
    this.storage[hashIndex] = {[key]: value};
  } else {
    this.storage[hashIndex][key] = value;
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
  // use hash function to get the index from which to retrieve the provided value
  const hashIndex = hashCode(key, this.SIZE);
  // access the value from the hashTable using bracket notation
  return this.storage[hashIndex][key];
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
  // use hash function to get the index from which to delete the provided key-value pair
  const hashIndex = hashCode(key, this.SIZE);
  // grab the value to return later; if it does not exit, removedVal will be undefined
  const removedVal = this.storage[hashIndex][key];
  delete this.storage[hashIndex][key];
  return removedVal;
};

let table = new HashTable();
console.log(table);
table.set('x', 'firstVal');
table.set('x0', 'secondVal');
table.set('baz', 'thirdVal');
console.log(table);
console.log(table.get('x'));
console.log(table.get('x0'));
console.log(table.remove('x'));
console.log(table);
console.log(table.remove('x'));
console.log(table);


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
