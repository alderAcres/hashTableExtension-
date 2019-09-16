/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.NUM = 0;
  
  this.storage = new Array(this.SIZE);

  // initialize each slot in the hash array as an empty object
  // takes up a bit more memory up-front, but improves program run-time
  for (let i = 0; i < this.SIZE; i += 1) {
    this.storage[i] = {};
  }
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
  // store unique key/value pairs within object at the corresponding bucket in the hash table's storage array
  // storing the key/value pairs within objects allows for easy collision handling
  this.storage[hashCode(key, this.SIZE)][key] = value;
  this.NUM += 1;
  return ('hash was set! Num is now: ' + this.NUM);
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
  return this.storage[hashCode(key, this.SIZE)][key];
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
  if (this.storage[hashCode(key, this.SIZE)][key] === undefined) return undefined;

  delete this.storage[hashCode(key, this.SIZE)][key];
  this.NUM -= 1;
  return ('hash deleted! Num is now: ' + this.NUM);


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

const hash = new HashTable;

//* TESTING
console.log('CHECK HASH CODES');
console.log('aba', hashCode('aba', 16));
console.log('lbqasdsa', hashCode('lbqasdsa', 16));
console.log('lbq', hashCode('lbq', 16));
console.log('')

console.log('CHECK HASH SETTING');
console.log(hash);
console.log(hash.set('lbqasdsa', 5));
console.log(hash);
console.log(hash.set('lbq', 9));
console.log(hash);
console.log(hash.set('aba', 'a'));
console.log(hash);
console.log('');

console.log('CHECK HASH GETTING');
console.log('lbq', hash.get('lbq'));
console.log('lbqasdsa', hash.get('lbqasdsa'));
console.log(hash);
console.log('');

console.log('CHECK HASH REMOVAL');
console.log(hash.remove('lbq'));
console.log(hash);
console.log(hash.remove('lbqasdsa'));
console.log(hash);
console.log(hash.remove('hyu'));
console.log(hash.remove('lbq'));