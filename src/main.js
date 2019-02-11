/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.length = 0;
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
  // get hashed key
  const hashedKey = hashCode(key, this.SIZE);

  if (this.storage[hashedKey]) {
    // collision detected. object exists. update object
    if (!this.storage[hashedKey][key]) this.length++; // only update length if key doesn't exist
    this.storage[hashedKey][key] = value;
  } else {
    // nothing here. Create new obj
    const temp = {};
    temp[key] = value;
    this.storage[hashedKey] = temp;
    this.length++;
  }
  return this.length;
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
  // get hashed key
  const hashedKey = hashCode(key, this.SIZE);

  if (this.storage[hashedKey])
    // hash exists. check key
    if (this.storage[hashedKey][key])
      return this.storage[hashedKey][key]
  return undefined;
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
  // get hashed key
  const hashedKey = hashCode(key, this.SIZE);
  let output;

  if (this.storage[hashedKey]) {
    // hash exists. check key
    if (this.storage[hashedKey][key]) {
      // key exists. store it, delete it, decrement length
      output = this.storage[hashedKey][key];
      delete this.storage[hashedKey][key];
      this.length -= 1;
    }
  }
  return output;
};

const hash = new HashTable();
hash.set('quoc', 11583)
console.log('quoc', hash.length, hash.get('quoc'))
hash.set('quoc', 11584)
hash.set('turbo', 12345)
console.log('turbo', hash.length, hash.get('turbo'))

hash.set('charlie', 54321)
console.log('charlie', hash.length, hash.get('charlie'))

console.log('removing charlie', hash.length, hash.remove('charlie'))
console.log('charlie', hash.length, hash.get('charlie'))
console.log('christina', hash.length, hash.get('christina'))
console.log('hashTable', hash.length, hash.storage)

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
