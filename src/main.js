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
  // figure out the index where we want to store this key/value pair by running the key through the hashing function
  const index = (hashCode(key, this.SIZE));
  // if an object doesn't exist at this index yet, create an empty object at the index
  if (typeof this.storage[index] !== 'object') {
    this.storage[index] = {};
  }
  // in the object, add/overwrite the key value pair
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
HashTable.prototype.get = function (key) {
  // run key through hashing function to get index
  const index = (hashCode(key, this.SIZE));
  return this.storage[index][key];
}

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // run key through hashing function to get index
  const index = (hashCode(key, this.SIZE));
  // check whether the key/value pair exists
  if (this.storage[index][key]) {
    const saved = key;
    delete this.storage[index][key];
    return saved;
  }
  return undefined;
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

// TESTS
// setting
// console.log(hashCode('test', 16)); // gives us 2
// console.log(hashCode('great', 16)); // gives us 13
// console.log(hashCode('another one', 16)); // gives us 7
// const table = new HashTable();
// table.set('test', 'it\'s working!');
// table.set('great', 'I should be at index 12');
// table.set('another one', 'am I at index 6?');
// console.log(table);

// getting
// const table = new HashTable();
// table.set('test', 'it\'s working!');
// table.set('great', 'I should be at index 12');
// table.set('another one', 'am I at index 6?');
// console.log(table.get('test'));

// deleting
// const table = new HashTable();
// table.set('test', 'it\'s working!');
// table.set('great', 'I should be at index 12');
// table.set('another one', 'am I at index 6?');
// console.log(table.remove('test'));
// console.log(table.remove('test'));
