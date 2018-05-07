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
  let hash = new hashCode('string', this.size); 
  console.log(hash);
  if(!this.storage[hash]) {
    // hash does not exist already
     // add to storage array with the key as the index and insert the value 
    this.storage[hash][key] = value;
  } else {
    // hash does exist 
    // need to add another value to the same hash/bucket/index of the this.storage array 
      // create an object which can hold multiple values
      // add key to the obj with new value (as we can overwrite)

    this.storage[hash] = {};
    this.storage[hash][key] = value;

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
  if (Object.keys(this.storage[hash]) === 1) {
    // can't measure the length of on object, so put all the keys at that specified hash into an array
     // check if length of the array is 1, if so return the only key 
    return this.storage[hash][key];
  } else if (Object.keys(this.storage[hash]) > 1) {
    // if we have multiple keys stored in the object which the hash is pointing to, need to get that specific key
    return this.storage[hash][key]; 
  } else {
    // the hash points to an empty object, so there are no keys inside of it 
    return undefined;
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
  // in order to remove a value, we remove a key (or overwrite the value with a new one)
  // in order to remove a key, we have to find it first 
    // if the key is inside of an object, we can use the 'delete' keyword to remove it
      // we don't have to adjust the indexes of other key/value pairs stored inside the obj? 
    // if the key is stored at the hash without other keys, we need to remove it from the array  

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

var test = new HashTable();
console.log(test);
// console.log(test.set('key', 5));
