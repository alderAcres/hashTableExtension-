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
  let encoded = hashCode(key, this.SIZE);
  if (this.storage[encoded] === undefined){
    this.storage[encoded] = {};
    this.storage[encoded][key] = value;
  } else{
    this.storage[encoded][key] = value;
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
  let encoded = hashCode(key, this.SIZE);
  return this.storage[encoded][key];
};

/**
* remove - delete a key/value pair from the hash table
* delete operator
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let encoded = hashCode(key, this.SIZE);
  let returnValue;
  if (this.storage[encoded] === undefined || Object.keys(this.storage[encoded]).indexOf(key) === -1){
    return undefined;
  } else{
    returnValue = this.storage[encoded][key];
    delete this.storage[encoded][key]
  }
  return returnValue;
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
let tester = new HashTable();
tester.storage[0] = {"test3" : "This is a collision", "testingCollision":"collide"};
tester.set("test1", "success");
tester.set("test2", "helloWorld");
tester.storage[0]["afterCollision"] = "This is just a test";

console.log(tester.storage);
console.log(tester.get("test2"));
console.log(tester.remove('test2'));
console.log(tester.storage);
console.log(tester.remove("hello"));

// Do not remove!!
module.exports = HashTable;
