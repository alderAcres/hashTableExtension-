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
  this.storage.next = null;
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
  let index = hashCode(key, this.SIZE);
  //if provided key already used to store another value
  if(this.storage[index]){
    //overwrite the existing value with new value
    this.storage[index] = {[key] : value};
    //if hashed address already contains another key/value pair, handle collision "appropriately"
  } else if (this.storage[index]){
    // if a collision, store in a next address
    this.storage.next = {[key] : value};
  } else {
    //else store key : value pair
    this.storage[index] = {[key] : value};
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
  //get haschode for lookup
  let index = hashCode(key, this.SIZE);
  // declare a result
  let result;
  for(let prop in this.storage[index])
    if(this.storage[index].hasOwnProperty(key)){
       result = this.storage[index][prop];
    }
    return result;    
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
  let index = hashCode(key, this.SIZE);
  // If the key does not exist in the hash table, return undefined
  if(!this.storage[index]) return undefined;
  //else grab the key out of the hash table and store in a result variable
  let result = this.storage[index];
  //depete the index
  delete this.storage[index];
  //return result
  return result;
};

const myTable = new HashTable();
myTable.set('dog','woof');
myTable.set('cat','meow');
console.log(myTable.storage);
myTable.get('cat')
// console.log(myTable.storage);

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
