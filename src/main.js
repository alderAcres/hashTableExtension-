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
//hascode
HashTable.prototype.set = function(key, value) {
  const newHash = new HashTable();  //creating new Hash Table
  const index = hashCode(key,this.SIZE)
  if (!this.storage[index]){
    this.storage[index] ={};
    this.storage[index][key] = value;
  }else{
    this.storage[index][key] = value;
  }
};
const set = new HashTable();
console.log(set.set('hi', 4))
console.log(set.set('hello', 5))
console.log(set.set('goodday', 6))
console.log(set.set('hi', 4))
console.log(set)
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
  const index = hashCode(key,this.SIZE)
  if(!this.storage[index]){
    return undefined
  }else{
    return this.storage[index][key]
  }
};
const get = new HashTable();
console.log(get.set('hi',4))
console.log(get.set('hello',5))
console.log(get.set('hi',5))
console.log(get.get('hi'))
console.log(get.get('hello'))
console.log(get.get('goodday'))
// console.log(set.get('hi'))
console.log(get)
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  if (!this.storage[hashCode(key, this.SIZE)]){
    return undefined;
  }
  else{
    const removed = this.storage[hashCode(key, this.SIZE)][key]
    delete this.storage[hashCode(key, this.SIZE)][key]
    return removed;
  }
};

const remove = new HashTable();
console.log(remove.set('hi',4))
console.log(remove.set('hello',5))
console.log(remove.set('hi',5))
console.log(remove.get('hi'))
console.log(remove.get('hello'))
console.log(remove.remove('hi'))
console.log(remove)
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
