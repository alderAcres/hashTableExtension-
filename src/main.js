/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;

  this.number = 0;

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
  // create a constant hashValue to store the hashCode address results
  const hashValue = hashCode(key, this.SIZE);

  // check if the hash value location exists in storage
  if (!this.storage[hashValue]) { //error: cannot read property NaN of undefined
    // if not, set it equal to an empty object. This will take care of future collisions with this hashCode location.
    this.storage[hashValue] = {};
  }

  // check if the key exists already, if not, incrememnt number property
  if (!this.storage[hashValue][key]) {
    this.number++;
  }

  // set key-value pair at the correct hash code, should overwrite existing keys with new value
  this.storage[hashValue][key] = value;
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
  // set constant hashValue to get location of key
  const hashValue = hashCode(key, this.SIZE);

  // return value of the key at the hashValue in storage
  return this.storage[hashValue][key];
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
  // set constant hashValue to get the location of the key in storage
  const hashValue = hashCode(key, this.SIZE);

  // check if the storage at the hashValue contains the specified key
  if(!this.storage[hashValue][key]) {
    return undefined;
  }
  this.number--;
  delete this.storage[hashValue][key];
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

let testTable = new HashTable();
testTable.set('1', "one");
testTable.set('2', "two");
testTable.set('3', "three");
testTable.set('4', "four")
testTable.set('1', "eins");
testTable.set('441', "forty-four")
console.log(testTable.get('1')); //eins
testTable.remove('2');
console.log(testTable.remove('2')); //undefined
console.log(testTable)


// Do not remove!!
module.exports = HashTable;
