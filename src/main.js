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
  //find the index where the information will be stored by calling the hashCode function with the key name and size of HashTable obj as arguments
  const index = hashCode(key, this.SIZE)
  // check and see if that index already has a value in it
  // if not place an object literal in the index
  if (!this.storage[index]) this.storage[index] = {};
  // assign the key/value pair to the object literal
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
HashTable.prototype.get = function(key) {
  // iterate through the contents of the HashTable obj
  for (let obj of this.storage) {
    // console.log(obj)
    // if key is contained in the current hashed address, return that key's stored value 
    if (obj) {
      if (obj[key]) return obj[key];
    }
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
  // iterate through the contents of the HashTable obj
  for (let obj of this.storage) {
    // if key is found in any of the objects, delete it and its value and return the value
    if (ob) {
      if (obj[key]) {
        let val = obj[key];
        delete (obj[key]);
        return val;
      }
    }
  }
  // if the key/value pair was not found, return undefined
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


const testHash = new HashTable();

testHash.set('Greeting', 'Hello!');
testHash.set('Pleasantry', 'How do you do?')
testHash.set('rgreeting', 'repeated index?, no')
testHash.set('greeting', 'repeated index?, yes')
console.log(testHash);
// console.log(testHash.get('Pleasantry'))
testHash.set('Pleasantry');
console.log(testHash);
console.log(testHash.set('test'));

// Do not remove!!
module.exports = HashTable;
