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
  const indexed = hashCode(key);
  console.log(indexed); //logging all NaN ???

  if (this.storage[indexed]){
    this.storage[indexed].push([key, value]);
  } else {
    this.storage[indexed] = [[key, value]];
  }

  let tally = 0;
  Object.keys(this.storage).forEach(el => tally += el.length);
  console.log(Object.keys(this.storage)); //logs all " ['NaN'] " ???
  return tally //no matter the amount I set() tally returns 3 ???
};
// const testTable = new HashTable
// console.log(testTable.set('joshua', 24));
// console.log(testTable.set('P', 18));
// console.log(testTable.set('stephen', 26))
// console.log(testTable.set('sam', 25));
// console.log(testTable.set('a', 1));
// console.log(testTable.storage);
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
  const indexed = hashCode(key);
  if (this.storage[indexed].length > 1) {
    for (let i = 0; i < this.storage[indexed].length; i++){
      if (this.storage[indexed][i][0] === key) {
        return this.storage[indexed][i][1];
      } else {
        return undefined;
      }
    }
  }
};
// console.log(testTable.get('joshua'))
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  const indexed = hashCode(key);
  let store;
  if (this.storage[indexed].length > 1) {
    for (let i = 0; i < this.storage[indexed].length; i++){
      if (this.storage[indexed][i][0] === key) {
        store = this.storage[indexed][i][1];
        delete this.storage[indexed][i];
        return store;
      } else if (!this.storage[indexed][i]) return undefined;
    } 
  }
};
// console.log(testTable.get('joshua'))
// console.log(testTable.remove('joshua'));
// console.log(testTable.get('joshua'))


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
