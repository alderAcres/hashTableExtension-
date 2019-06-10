const LinkedList = require('./LinkedList.js');

//TODO : refactor in a way that call the print from the linked list inside the hashtable

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
  const hashedKey = hashCode(key,value)
  //console.log('\u001b[' + 32 + 'm' + 'hello stack' + '\u001b[0m')
    if(key === hashedKey && !this.storage[hashedKey]){
    this.storage[hashedKey] = new LinkedList(value)
  } else {
    this.storage[hashedKey].push(value)
  }
    this.storage[hashedKey].print()
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
  const hashedKey = hashCode(key,this.SIZE);
  this.storage[hashedKey].toString()
  return this.storage[hashedKey].get(key).value
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
  const temp = this.storage[hashCode(key, this.SIZE)];
  delete this.storage[hashCode(key, this.SIZE)];
  return temp;
};

HashTable.prototype.print = function(){
  this.storage.forEach(el => console.log(el)) // should call the print from the ll
}

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


const ht = new HashTable()
ht.set(0,3)
ht.set(0,4)
ht.set(1,10)
ht.print()
