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
  // add numStored property to HashTable in order to keep track of the number of items stored in table
  this.numStored = 0;
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
  // use if statement to check if key is a string and value is not null or undefined
  if (typeof key !== 'string' || value === null || value === undefined) return undefined;
  // declare a variable and set it to the value of the invoked hashCode function
  const hashKey = hashCode(key, this.SIZE);
  // use an if statement to check if the storage array at the hashKey index already has an object
    // if not, create an empty object
  if (this.storage[hashKey] === undefined) this.storage[hashKey] = {};
  // use if statement to check if the key is already in this.storage
    // if not, then increment this.numStored
  if (!this.storage[hashKey][key]) this.numStored++;
  // add the key value pair
  this.storage[hashKey][key] = value;
  // return this.numStored
  return this.numStored;
};

// const Test = new HashTable();
// console.log(Test.set('name', 'Brian'));
// console.log(Test.set('name', 'Jack'));
// console.log(Test.set('Name', 'Terry'));
// console.log(Test.set('age', 28));
// console.log(Test.set('boolean', true));
// console.log(Test.set(true, 'key is not a string'));
// console.log(Test.set('undefined', undefined));
// console.log(Test.set('null', null));
// console.log(Test);


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
  // use if statement to check if key is a string
  if (typeof key !== 'string') return undefined;
  // declare a variable and set it to the value of the invoked hashCode function
  const hashKey = hashCode(key, this.SIZE);
  // use if statement to check if hashKey or key exists in this.storage
    // if not, then return undefined
  if (!this.storage[hashKey] || !this.storage[hashKey][key]) return undefined;
  // return this.storage at index hashKey and property key
  return this.storage[hashKey][key];
};

// console.log(Test.get('name'));
// console.log(Test.get(undefined));
// console.log(Test.get(23));
// console.log(Test.get('location'));


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // use if statement to check if key is a string
  if (typeof key !== 'string') return undefined;
  // declare a variable and set it to the value of the invoked hashCode function
  const hashKey = hashCode(key, this.SIZE);
  // use if statement to check if hashKey or key exists in this.storage
  // if not, then return undefined
  if (!this.storage[hashKey] || !this.storage[hashKey][key]) return undefined;
  // declare a variable 'value' to store the value of key in this.storage
  const value = this.storage[hashKey][key];
  // delete key from this.storage
  delete this.storage[hashKey][key];
  // decrement this.numStored
  this.numStored--;
  // return value variable
  return value;
};

// console.log(Test.numStored);
// console.log(Test.remove('Name'));
// console.log(Test.remove('Name'));
// console.log(Test.remove(null));
// console.log(Test.numStored);

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
