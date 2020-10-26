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
  let index = hashCode(key, this.SIZE);
  if (!this.storage[index]) {
    let container = {};
    container[key] = value;
    this.storage[index] = container;
  }
  else {
    let current = this.storage[index];
    current[key] = value;
    this.storage[index] = current
  }
};

let dummy = new HashTable;
dummy.set(5, 4);
dummy.set('Mig', 'uel')
console.log(dummy);

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
  let index = hashCode(key, this.SIZE);
  let container = this.storage[index];
  if (container[key] !== undefined) {
    return true;
  } else {
    return false;
  }
};

console.log(dummy.get(2));
console.log(dummy.get(5));
console.log(dummy.get('idk'));
console.log(dummy.get('Mig'));
dummy.set('mig', 'Hi');
console.log(dummy);




/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let index = hashCode(key, this.SIZE);
  let container = this.storage[index];
  let toReturn = undefined;
  toReturn = container[key];
  delete container[key];
  return toReturn;
};

dummy.remove('mig');
dummy.remove('Mig');
console.log(dummy);

console.log(dummy.remove(5));
console.log(dummy);


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