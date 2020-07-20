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

let newTable = new HashTable();

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
  //create index to store [key, val] pair
  let hashed = hashCode(key, this.SIZE);
  //if there's no value @ index, create an empty object to store future k,v pairs. This will handle collisions.
  if (!this.storage[hashed]) {
    this.storage[hashed] = {};
    this.storage[hashed][key] = value;
  }
  //if there is a value that is different than key, add it to this.storage[hashed];
  for (let prop in this.storage[hashed]) {
    if (!prop === key) {
      this.storage[hashed][key] = value;
    }
     //if the key already exists, rewrite to the new k, v pair.
    else {
      this.storage[hashed][key] = value;
    }
  }
   //return ?? this.storage[hashed] ??
  return this.storage[hashed];
 
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
  //create index to locate k, v pair
  let hashed = hashCode(key, this.SIZE);
  //if key doesn't exist, return undefined;
  if (!this.storage[hashed]) return undefined;
  //else return the value at that key.
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
//create index to locate key
  let hashed = hashCode(key, this.SIZE);
//if k,v pair does not exist in this.storage, return undefined.
  if (!this.storage[hashed][key]) return undefined;
  //else create a variable and initialize to k,v pair
  let removed = this.storage[hashed][key];
  // delete this.storage[hashed][key];
  delete this.storage[hashed][key];
  // return remove;
  return removed;
};

console.log(newTable.set('garbage', 20))
console.log(newTable.set('barber', 11))
console.log(newTable)
console.log(newTable.set('barber', 3))
console.log(newTable.set('tree', 12))
console.log(newTable.set('water', 2))
console.log(newTable.set('fire', 5));
console.log(newTable.set('ogre', 1));
console.log(newTable)
console.log(newTable.get('garbage'))
console.log(newTable.remove('bleep'))
console.log(newTable.remove('water'))
console.log(newTable)
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
