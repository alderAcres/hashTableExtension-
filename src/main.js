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

  // get index using hash function
  // store the key value pair in this.storage array
  // can handle collisions with an object


  const hashedIndex = hashCode(key, this.SIZE);

  // multiple situations
  // the first time 
  if (!this.storage[hashedIndex]) {
    this.storage[hashedIndex] = {};
    this.storage[hashedIndex][key] = value;
  }
  // if there is a key value pair already, just put new key and value inside
  else {
    this.storage[hashedIndex][key] = value;
  }

  // have to return the items stored
  let itemsStored = 0;

  this.storage.forEach((element) => {
    // for each element in our hasharray
    if (typeof element === 'object') {
      itemsStored += Object.entries(element).length;
    }
  })
  return itemsStored;
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

  // get the index 
  const hashedIndex = hashCode(key, this.SIZE);

  // return out the value at the key
  return this.storage[hashedIndex][key];
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

  const hashedIndex = hashCode(key, this.SIZE);
  // handle key not existing
  if (!this.storage[hashedIndex]) {
    return;
  }
  else if (!this.storage[hashedIndex][key]) {
    return;
  }
  else {
    const removedElement = this.storage[hashedIndex][key];
    delete this.storage[hashedIndex][key];
    return removedElement;
  }

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

const myHashTable = new HashTable;
console.log(myHashTable.set('alpha', 10));
myHashTable
console.log(myHashTable.set('beta', 20));
myHashTable
console.log(myHashTable.get('alpha'));
console.log(myHashTable.remove('alpha'));
console.log(myHashTable.remove('charlie'));
myHashTable