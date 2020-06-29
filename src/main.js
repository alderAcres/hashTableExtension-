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
HashTable.prototype.set = function (key, value) {
  //get the hash using the provided hash function
  const hash = hashCode(key, this.SIZE)

  //access the storage hash
  //if it is empty, create an object empty
  if (!this.storage[hash]) {
    this.storage[hash] = {};
  }
  //store the key-value pair in the provided object
  this.storage[hash][key] = value;

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
HashTable.prototype.get = function (key) {
  //get hash index from hash code
  const hash = hashCode(key, this.SIZE)

  //access storage with hash index
  //if there is an object in the hash index and the key exist inside, return the value
  //else return 'key not found'
  return (this.storage[hash] && this.storage[hash][key]) ? this.storage[hash][key] : 'key not found'
};



/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  //use hashcode to retrieve the hash index
  const hash = hashCode(key, this.SIZE)

  //access the storage with the hash index
  //if theres an object and the key is there, 
  //else return key not round
  if (!this.storage[hash] || !this.storage[hash][key]) return 'key not found'

  //save the value and delete the key
  const removed = this.storage[hash][key]
  delete this.storage[hash][key]

  //if object is empty after deleting the key, delete the object
  if (Object.keys(this.storage[hash]).length === 0) delete this.storage[hash]

  //return the saved value 
  return removed
};

const test = new HashTable();
test.set("apple", 1)
test.set("banana", 1)
console.log(test.get("apple"))
console.log(test.remove("banana"))
console.log(test.storage)


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
