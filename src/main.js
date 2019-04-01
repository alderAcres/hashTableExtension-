/**
 * You must implement the get, set, and remove functions on the HashTable prototype.
Each function is commented with its specifications. 
Implement the functions exactly as their documentation prescribes. 
You may assume the functions will be called with the types listed in their documentation.

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
  const hashed = hashCode(key, this.SIZE);  // Invoke hash function on key arg and size of table
  if(this.storage[hashed] === undefined) { // Check if generated hash is defined
    this.storage[hashed] = {}; // If undefined, create new object and store key/value in it and push the object to storage
  }
  this.storage[hashed][key] = value; // At the hash key @ specified key set to value
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
  const hashed = hashCode(key, this.SIZE); 
  return this.storage[hashed][key];
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
  const hashed = hashCode(key, this.SIZE);
  let removed = this.storage[hashed][key];
  delete this.storage[hashed][key];
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
let newObj = new HashTable();
newObj.set('steven', 'cool');
newObj.set('john', 'lame');
console.log(newObj);
console.log(newObj.get('steven'));
console.log(newObj.get('bob'));
console.log(newObj.get('john'));
newObj.remove('john');
console.log(newObj);

// Do not remove!!
module.exports = HashTable;
