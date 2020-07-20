

// PASTE AND MODIFY YOUR CODE BELOW
/* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.count = 0;
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
HashTable.prototype.set = function (key, value) {
  if (this.count >= this.SIZE * 0.75) return this.double(key, value);

  const hashKey = hashCode(key, this.SIZE);
  if (!this.storage[hashKey]) {
    this.storage[hashKey] = {};
  }
  this.storage[hashKey][key] = value;
  this.count++;
};

HashTable.prototype.double = function (key, value) {
  // double this size
  // this.SIZE = this.SIZE*2;
  // create new storage with the new size 
  let newStorage = new Array(this.SIZE*2);
  // iterate through each index on old storage and assign new key/value pairs to their appropriate indexes on new storage
  for (let obj of this.storage) {
    if (obj) {
      Object.keys(obj).forEach(k => {
        // console.log(obj);
        const hashKey = hashCode(k, this.SIZE*2)
        newStorage[hashKey] = {};
        newStorage[hashKey][k] = this.storage[hashCode(k, this.SIZE)][k];
      })
    }
  }
  // set old storage equal to new storage
  this.storage = newStorage;
  this.SIZE = this.SIZE * 2;
  
  return this.set(key, value);
}

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
HashTable.prototype.get = function (key) {
  const hashKey = hashCode(key, this.SIZE);
  return this.storage[hashKey][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  if (this.count <= this.SIZE * 0.25) return this.halve(key);

  const hashKey = hashCode(key, this.SIZE);
  if (!this.storage[hashKey]) return undefined;

  const removed = this.storage[hashKey][key];
  delete this.storage[hashKey][key];
  this.count--;
  return removed;
};

HashTable.prototype.halve = function (key) {
  // create new storage with the new size 
  let newStorage = new Array(this.SIZE/2);
  // iterate through each index on old storage and assign new key/value pairs to their appropriate indexes on new storage
  for (let obj of this.storage) {
    if (obj) {
      Object.keys(obj).forEach(k => {
        // console.log(obj);
        const hashKey = hashCode(k, this.SIZE*2)
        newStorage[hashKey] = {};
        newStorage[hashKey][k] = this.storage[hashCode(k, this.SIZE)][k];
      })
    }
  }
  // set old storage equal to new storage
  this.storage = newStorage;
  this.SIZE = this.SIZE/2;
  
  return this.remove(key);
}

// Do not modify
function hashCode(string, size) {
  // eslint-disable-next-line strict
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// YOUR CODE ABOVE

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

hashTable.set('value 1', 1);
hashTable.set('value 2', 2);
hashTable.set('value 3', 3);
hashTable.set('value 4', 4);
hashTable.set('value 5', 5);
hashTable.set('value 6', 6);
hashTable.set('value 7', 7);
hashTable.set('value 9', 9);
hashTable.set('value 8', 8);
hashTable.set('value 10', 10);
hashTable.set('value 11', 11);
hashTable.set('value 12', 12);
hashTable.set('value 13', 13);
// hashTable.set('value 14', 14);
hashTable.remove('value 13');
hashTable.remove('value 12');
hashTable.remove('value 11');
hashTable.remove('value 10');
hashTable.remove('value 9');
hashTable.remove('value 7');
// hashTable.remove('value 6');
// hashTable.remove('value 5');
// hashTable.remove('value 4');
// hashTable.remove('value 3');
// hashTable.remove('value 8');




console.log(hashTable.storage);
console.log(hashTable.SIZE)
console.log(hashTable.count);
