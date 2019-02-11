/**
* HashTable costructor
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
HashTable.prototype.set = function(key, value) {
  let hash = hashCode(key, this.SIZE);
  // if there is collision
  if (this.storage[hash]) {
    this.storage[hash][key] = value;
  // no collision, create new object and add
  } else {
    this.storage[hash] = {};
    this.storage[hash][key] = value;
  }
  // add to and return value of stored items
  return ++this.count;
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
  let hash = hashCode(key, this.SIZE);
  if (this.storage[hash] === undefined) return undefined;
  else return this.storage[hash][key];
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
  let hash = hashCode(key, this.SIZE);
  let value = this.get(key);
  if (value === undefined) {
    return value;
  } else {
    delete this.storage[hash][key];
    this.count--;
    return value;
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

// tests

// console.log(hashCode('ab', 16));  // hash of 'ab' should collide with hash of 'bc'
// console.log(hashCode('bc', 16));
// console.log(hashCode('c', 16));
// console.log(hashCode('d', 16));

// let hashtable = new HashTable;
// hashtable.set('ab', 1);
// hashtable.set('bc', 2);
// hashtable.set('c', 3);
// hashtable.set('d', 4);
// hashtable.set('e', 5);
// // hashtable.set('f', 6);
// // hashtable.set('g', 7);
// // hashtable.set('h', 8);
// // hashtable.set('i', 9);

// console.log('count: ', hashtable.count);
// console.log(hashtable.get('ab'));
// console.log(hashtable.get('bc'));
// console.log(hashtable.get('c'));
// console.log(hashtable.get('d'));
// console.log(hashtable.get('e'));
// console.log('removed value: ', hashtable.remove('d'));
// console.log(hashtable.get('d'));
// console.log('count: ', hashtable.count);
// console.log('removed value: ', hashtable.remove('ab'));
// console.log('count: ', hashtable.count);
// console.log(hashtable.get('bc'));