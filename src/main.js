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
  const index = hashCode(key, this.SIZE);
  if (this.storage[index] === undefined) {
    const newObj = {};
    newObj[key] = value;
    this.storage[index] = newObj;
    this.items++;
  } else {
      if (!this.storage[index][key]) this.items++;
      this.storage[index][key] = value;
  }
  
  return this.items;
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
  if (this.storage[index] === undefined) {
    return null;
  } else {
    return this.storage[index][key];
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
  const index = hashCode(key, this.SIZE);
  if (this.storage[index] === undefined) {
    return undefined;
  } else {
    
    const temp = this.storage[index][key];
    delete this.storage[index][key];
    this.items--;
    return temp;
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

const hashTable = new HashTable();

hashTable.set('robb', 37);
console.log('number of items is', hashTable.items);
console.log(hashTable.set('robb', 38));
console.log('number of items is', hashTable.items);
hashTable.set('lindsey', 35);
console.log('number of items is', hashTable.items);
console.log(hashTable);
console.log(hashTable.remove('lindsey'));
console.log('number of items is', hashTable.items);
console.log(hashTable);
hashTable.set('lindsey', 35);
console.log(hashTable);
console.log('number of items is', hashTable.items);