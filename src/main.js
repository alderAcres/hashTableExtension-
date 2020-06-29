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
  // Strategy: Put an object to an array with the index which the hashCode function somewhat randomly assigns to, based on this.SIZE
  // this is a separate chaining stragey to avoid collision.

  // get the index using the hashCode function to hash the key
  const index = hashCode(key, this.SIZE);
  // if nothing exists within the storage, set this.storage[index] to be equal to an empty object
  if (this.storage[index] === undefined) this.storage[index] = {};
  // then set the key value pair within the object of this.storage[index]
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
  const index = hashCode(key, this.SIZE);
  // if there is a value within this.storage[index], then return the value corresponding to the key parameter. 
  if (this.storage[index]) return this.storage[index][key];
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
  const index = hashCode(key, this.SIZE);
  if (!this.storage[index]) return undefined;
  else delete this.storage[index][key];
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

let hashTable = new HashTable();
hashTable.set("lucy", "says hi")
hashTable.set("justin", "says hello")
hashTable.set("luis", "says ello")

console.log(hashTable.get("lucy"))
console.log(hashTable.get("justin"))
console.log(hashTable.get("luis"))
console.log(hashTable)



// console.log(hashCode("luis", 25))
// console.log(hashCode("mercer", 25))
// console.log(hashCode("andy", 25))
// console.log(hashCode("justin", 25))
// console.log(hashCode("jim", 25))
// console.log(hashCode("lucy", 25))

// Do not remove!!
module.exports = HashTable;
