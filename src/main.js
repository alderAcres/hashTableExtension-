// const { delete } = require("request");

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
  // get the hashcode
  const hashcode = hashCode(key, this.SIZE);

  // check if there exists a key equal hashcode, if it does then just put key in there
  if (this.storage[hashcode]){
    this.storage[hashcode][key] = value;
  } else {

  // otherwise create an empty object and put the key in there
    this.storage[hashcode] = {};
    this.storage[hashcode][key] = value;
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
HashTable.prototype.get = function (key) {
  const hashcode = hashCode(key, this.SIZE);
  if (this.storage[hashcode]) {
    if (this.storage[hashcode][key]){
      return this.storage[hashcode][key];
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
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
  // get the hashcode
  const hashcode = hashCode(key, this.SIZE);
  // store the key you want to delete in temp
  const temp = this.storage[hashcode][key];
  // delete that key
  delete this.storage[hashcode][key];
  // if (Object.keys(this.storage[hashcode]).length === 0) {
  //   delete this.storage[hashCode];
  // }
  // return that temp value
  return temp;
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


const hT = new HashTable();
hT.set('key', 'value');
hT.set('Hien', 'Nguyen');
hT.set('Codesmith', 'isawesome');

console.log(hT);
console.log('vale' === hT.get('key'))
console.log('Nguyen' === hT.get('Hien'))
console.log('isawesome' === hT.get('Codesmith'))
hT.remove('Hien');
console.log(hT);

