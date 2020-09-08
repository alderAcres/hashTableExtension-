/* eslint-disable */
/**
* HashTable constructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
  this.count = 0;
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
  if (!this.storage[index]){
    this.storage[index] = {};
  }
  const bucket = this.storage[index];
  
  //only increment count if not overwriting
  if (!bucket.hasOwnProperty(key)) {
    this.count += 1; 
  }

  bucket[key] = value;
  return this.count;
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
  const bucket = this.storage[index];
  if (!bucket) return;

  return bucket[key];
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
  const bucket = this.storage[index];
  if (!bucket || !bucket.hasOwnProperty(key)) return;

  const value = bucket[key];
  delete bucket[key];
  this.count -= 1;
  return value;
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



///////////////////////////////
// TESTS
///////////////////////////////

const ht = new HashTable();

//
// Tests set method
//
console.log(ht.storage);

console.log(ht.set('bob', 30));
console.log(ht.storage);

console.log(ht.set('bob', 20));
console.log(ht.storage);

console.log(ht.set('linda', 40));
console.log(ht.storage);

console.log(ht.set('linda', 27));
console.log(ht.storage);

console.log(ht.set('adnil', 40));
console.log(ht.storage);


//
// Tests get method
//
console.log(ht.get('bob'));
console.log(ht.get('linda'));
console.log(ht.get('adnil'));
console.log(ht.get('adnilsssss'));
console.log(ht.get('susan'));
console.log(ht.count)


//
// Tests remove method
//
console.log(ht.count);
console.log(ht.remove('susan'));
console.log(ht.count);
console.log(ht.remove('bob'));
console.log(ht.count);
console.log(ht.remove('bob'));
console.log(ht.count);
console.log(ht.remove('adnil'));
console.log(ht.count);
console.log(ht.remove('adnilssss'));
console.log(ht.count);
console.log(ht.remove('linda'));
console.log(ht.count);
console.log(ht.remove('linda'));
console.log(ht.count);