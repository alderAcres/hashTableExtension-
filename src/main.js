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
  //declare a variable with the label hasIndex and set it to the result of passing in hashcode;
    const hashIndex = hashCode(value, this.SIZE);
  //conditional statement to check if there is already an index item
  if (this.storage[hashIndex] === undefined) {
    // if not we are going to create position add the new key/value pair to the empty location
      this.storage[hashIndex] = {};
      //add value to that created position
      this.storage[hashIndex][key] = value;
  }
  else {
    // if there is already an item at that location we are going to add the new values to them.
    this.storage[hashIndex][key] = value;
  }
};

// const checker = new HashTable();
// checker.set(5, "there");
// checker.set(1, "Hello");
// console.log(checker);

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
  // declare const var with label of HashIndex and assign it to the result of calling hashCode with key/this.SIZE being passed.
  const hashIndex = hashCode(key, this.SIZE);
  //return requested index
  return this.storage[hashIndex][key];
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
  // declare const var with label of HashIndex and assign it to the result of calling hashCode with key/this.SIZE being passed.
  const hashIndex = hashCode(key, this.SIZE);
  // declare const var with label of remover and assign it to the arg key to return later.
  const remover = this.storage[hashIndex][key];
  // delete that element from the index
  delete this.storage[hashIndex][key];
  // return our delcared var remover.
  return remover;

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

const checker = new HashTable();
checker.set(5, "there");
checker.set(1, "Hello");
console.log(checker);
console.log(checker.get(0))

// Do not remove!!
module.exports = HashTable;
