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
  const hashIndex = hashCode(key, this.SIZE);
  if (this.storage[hashIndex] === undefined) {
    this.storage[hashIndex] = {};
  }
  this.storage[hashIndex][key] = value;
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
  const hashIndex = hashCode(key, this.SIZE);
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
  const hashIndex = hashCode(key, this.SIZE);
  if (!this.storage[hashIndex].hasOwnProperty(key)) {
    return undefined;
  }
  delete this.storage[hashIndex][key];
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

// adding a lot of stuff to table to check and see if collisions are properly handled
const table = new HashTable();
table.set('name', 'max');
table.set('lastname', 'gonzalez');
table.set('pet', 'olive');
table.set('petspecies', 'dog');
table.set('brother', 'henry');
table.set('futurecareer', 'software engineer');
table.set('commute', 'long af');
table.set('proud', 'very');
table.set('degrees', 'english & spanish');
table.set('graduated', 'UCI');
table.remove('graduated');
// making sure using an existing key name will overwrite previous property
table.set('petspecies', 'doggy');
// making sure using the remove method with a nonexistent property will return undefined
console.log('should return undefined', table.remove('nonexistent'));
console.log('lastname', table.get('lastname'));
console.log('name', table.get('name'));
console.log('pet', table.get('pet'));
console.log('petspecies', table.get('petspecies'));
console.log('brother', table.get('brother'));
console.log('futurecareer', table.get('futurecareer'));
console.log('commute', table.get('commute'));
console.log('proud', table.get('proud'));
console.log('degrees', table.get('degrees'));
console.log('graduated', table.get('graduated'));
console.log(table.storage);