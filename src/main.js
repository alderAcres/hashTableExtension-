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
  let hashStorageNum = hashCode(key, this.SIZE);
  //TEST TO SEE hashStorageNum IS WORKING
  console.log(this.hashStorageNum);
  if (this.storage[hashStorageNum] === undefined) { this.storage[hashStorageNum] = { }; }
  this.storage[hashStorageNum][key] = value;
  console.log(this.storage[hashStorageNum][key]);
};
// TEST
const testFunction = new HashTable();
testFunction.set('dog', 'Mr. Ruffles');
testFunction.set('cat', 'whiskers');
testFunction.set('cat', 'fluffball');
testFunction.set('car', 'dodge');
testFunction.set('cart', 'shopping');
testFunction.set('color', 'yellow');
testFunction.set('lift', 'elevator');
testFunction.set('light', 'green');
testFunction.set('carp', 'magic');
testFunction.set('powder', 'Japan');
testFunction.set('nieve', 'snow');
testFunction.set('red', 'fire');
testFunction.set('carpet', 'shag');
testFunction.set('street', 'Broadway');
testFunction.set('call', 'long distance');
testFunction.set('phone', 'prepaid');
testFunction.set('yell', 'loud');
testFunction.set('joke', 'joshing');


console.log(testFunction);

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
  let hashStorageNum = hashCode(key, this.SIZE);
  return this.storage[hashStorageNum][key];
};
//TEST
console.log(testFunction.get('cat'));
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let hashStorageNum = hashCode(key, this.SIZE);
  const returnVal= this.storage[hashStorageNum][key];
  delete this.storage[hashStorageNum][key];
  return returnVal;
};
console.log(testFunction.remove('cat'));
testFunction.remove('cat');
console.log(testFunction);
console.log(testFunction.remove('cat'));

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
