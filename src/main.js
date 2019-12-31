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
  console.log(this.storage)
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
  //create hash of the key using hash function
  const index = hashCode(key);

  if(!this.storage[key]){
    this.storage[index] = []; 
  }

  this.storage[index].push([key, value]);
  this.number += 1;
  //console.log(this.number);
  return this.number;
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
  //loop through bucket items to find the key you are looking for and return it 
  
  const index = hashCode(key);
  
  for(let bucket of this.storage[index]){
    if(bucket[0] === key){
      return bucket[1];
    }
  }
  return this.storage[index];
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
  //create index using key and hash func
  const index = hashCode(key);
  //return undefined if key doesn't exist in hash table
  if(!this.storage[index]) return undefined;

  for(let bucket of this.storage[index]){
    if(bucket[0] === key){
    let temp = bucket[1];
    delete this.storage[bucket[0]];
  }
  return temp;
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
console.log(HashTable());




