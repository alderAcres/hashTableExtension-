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
  //first, we'll run hashcode on the key and save that as a variable
let element = hashCode(key, this.SIZE);
// to handle collisions, we'll want every this.storage to have an object that holds key/value pairs
if (this.storage[element] === undefined) {
  this.storage[element] = {};
}
//finall, we'll save our key-value pair within said object
this.storage[element][key] = value;
};

let test = new HashTable();
test.set("key", "value")
test.set(0, 0)
test.set(0,true)
console.log(test)

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
  //first we will convert our key into hashcode
  let element = hashCode(key, this.SIZE);
  //then we'll check if a storage object at that element exists. Specifically checking for undefined is a little
  //  verbose but elimintates edge cases where the key is 0 or null. Returns error message if no key is found.
  if(this.storage[element] === undefined) {
    return "Error: There is no value associated with that key";
  }
  //otherwise returns the associated value
  else {
    return this.storage[element][key];
  }
};

console.log(test.get("key"))


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  //Not to repeat myself but first we need to run the key through hashcode.
  let element = hashCode(key, this.SIZE);
  //then we need to check if the associated key-value pair exists, otherwise it could break the function.
  //if it does, we use delete to remove the key-value pair from the hash's object
  if(this.storage[element] !== undefined) {
    delete this.storage[element][key];
  }
  else {
    return "Error: There is no value associated with that key";
  }
};

test.remove("key")
console.log(test)


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
