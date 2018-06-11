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
  this.items = 0;
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
  const hash = hashCode(key, this.SIZE);
  
  // if no store at hash, create the store
  if (!this.storage[hash])
    this.storage[hash] = {};
  
  const store = this.storage[hash];
  // if store doesn't already have the key, increment this.items
  if (!store.hasOwnProperty(key))
    this.items++;
  
  store[key] = value;
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
  const hash = hashCode(key, this.SIZE);
  const store = this.storage[hash];
  
  // if no store at hash, return
  if (!store)
    return;
  
  return store[key];
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
  const hash = hashCode(key, this.SIZE);
  const store = this.storage[hash];
  
  // if no store at hash, return
  if (!store)
    return;
  
  // if store doesn't have key, return
  if (!store.hasOwnProperty(key))
    return;
  
  const results = store[key];
  delete store[key];
  // if store becomes empty an empty object, completely remove the store object from the storage array
  if (Object.keys(store).length === 0)
    delete this.storage[hash];
  
  this.items--;
  return results;
};

// tests

/*
const x = new HashTable();
*/

/*
console.log('add only 1 element tests');
console.log(x.set('a', 30)); // 1
console.log(x.get('a')); // 30
console.log(x.get('b')); // undefined
console.log(x.remove('a')); // 30
console.log(x.remove('a')); // undefined
console.log(x.remove('b')); // undefined
console.log(x.get('b')); // undefined
console.log(x.remove('b')); // undefined
console.log(x.items); // 0

console.log('add 3 elements tests');
console.log(x.set('a', 20)); // 1
console.log(x.set('b', 40)); // 2
console.log(x.set('c', 50)); // 3
console.log(x.get('b')); // 40
console.log(x.remove('b')); // 40
console.log(x.remove('b')); // undefined
console.log(x.set('d', 60)); // 3
console.log(x.set('b', 30)); // 4
console.log(x.remove('a')); // 20
console.log(x.remove('b')); // 30
console.log(x.remove('b')); // undefined
console.log(x.get('b')); // undefined
console.log(x.remove('c')); // 50
console.log(x.remove('d')); // 60
console.log(x.items); // 0

console.log('reset value tests');
console.log(x.set('a', 20)); // 1
console.log(x.set('a', 20)); // 1
console.log(x.set('a', 20)); // 1
console.log(x.get('a')); // 20
console.log(x.set('b', 30)); // 2
console.log(x.set('b', 30)); // 2
console.log(x.get('b')); // 30
console.log(x.remove('a')); // 20
console.log(x.remove('b')); // 30
console.log(x.get('a')); // undefined
console.log(x.get('b')); // undefined
console.log(x.items); // 0
*/

/*
console.log('many elements');
for (let i = 0; i < 20; i++) {
  console.log(x.set(i, 10 * i)); // i + 1
}
for (let i = 0; i < 20; i++) {
  console.log(x.remove(i)); // 10 * i
  console.log(x.remove(i)); // undefined
}
console.log(x.items); // 0
*/

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
