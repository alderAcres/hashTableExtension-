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
  let index = hashCode(key, this.SIZE);
  console.log(index);
  const hashArray = this.storage;
  // check to see if there are any entries. if not, create new arrays and push in inputs of key and value
  if (!Array.isArray(hashArray[index])) {
    const keyValueArray = [];
    const keys = [];
    const values = [];
    keys.push(key);
    values.push(value);
    keyValueArray.push(keys, values);
    hashArray[index] = keyValueArray;
  } else {
    // if entries exist, push into existing the input key and value
    hashArray[index][0].push(key);
    hashArray[index][1].push(value);
  }
  console.log(hashArray);
};

const hashTable = new HashTable();

console.log(hashTable.set('hello', 'firstkey'));
console.log(hashTable.set('world', 'secondkey'));

console.log(hashTable);

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
  let index = hashCode(key, this.SIZE);
  const hashArray = this.storage;
  // find the index of the key to access in value array
  let indexOfKey = hashArray[index][0].indexOf(key);
  return hashArray[index][1][indexOfKey];
};

console.log(hashTable.get('hello')); // 'firstkey'
console.log(hashTable.get('world')); // 'secondkey'

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let index = hashCode(key, this.SIZE);
  const hashArray = this.storage;
  // get index of the key and value pair and store in variable
  let indexOfKey = hashArray[index][0].indexOf(key);
  let removedValue = hashArray[index][1][indexOfKey];
  // delete pair using splice
  hashArray[index][0].splice(indexOfKey, 1);
  hashArray[index][1].splice(indexOfKey, 1);
  // return the store value variable
  return removedValue;
};

console.log(hashTable.remove('world')); // 'secondkey'


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
