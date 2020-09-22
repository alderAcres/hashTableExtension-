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

  this.stored = 0
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
  let cell = hashCode(key, this.SIZE)
  if(this.storage[cell] && !this.storage[cell][key]) {
    this.storage[cell][key] = value
    this.stored++
  }
  else if(this.storage[cell] && this.storage[cell][key]) { 
    this.storage[cell][key] = value
    return this.stored
  }
  else{
    this.storage[cell] = {[key]: value}
    this.stored++
  }
  return this.stored
};

let bob = new HashTable()
console.log(bob.set('hi', 17))
console.log(bob.set('bye', 12))
console.log(bob.set('bye', 12))
console.log(bob.storage)

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
  let cell = hashCode(key, this.SIZE)

  return this.storage[cell][key]
};

console.log(bob.get('hi'))
console.log(bob.get('bye'))

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let cell = hashCode(key, this.SIZE)
  let removed
  if(this.storage[cell] && this.storage[cell][key]){
    removed = this.storage[cell][key]
    delete this.storage[cell][key]
    this.stored--
  }
  return removed
};
console.log(bob.remove('banana'))
console.log(bob.remove('hi'))
console.log(bob.set('apple', true))
console.log(bob.storage)

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
