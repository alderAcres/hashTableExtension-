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
//run hash function to get location
let hashSet = hashCode(key, this.SIZE);
//if this location is undefined, add an object
  if(this.storage[hashSet] === undefined) {
    let newObj = {};
    this.storage[hashSet] = newObj;
    newObj[key] = value;
    return newObj;
//add a key value pair
  } else {
    this.storage[hashSet][key] = value;
    return value;
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
//run hash function to get location
let hashGet = hashCode(key, this.SIZE);

return this.storage[hashGet][key];
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

let hashRemove = hashCode(key, this.SIZE);
//need to return a value after deleting it
let hashRemoveVal = this.storage[hashRemove][key];
//return undefined if key value pair doesn't exist
if(this.storage[hashRemove] === undefined) {
  return undefined;
} else {
  delete this.storage[hashRemove][key];
  return hashRemoveVal;
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

let newTest = new HashTable();
newTest.set("casey", "Los Angeles");
newTest.set("delete", "California");
console.log(newTest.storage);
newTest.get("casey");
console.log(newTest.get("casey"));
console.log(newTest.get("delete"));
// console.log(newTest.get("casey"));
console.log(newTest.remove("delete"));
console.log(newTest.remove("delete"));//should return undefined
console.log(newTest.storage);
