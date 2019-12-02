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
  this.length = 0;
}

function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
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

// Next step - to avoid collisions add a node - use objects instead of arrays to store key value pairs
HashTable.prototype.set = function(key, value) {
  const hash = hashCode(key, this.SIZE);
  if (!this.storage[hash]) {
    this.storage[hashCode(key, this.SIZE)] = [key, value];
    this.length += 1;
  } else if (this.storage[hash] && this.storage[hash][0] === key) {
    this.storage[hashCode(key, this.SIZE)] = [key, value]; 
  } else {
    this.storage[hash].push([key, value])
    this.length += 1;
  }
  return this.length;
};

// let myHash = new HashTable;
// myHash.set('key','value')
// console.log(myHash);
// myHash.set('key', 'hello')
// console.log(myHash.set(2,45))
// console.log(myHash.storage[0])
// console.log(myHash)
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
  // need to get correct value if there is more than one key
  // currently gets the first stored value
  return this.storage[hashCode(key, this.SIZE)][1];
};

// console.log(myHash.get('key'));

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  if (!this.storage[hashCode(key, this.SIZE)]) return undefined;
  
  const value = this.get(key);
  // console.log(value)
  if (this.storage[hashCode(key, this.SIZE)] && this.storage[hashCode(key, this.SIZE)][1] === value) {
    this.storage[hashCode(key, this.SIZE)] = undefined;
    this.length -= 1;
    return value;
  }
};

// console.log(myHash);
// console.log(myHash.remove(2))
// console.log(myHash)
// console.log(myHash.remove('key'))
// console.log(myHash)

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
