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
  // fill array with empty object literals that will handle collisions
  for (let i = 0; i < this.SIZE; i += 1) {
    const newObj = {};
    this.storage[i] = newObj;
  }
  // initialize count of stored items
  this.itemsStored = 0;
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
  // get bucket in which to store value
  const hashAddress = hashCode(key, this.SIZE);

  // check if it is the first time using this key
  const keyIsUnique = this.storage[hashAddress][key] === undefined;

  // store the key, value pair inside the object literal at hashAddress
  // this will overwrite any previous values stored with the same key
  this.storage[hashAddress][key] = value;
  
  // increment number of items stored, only if key was unique
  if (keyIsUnique) this.itemsStored += 1;

  // return number of items stored
  return this.itemsStored;
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
  // get hashAddress
  const hashAddress = hashCode(key, this.SIZE);

  // lookup and return key's value in the correct nested object literal of the hashtable
  return this.storage[hashAddress][key]; // returns undefined if key does not exist
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
  // get hashAddress
  const hashAddress = hashCode(key, this.SIZE);

  // store the deleted value before deleting it
  const deletedVal = this.storage[hashAddress][key];

  // delete the key,value pair
  delete this.storage[hashAddress][key];

  // decrement items stored, only if we deleted something (value was not undefined)
  if (deletedVal !== undefined) this.itemsStored -= 1;

  // return stored value (this is undefined if key never existed in hash table)
  return deletedVal;
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


/* Test Suite */

// const myHT = new HashTable();
// myHT.set('abaas', 123);
// myHT.set('abaas', 456);
// myHT.set('b', 456);
// console.log(myHT.storage);
// console.log(myHT.itemsStored);

// console.log(myHT.get('abaas'));

// myHT.remove('abaas');
// console.log(myHT);
// console.log(myHT.itemsStored);

// myHT.remove('notAKey');
// console.log(myHT);
