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
  let hashKey = hashCode(key, this.SIZE);
  if (!this.storage[hashKey]) { //if it doesnt exist
    let obj = {};
    obj[key] = value; //create new obj to store
    this.storage[hashKey] = obj; //is this.SIZE affected?
    return this.items+=1;
  } else { //create object, adds one item to the HashTable
    this.storage[hashKey][key] = value;
    return this.items+=1;
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
HashTable.prototype.get = function(key) { //hash tables are O(1) so we don't need a for loop
  let hash = this.storage[hashCode(key, this.SIZE)];
  if(hash[key]) {
    return hash[key];
  } else {
    throw 'does not exist';
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
  let hash = this.storage[hashCode(key, this.SIZE)]
  if (hash[key]) {
    let output = hash[key];
    delete hash[key];
    this.items-=1;
    return output;
  } else {
    return hash[key]; //should just be undefined
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

// Do not remove!!
module.exports = HashTable;

const newHash = new HashTable();
console.log(newHash);
console.log(newHash('brad', 100));