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

const hashTable = new HashTable();

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
  // run the key through the hash function to get the index
  const index = hashCode(key, this.SIZE);
  // check if the storage at the given index is undefined
  if (!this.storage[index]) {
    // YES? set to be an empty array
    this.storage[index] = [];
  }

  let match = false;
  // iterate over each element's first element - if there is a match - overwrite
  for (let i = 0; i < this.storage[index].length; i++) {
    if (this.storage[index][i][0] === key) {
      this.storage[index][i] = [key, value];
      match = true;
      break;
    }
  }

  // if no match -  push the new array with 2 elements: 1st - key, 2nd - value - to this.storage at the found index
  if (!match) {
    this.storage[index].push([key, value]);
    this.length++;
  }

  return this.length;
};
hashTable.set('purple', 25);
hashTable.set('purple', 26);
hashTable.set('pink', 20);
console.log(hashTable.storage);


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
  // hash the key to get an index
  const index = hashCode(key, this.SIZE);

  // check if this.storage at the given index is undefined
  if (!this.storage[index]) return;

  // iterate over the this.storage[index] - find the given key - return the value
  for (let i = 0; i < this.storage[index].length; i++) {
    if (this.storage[index][i][0] === key) return this.storage[index][i][1];
  }

  return;
};
console.log(hashTable.get('pink'));
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // hash the key to get an index
  const index = hashCode(key, this.SIZE);

  // check if this.storage at the given index is undefined
  if (!this.storage[index]) return;

  // iterate over this.storage[index] - find the given key
  for (let i = 0; i < this.storage[index].length; i++) {
    if (this.storage[index][i][0] === key) {
      // delete nested array
      const removedValue = this.storage[index].splice(i, 1)[0][1];
      if (this.storage[index].length === 0) {
        this.storage[index] = undefined;
      }
      this.length--;
      return removedValue;
    }
  }

  return;
};
console.log(hashTable.remove('pink'));
console.log(hashTable.set('blue', 40));
console.log(hashTable.storage);


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
