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
  // create new hash "address" for passed-in key by invoking hashCode func with input key arg
  const newHash = hashCode(key, this.SIZE);
  // console.log(newHash);

  // if the hash "address" does not yet exist in this.storage, create an obj and then add the key as a key-value pair inside that obj
  if (!this.storage[hashCode]) {
    const nestedObj = {};
    nestedObj[key] = value;
    this.storage[newHash] = nestedObj;
  } 
  // if the hash "address" already exists (collision) - add the key as a new key-value pair inside the existing obj
  else {
    this.storage[newHash][key] = value;
  }
  // increment this.count, keeping track of whenever a new key is added to the hashtable
  this.count++;
  // return # of items stored in hash table
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
  // run the key through the hashCode func to retrieve the key's unique hashCode "address" 
  // it is the same as when key was first 'set' in hash table
  const newHash = hashCode(key, this.SIZE);
  // console.log(newHash);
  
  // find and return the value stored at input key arg's unique hash address
  return this.storage[newHash][key];
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
  // run the key through the hashCode func to retrieve the key's unique hashCode "address" 
  // it is the same as when key was first 'set' in hash table
  const newHash = hashCode(key, this.SIZE);
  // console.log(newHash);

  // returns undefined if key does not exist
  if (!this.storage[newHash]) return undefined;

  // console.log(this.storage);
  delete this.storage[newHash][key];
  
  // decrement count to signify that amount of elements in hashtable has reduced
  this.count--;
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

// TESTS
/*
const hash = new HashTable;
hash.set("Hello World.", 1);
hash.set("Goodbye World.", 2);
console.log(hash);
console.log(hash.get('Hello World.'));
console.log(hash.get("Goodbye World."));
hash.remove('Hello World.');
console.log(hash.count);
*/