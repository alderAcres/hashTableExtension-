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

  this.size = 0;
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
  // conditional for collision
  const newHashCode = hashCode(key, this.SIZE);

  if (this.storage[newHashCode] === undefined) {
    this.storage[newHashCode] = value;
  } else if (Array.isArray(this.storage[newHashCode])) {
    this.storage[newHashCode].push(value);
  } else {
    // code for collision --  should have made it an object instead of array for key/value pairs..
    const temp = this.storage[newHashCode];
    delete this.storage[newHashCode];
    this.storage[newHashCode] = [];
    this.storage[newHashCode].push(temp);
    this.storage[newHashCode].push(value);
  }
  this.size += 1;
  return this.size;
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
  const getCode = hashCode(key, this.SIZE);

  if (!Array.isArray(this.storage[getCode])) {
    return this.storage[getCode];
  } else { // for collisions -- should have made an object for key value pairs
    return this.storage[getCode];
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
  const hashRemove = hashCode(key, this.SIZE);
  let returnedValue;

  if (this.storage[hashRemove] === undefined) {
    return undefined;
  }
  returnedValue = this.storage[hashRemove];
  this.size -= 1;
  delete this.storage[hashRemove];
  return returnedValue;
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

// Tests
const hashTable = new HashTable();

console.log(hashTable.set('tell', 0));
console.log(hashTable.set('me', 1));
console.log(hashTable.set('me', 2));
console.log(hashTable.set('how', 3));

console.log(hashTable);

console.log(hashTable.get('tell'));
console.log(hashTable.get('me'));
console.log(hashTable.get('how'));

console.log(hashTable.remove('tell'));
console.log(hashTable.remove('me'));
console.log(hashTable.remove('how'));
console.log(hashTable.remove('not'));

console.log(hashTable);

// Do not remove!!
module.exports = HashTable;
