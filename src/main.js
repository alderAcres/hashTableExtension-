/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 2;
  
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

// in: key, value
// out: new num of items stored in has table
HashTable.prototype.set = function(key, value) {
  // use hashCode to determine key, assign value
  if (this.storage[hashCode(key, this.SIZE)] === undefined) {
    this.storage[hashCode(key, this.SIZE)] = value;

    // if key exist, replace value at key.
  } else if (this.storage.hasOwnProperty(hashCode(key, this.SIZE))) {
    this.storage[hashCode(key, this.SIZE)] = value;
    //this.SIZE += 1;
  }

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
  return this.storage[hashCode(key, this.SIZE)];

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
  if (this.storage[hashCode(key, this.SIZE)] !== undefined) {
    delete this.storage[hashCode(key, this.SIZE)];
  } else {
    // return undefined if hash key does not exist
    console.log('remove test');
    return undefined;
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

console.log('start test')
let hashT = new HashTable();
hashT.set('key1', 'value1');
hashT.set('key2', 'value2');
console.log(hashT);
console.log('setting collison test: 4 new keys')
hashT.set('key3', 'value3');
hashT.set('key4', 'value4');
hashT.set('key5', 'value5');
hashT.set('key6', 'value6');

console.log(hashT);
// hashT.remove('key3');
// console.log(hashT.remove('key4'));
// console.log(hashT.get('key1'));
// console.log(hashT.get('key2'));
console.log('Setting new hash key: key1 : new_value1');

console.log('grabbing hash key', hashT.storage[hashCode('key1', hashT.SIZE)]);
hashT.set('key1', 'new_value1');
console.log(hashT.get('key1'));
console.log(hashT);