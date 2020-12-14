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
  this.numItems = 0;
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
  const bucket = hashCode(key, this.SIZE);
  let isNewKey = true;

  if (this.storage[bucket]) {
    if (this.storage[bucket][key] !== undefined) {
      isNewKey = false;
    }
    this.storage[bucket][key] = value;
  } else {
    this.storage[bucket] = {
      [key]: value
    };
  }

  if (isNewKey) this.numItems++;
  return this.numItems;
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
  const bucket = hashCode(key, this.SIZE);

  if (this.storage[bucket] && this.storage[bucket][key] !== undefined){
    return this.storage[bucket][key];
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
  const bucket = hashCode(key, this.SIZE);

  if (this.storage[bucket] && this.storage[bucket][key] !== undefined) {
    const valueToDelete = this.storage[bucket][key];
    delete this.storage[bucket][key];
    this.numItems--;
    return valueToDelete;
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

// TESTING
const myTable = new HashTable();
console.log(myTable.set('name', '0'));
console.log(myTable.numItems);

console.log(myTable.set('name', 'Shelby'));
console.log(myTable.numItems);

console.log(myTable.set('location', 'New York'));
console.log(myTable.numItems);

console.log(myTable.get('location'));

console.log(myTable.remove('location'));
console.log(myTable.get('location'));
console.log(myTable.numItems);

console.log(myTable.get('age'));
console.log(myTable.remove('age'));
