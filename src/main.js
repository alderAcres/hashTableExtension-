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
  // if we haven't encountered a particular hashcode yet, initialize it to empty object.
  if (!this.storage[hashCode(key, this.SIZE)])
    this.storage[hashCode(key, this.SIZE)] = {};
  // set the object's property found at hascode as key and value
  this.storage[hashCode(key, this.SIZE)][key] = value;
};

hash = new HashTable();
hash.set('bren', 'hello');

console.log(hash.storage);

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
  if (!this.storage[hashCode(key, this.SIZE)])
    return;
  return this.storage[hashCode(key, this.SIZE)][key];
};
console.log(hash.get('bren'));
console.log(hash.get('2'));

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  if (this.storage[hashCode(key, this.SIZE)]) {
    // store value in a variable that will be returned later
    let delVal = this.storage[hashCode(key, this.SIZE)][key];
    
    // delete property from object.
    delete this.storage[hashCode(key, this.SIZE)][key];

    // if there are no more key values in the object after deleting the appropriate key.
    if (Object.keys(this.storage[hashCode(key, this.SIZE)]).length === 0) {
      delete this.storage[hashCode(key, this.SIZE)];
    }
    
      // return variable
    return delVal
  }
};

console.log(hash.remove('bren'));
console.log(hash.storage);
hash.set('bren', 'hello Im back');
hash.set('hello', 'I"m new');
console.log(hash.storage);



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
