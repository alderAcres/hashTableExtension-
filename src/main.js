/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.total = 0; 
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
  //declare a variable, run the input key value through the hash code to determine the index where the input key:value pair will be stored
  let index = hashCode(key, this.SIZE); //results in a num between 0 and size
  //store the input key:value pair at the resulting index found above
  if (this.storage[index] === undefined) {
    let obj = {}
    obj[key] = value
    this.storage[index] = obj;  
  } else {
    this.storage[index][key] = value; 
  }
  this.total+= 1; 
  //return the total number of items in storage 
  return this.total; 
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
  let index = hashCode(key, this.SIZE); 
  return this.storage[index][key]; 
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
  //run the input key through the hashcode to determine the index 
  let index = hashCode(key, this.SIZE); 
  //if result is undefined, return undefined
  if (this.storage[index] === undefined) {return undefined}; 
  if (this.storage[index][key] === undefined) {return undefined}
  //declare a result variable to store the value that will be deleted
  let result = this.storage[index][key]; 
  //if the # of keys at a given index is 1, set that index to equal undefined
  if (Object.keys(this.storage[index]).length === 1) {
    this.storage[index] = undefined;
    //else, delete the key value paired of the input target at the hashed index 
  } else {
    delete this.storage[index][key]
  }
  return result; 
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


let hashTable = new HashTable; 
hashTable.set('Set', 1); 
console.log(hashTable.storage); 
hashTable.set('Set', 2); 
hashTable.remove('Set'); 
console.log(hashTable.storage); 
console.log(hashTable.remove('DNE')); 
