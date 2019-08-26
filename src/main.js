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
  const position = hashCode(key, this.SIZE);
  // when certain position in hash table holds nothing
  if(!this.storage[position]) {
    // we add new obj with passed key and value to the position
    let tempObj = {}
    tempObj[key] = value;
    this.storage[position] = tempObj;
  }
  // handles collision
  else {
    // we add new obj to the existing obj in the position of hash table
    this.storage[position][key] = value;
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
  const position = hashCode(key, this.SIZE);
  if(!this.storage[position]) {
    console.log('No value for the passed key. Please try again.');
    return;
  } else {
    return this.storage[position][key];
  }
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
  const position = hashCode(key, this.SIZE);
  // when the key does not exist in the hash table
  if(!this.storage[position] || !this.storage[position][key]) {
    return undefined;

    // when there is only one key value pair in the objet
  } else if(Object.keys(this.storage[position]).length === 1){
    let returnObj = this.storage[position];
    this.storage[position] = undefined;
    return returnObj;
  } else { // when there are multiple key value pairs in the object
    let returnObj = {};
    returnObj[key] = this.storage[position][key];
    delete this.storage[position][key];
    return returnObj;
  }
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

// Test Cases:
// let hash = new HashTable;
// hash.set('d', 'got');
// hash.set('15', 20);
// hash.set('hello', 'world');
// console.log(hash.storage);
// console.log(hash.get('d'));
// console.log(hash.get('good'));
// console.log(hash.remove('hello'));
// console.log(hash.storage);
// console.log(hash.remove('15'));
// console.log(hash.storage);
// console.log(hash.remove('15'));


// Do not remove!!
module.exports = HashTable;
