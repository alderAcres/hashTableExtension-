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
  // declare a variable equal to the output of running the key through the hash function
  const animals = hashCode(key, this.SIZE);
  // add the key/value pair at the index of the array equal to the variable
  if (!this.storage[animals]) {
    this.storage[animals] = [{ key, value }];
  }
  // if something is already there, implement chaining to handle collisions
  else {
    this.storage[animals].push({ key, value });
  }
  return this.storage[animals];
};

const animals = new HashTable();
animals.set('nat', 5);
animals.set('a', 6);
console.log(animals.storage);

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
  // run the hash code on the key
  const animals = hashCode(key, this.SIZE);
  // if doesn't exist return that the index doesn't exist
  if (!this.storage[animals]) {
    return undefined;
  }
  // loop through the storage at the index
  for (let i = 0; i < this.storage[animals].length; i += 1) {
    // if key equals key then return value
    if (this.storage[animals][i].key === key) return this.storage[animals][i].value;
  }
  // otherwise, return that the key doesn't exist
  return 'Key does not exist';
};

console.log(animals.get('nat'));
console.log(animals.get('a'));

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/

HashTable.prototype.remove = function(key) {
  // run the hash code
  const animalz = hashCode(key, this.SIZE);
  // return undefined if the index doesn't exist
  if (!this.storage[animalz]) return undefined;
  // loop through the array at the index
  for (let i = 0; i < this.storage[animalz].length; i += 1) {
    // if the key exists
    if (this.storage[animalz][i].key === key) {
      // store the key, splice out the object, return the value
      const toBeDeleted = this.storage[animalz][i];
      this.storage[animalz].splice(i, 1);
      return toBeDeleted.value;
    }
  }
  // otherwise, if key doesn't exist, return undefined
  return undefined;
};

animals.remove('nat');
console.log(animals.storage);


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
