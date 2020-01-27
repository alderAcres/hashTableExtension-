/* eslint-disable func-names */
/* eslint-disable no-plusplus */
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
  this.amount = 0;
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
  if (key === undefined || value === undefined) throw Error('Usage: <hashtablename>.set(key, value)');
  // set a const eqaul to hash value of key
  const hash = hashCode(key, this.SIZE);
  // if hashtable location of key isn't intitialized, set equal to object
  if (!this.storage[hash]) this.storage[hash] = {};
  // set a KEY, VALUE pair of object at location HASH in hashtable
  this.storage[hash][key] = value;
  // return amount of items stored in hashtable
  return this.amount++;
};

const hasher = new HashTable();
hasher.set('hi', 0);
hasher.set('bye', 1);
hasher.set(0, 'hello');
console.log(hasher);

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
  if (key === undefined) throw Error('Usage: <hashtablename>.get(<yourkey>)');
  // set a const eqaul to hash value of key
  const hash = hashCode(key, this.SIZE);
  // check to see if value with entered key exists in hashtable
  if (!this.storage[hash] || !this.storage[hash].hasOwnProperty(key)) return `No value with KEY: '${key}' exists in hashtable.`;
  // return the value located at the hashtable position of HASH with KEY as the property
  return this.storage[hash][key];
};

console.log(hasher.get('hi'));
console.log(hasher.get(0));

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  if (key === undefined) throw Error('Usage: <hashtablename>.remove(<yourkey>)');
  // set a const eqaul to hash value of key
  const hash = hashCode(key, this.SIZE);
  // check to see if value with entered key exists in hashtable
  if (!this.storage[hash] || !this.storage[hash].hasOwnProperty(key)) return undefined;
  // store value of key, value pair to be removed
  const deleted = this.storage[hash][key];
  // delete the key, value pair at the location of KEY hashed in hashtable
  delete this.storage[hash][key];
  this.amount--;
  if (Object.keys(this.storage[hash]).length === 0) this.storage[hash] = undefined;
  // return DELETED
  return deleted;
};

console.log(hasher.remove('hi'));
console.log(hasher);
console.log(hasher.get('hi'));

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
