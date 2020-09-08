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
  const index = hashCode(key, this.SIZE)
  if (!this.storage[index]) {
    let obj = {};
    obj[key] = value;
    this.storage[index] = obj;
  } else {
    this.storage[index][key] = value;
  }
};

const example = new HashTable()
// console.log(example)
example.set('apple', 2)
console.log(example)

example.set('apple', 3)
console.log(example)


example.set('appk', 3)
console.log(example)

example.set('banan', 5)
console.log(example)
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
  return (this.storage[index]) ? this.storage[index][key] : undefined;
};

console.log(example.get('appk'))

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let value = this.get(key);
  let index = hashCode(key, this.SIZE);
  if (value) delete this.storage[index][key];
  if (!Object.keys(this.storage[index]).length) {
    this.storage[index] = undefined;

  }
  return value;
};

example.remove('banan', 5)
console.log(example)


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
