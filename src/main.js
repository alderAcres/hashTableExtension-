/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.items = 0;
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
  // Find the location in the hash table to store the key value pair
  const location = hashCode(key, this.SIZE);
  // Check if the location already stores an object
  // If not, create an empty object at the location
  if (!this.storage[location]) this.storage[location] = {};
  // Add key value pair to object at location as a property
  this.storage[location][key] = value;
  // Track the number of stored items in the hash table
  this.items++;
  // Return the current number of stored items
  return this.items;
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
  // Find location in the hash table where key is stored
  const location = hashCode(key, this.SIZE);
  // If location is empty return undefined
  if (!this.storage[location]) return;
  // If property at location does not exist return undefined
  if (!this.storage[location][key]) return;
  // Return the value associated with key at the location
  return this.storage[location][key];
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
  // Find the location of the property to be removed
  const location = hashCode(key, this.SIZE);
  // Check if the key value pair exists at the location
  // If not, return undefined
  if (!this.storage[location]) return;
  // Otherwise, save the value at location
  const output = this.storage[location][key];
  // Delete the property
  delete this.storage[location][key];
  // Track the number of stored items in the hash table
  this.items--;
  // Check if the object at location is now empty
  // If so remove object from hash table
  if (!Object.entries(this.storage[location]).length) delete this.storage[location];
  // Return saved value
  return output
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

// Test region
const hashTable = new HashTable();

hashTable.set('a', '1');
hashTable.set('b', '2');
const numItems = hashTable.set('1', '3');
console.log(numItems);
hashTable.set('Hello', 'World');
const value = hashTable.remove('b');
console.log(value);
console.log(hashTable.get('b'));
console.log(hashTable.get('1'));
console.log(hashTable.items);
console.log(hashTable.storage);
hashTable.remove('a');
hashTable.remove('1');
hashTable.remove('Hello');
hashTable.remove('Hello');
console.log(hashTable.items);
console.log(hashTable.storage);


// Do not remove!!
module.exports = HashTable;
