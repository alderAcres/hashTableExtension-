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
//further tests at the bottom
const theTable = new HashTable();
console.log(theTable);

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
  const valueIndex = hashCode(key, this.SIZE);
  this.storage[valueIndex] = {[key]: value};
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
  const valueIndex = hashCode(key, this.SIZE);
  // get the index of the key in the object inside the bucket
  const theVal = Object.keys(this.storage[valueIndex]).indexOf(key);
  // console.log(Object.keys(this.storage[valueIndex]))
  // console.log(theVal);
  //check for objects that includes more than 1 key, value pair 
  if(Object.keys(this.storage[valueIndex]).length >= 1){
    //find the index of the key in the object of multiple keys
    return Object.values(this.storage[valueIndex])[theVal];
  }
  return this.storage[valueIndex][theVal];
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
  const valueIndex = hashCode(key, this.SIZE);
  if(!this.storage[valueIndex]){
    return undefined;
  }
  // get the index of a key in a bucket
  const theVal = Object.keys(this.storage[valueIndex]).indexOf(key);
  //delete specific key if multiple keys are in same bucket;
  if(Object.keys(this.storage[valueIndex]).length > 1){
    //console.log('deleting')
    delete this.storage[valueIndex][theVal];
  }
  //get the object if it only has 1 key value
  delete this.storage[valueIndex][key];
  //never mind, you can't delete objects
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

// Tests  //

// theTable.set('stringy', 45);
// console.log(theTable.storage);
// console.log('hold up, getting:', theTable.get('stringy'));
// console.log(theTable.remove('stringy'));
// console.log(theTable.storage);
// it works