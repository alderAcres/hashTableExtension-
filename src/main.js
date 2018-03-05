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
  let i = hashCode(key, this.SIZE);
  if (this.storage[i] == undefined) {
    this.storage[i]= {};
    this.storage[i][key] = value;
  } else {
    this.storage[i][key] = value;
  }
};
myHash = new HashTable();
myHash.set("food", 6);
myHash.set("sad", 15);
myHash.set("fd", 15);
console.log(myHash.storage);

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
  let i = hashCode(key, this.SIZE);
  return this.storage[i][key];
};

console.log(myHash.get("food"));
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let i = hashCode(key, this.SIZE);
  // if key exists in the hash table
  if (this.storage[i][key]) {
    let retVal = this.storage[i][key];
    delete this.storage[i][key];
    return retVal
  }
};
myHash.remove("fd");
console.log(myHash);


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

myHash = new HashTable();
myHash.set("apple", 6);
myHash.set("banana", 15);
myHash.set("carrot", 15);
myHash.set("dragon", 6);
myHash.set("elephant", 15);
myHash.set("farm", 15);
myHash.set("grandma", 6);
myHash.set("hello", 15);
myHash.set("igloo", 15);
myHash.set("joker", 6);
myHash.set("kang", 15);
myHash.set("llama", 15);
myHash.remove("llama");
// myHash.set("monster", 6);
// myHash.set("nest", 15);
// myHash.set("orphan", 15);
// myHash.set("paul", 6);
// myHash.set("quirks", 15);
// myHash.set("raccoon", 15);
console.log(myHash)

// Do not remove!!
module.exports = HashTable;
