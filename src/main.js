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
  const index = hashCode(key, this.SIZE);

  if (this.storage[index] === undefined) {
    this.storage[index] = {};
    this.storage[index][key] = value;
  } else {
    this.storage[index][key] = value;
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
  const index = hashCode(key, this.SIZE);

  return this.storage[index][key];
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
  const index = hashCode(key, this.SIZE);
  const deletedKey = this.storage[index][key];
  delete this.storage[index][key];
  return deletedKey;
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





// Create new instance of hashtable
const table = new HashTable;

// Add some key-value pairs to table
table.set("dog", "sweet");
table.set("New York", "raining");
table.set("cookies", "yum");
table.set("a", "apple");
table.set("b", "bear");
table.set("Codesmith", "awesome");

// See what table looks like - check if .set function working 
// also check for any collisions
console.log(table);

// check that get function is working 
console.log(table.get("dog"));
console.log(table.get("cookies"));

// check remove function 
console.log(table.remove("New York"));

// see if remove function removed key from table 
console.log(table);



// Do not remove!!
module.exports = HashTable;
