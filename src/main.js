
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
  this.storedKeys = 0;
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
  const hashIndex = hashCode(key,this.SIZE);
  // since duplicate keys can be overwritten, we can use an object instead of a list as our storage.
  if (!this.storage[hashIndex]) this.storage[hashIndex] = {}; // create empty object in bucket if not initialized
  if (!this.storage[hashIndex][key]) this.storedKeys++ // increment storedKeys count if this is a new key
  this.storage[hashIndex][key] = value;
  return this.storedKeys;
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
  const hashIndex = hashCode(key, this.SIZE);
  return this.storage[hashIndex]?.[key]
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
  const hashIndex = hashCode(key, this.SIZE);
  const storedVal  = this.storage[hashIndex]?.[key];
  if (this.storage[hashIndex]?.[key]) this.storedKeys--; // decrement storedKeys counter if key exists
  delete this.storage[hashIndex]?.[key];
  return storedVal;
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

// test set and get
const mockTable = new HashTable();
console.log(mockTable.set('claudio', 'santos'))
console.log(mockTable.get('claudio'));

// test collision
console.log(`hash for 'claudio' is: ${hashCode('claudio', mockTable.SIZE)}`)
const collisionKey = 'CLAUDIO';
console.log(`hash for ${collisionKey} is: ${hashCode(collisionKey, mockTable.SIZE)}`)

console.log(mockTable.set(collisionKey, 'screaming'));
console.log(mockTable.get(collisionKey))
// test collision didn't overwrite original key
console.log(mockTable.get('claudio'))

//test key can be overwriten
console.log(mockTable.set('claudio', 'bye'));
console.log(mockTable.get('claudio'))


// test delete return value or undefined
console.log(mockTable.remove(collisionKey));
console.log(mockTable.storedKeys);
console.log(mockTable.remove(collisionKey));