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
  // Get index using hash code
  const index = hashCode(key, this.SIZE);
  // If there is nothing at that index yet,
  if (!this.storage[index]) {
    // set the value at that index to the key value pair passed in (this will replace values w/ same key)
    this.storage[index] = { [key]: value };
  } else {
    // If there is already stuff in there, add key/value pair to existing object
    this.storage[index][key] = value;
  }
};

// Tests to see how it handles multiple values at same hash address
const hashTable = new HashTable();
hashTable.set('cat', 'Xerda');
hashTable.set('cat', 'Sarge');
hashTable.set('neko', 'Grendel');
hashTable.set('sakana', 'Luna');
hashTable.set('child1', 'Keith');
hashTable.set('child2', 'Ciara');
hashTable.set('child3', 'Chloe');
console.log(hashTable);

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
  // Find the index using the hash code
  const index = hashCode(key, this.SIZE);
  // return the value at that index, associated with correct key
  return this.storage[index][key];
};

// Testing to make sure it can correctly retrieve values even when multiple vals are stored at one index
console.log(hashTable.get('neko'));
console.log(hashTable.get('child1'));
console.log(hashTable.get('cat'));
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // Get index using hash code
  const index = hashCode(key, this.SIZE);
  // If the key exists in the hash table...
  if (this.storage[index][key]) {
    // save the value at the key (so you can return it after deleting)
    const deleted = this.storage[index][key];
    // delete the key/value pair (should work if multiple key/val pairs stored there or not)
    delete this.storage[index][key];
    return deleted;
  }
  // If you didn't find that key, return undefined
  return undefined;
};

// Testing remove method
console.log(hashTable.remove('cat'));
// success (though if nothing is left, there is an empty object left behind)
console.log(hashTable);
// Attempting to set value at 'cat' key again
hashTable.set('cat', 'Minkota');
// Seems to work!
console.log(hashTable);

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
