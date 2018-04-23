/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.length = 0;
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
  const code = hashCode(key, this.SIZE);
  if (this.storage[code]) {
    this.storage[code][key] = value;
  } else {
    const tempObj = {}
    tempObj[key] = value;
    this.storage[code] = tempObj;
    this.length++;
  }
  return this.length;
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
  const code = hashCode(key, this.SIZE);
  if (!this.storage[code]) return undefined;
  for (let a in this.storage[code]) {
    if (key === a) {
      return this.storage[code][a];
    }
  }
  return undefined;
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
  const code = hashCode(key, this.SIZE);
  if (!this.storage[code]) return undefined;
  for (let a in this.storage[code]) {
    if (key === a) {
      const tempValue = this.storage[code][a];
      delete this.storage[code][a];
      return tempValue;
    }
  }
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

// Do not remove!!
module.exports = HashTable;


let hash1 = new HashTable;
hash1.set("apple", "iphone");
hash1.set("google", "pixel");
console.log(hash1.set("samsung", "galaxy"));
console.log(hash1.storage[10]);
console.log(hash1.get("google"));
hash1.remove("google");
hash1.remove("apple");
console.log(hash1);
