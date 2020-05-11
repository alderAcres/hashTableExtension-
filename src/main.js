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
  
  const code = hashCode(key, this.SIZE)

   // if there is nothing there, add empty object w key & value
  if(!this.storage[code]) this.storage[code] = {};

  // add the key value pair
  this.storage[code][key] = value;

  return 1;
}

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
  
  const code = hashCode(key, this.SIZE);

  // note: returns undefined if key not found
  return this.storage[code][key];     
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

  const code = hashCode(key, this.SIZE);
  let retVal = undefined;; 

  if(this.storage[code][key]) {
    retVal = this.storage[code][key];
    delete this.storage[code][key];
  }
  return retVal;
};


let table = new HashTable();
// table.set('john', 5);
// table.set('bob', 6);
// console.log(table);
// console.log(table.get('john'));
// console.log(table.get('bob'));
// console.log(table.get('zeke'));
// console.log("remove bob results: ", table.remove('bob'));
// console.log(table.get('john'));
// console.log(table.set('bob', 10));
// console.log(table.get('bob'));
// console.log(table);

// test for collisions 
// for (let i = 0; i < 50; i++) {
//   const key = 'key' + i;
//   const value = 'value' + i;
//   table.set(key, value);
//   console.log(`${key}, ${value}, get returns: ${table.get(key)}`);
// }
// for (let i = 0; i < 50; i++) {
//   const key = 'key' + i;
//   const value = 'value' + i;
//   console.log(`${key}, ${value}, get returns: ${table.get(key)}`);
// }
// console.log(table);


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
