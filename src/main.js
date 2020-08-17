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
  // create index hash key to know where to store value
  const index = hashCode(key, this.SIZE);
  // if the key-value pair does not exist
  if (!this.storage[index]) {
    // assign it to an empty object
    this.storage[index] = {};
    // create the key-value pair inside the empty object above to handle collisions
    this.storage[index][key] = value;
  }
  // if the hash key is already taken, create a key-value pair in object
  this.storage[index][key] = value;
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
  // create hash key to know what index to access the value
  const index = hashCode(key, this.SIZE);
  // return the value at the specific hash key
  return this.storage[index][key];
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
  // create the hash key for the specific key
  const index = hashCode(key, this.SIZE);
  // if the key does not exist in the hash table, return undefined
  if (!(this.storage[index][key])) return undefined;
  // create a temp variable of the value we want to remove
  const temp = this.storage[index][key];
  // delete the value we want to remove
  delete this.storage[index][key];
  // return the removed value;
  return temp;
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


const newhash = new HashTable();
console.log(newhash)
newhash.set(1, 2)
console.log(newhash.get(1))
newhash.set(1, 3)
console.log(newhash.get(1))
newhash.set(1, 4)
newhash.set(2, 3)
newhash.set(57, 'hello')
console.log(newhash)
console.log(newhash.get(1))
console.log(newhash.get(2));
console.log(newhash.remove(2))
console.log(newhash.remove(2));
console.log(newhash)