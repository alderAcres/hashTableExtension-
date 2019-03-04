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

HashTable.prototype.set = function (key, value) {
  // get the appropriate hash code for the key
  let hashKey = hashCode(key, this.SIZE);
  // check to see if anything stored in the bucket corresponding to hash code
  if (!this.storage[hashKey]) {  // if not existing, create a new object
    this.storage[hashKey] = {}
  }
  this.storage[hashKey][key] = value; // update the object stored in the bucket to include key/val pair
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
HashTable.prototype.get = function (key) {
  // get the correct hash code for the key
  let hashKey = hashCode(key, this.SIZE);
  // get the object stored in the corresponding bucket (return false if not existing)
  if (!this.storage[hashKey]) return undefined
  let bucket = this.storage[hashKey]
  // return the value associated with the key stored in bucket
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
HashTable.prototype.remove = function (key) {
  // get the correct hash code for the key
  let hashKey = hashCode(key, this.SIZE);
  // get the object stored in the corresponding bucket (return false if not existing)
  if (!this.storage[hashKey]) {
    return undefined
  }
  let bucket = this.storage[hashKey]
  if (!Object.keys(bucket).includes(key)) {
    return undefined
  }
  delete bucket[key] // delete the key / value pair from the object
  // if the object doesn't have any key/val pairs left, set the bucket to undefined
  if (!Object.keys(bucket).length) {
    this.storage[hashKey] = undefined;
  }
  return 'removed'

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


let myHash = new HashTable()
myHash.set('blue', 32)
myHash.set('red', 12)
myHash.set('red', 19)
myHash.set('red', 24)
myHash.set('magenta', 36)
console.log('expect undefined: ', myHash.get('magg')) // expect undefined
console.log('expect undefined: ', myHash.remove('magg')) // expect undefined
console.log('expect 24: ', myHash.get('red')) // expect red to be 24
myHash.set(23, 12)
myHash.set(0, 123)
console.log('expect 12: ', myHash.get(23))
console.log('expect 123: ', myHash.get(0))
console.log('expect removed: ', myHash.remove(0))
console.log('expect undefined: ', myHash.remove(0523))
myHash.set('giant', false)
myHash.set('giant', true)
console.log('expect true: ', myHash.get('giant'))
console.log('expect removed: ', myHash.remove('giant'))
myHash.set('giant', false)
console.log('expect false: ', myHash.get('giant'))
console.log('expect removed: ', myHash.remove('giant'))

// check tryng to get something that doesn't exist
// check trying to delete something that doesn't exist