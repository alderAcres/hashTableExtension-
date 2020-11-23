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
  
  // For each undefined key in our hash table, we will set its value to an array.
  // This allows us to handle collisions by adding onto the new array when 
  // a new key collides with an existing key in our table. 
  for (let i = 0; i < this.storage.length; i++) {
      this.storage[i] = [];  

  // Thus, every new hash table should look like this:

  // HashTable {
  //   SIZE: 16,
  //   storage:
  //    [ [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] ] }

  }


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
  // *** I was confused about Line 33.  Isn't overwriting just another way to handle a collision?
  // For example, if the provided key is the same as the existing key, then Line 33 is asking us
  // to replace the existing key/value pair.

  // I decided to handle collisions by making each key's value an array in the hash table:

  // We will set an index that will allow us to traverse through each key's table value
  let index = 0;

  // If there are no items at the current index, then we'll set the current array element to be input value
  if (this.storage[key][index] === undefined) {
    this.storage[key][index] = value;
  // Otherwise, we'll traverse through the array until we find an open slot to place our input value
  } else {
    for (let i = 0; i < this.storage[key].length; i++) {
      if (this.storage[key][index] !== undefined) {
        ++index;
      }
    }
    this.storage[key][index] = value;
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
  // Retrieve the value stored in the hash table
  return this.storage.key;
  
  // I didn't finish this function.
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
  // If the key doesn't exist, then return undefined
  if (!this.storage.hasOwnProperty(key)) return undefined;
  
  // Remove the key/value pair with 'delete' keyword
  delete this.storage[key];
};

// Testing the hash table functionality
const hashBrowns = new HashTable();
hashBrowns.set(0, 'Hello');
hashBrowns.set(0, 'Goodbye');
console.log(hashBrowns);


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
