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
// use hash function to get location inside hash table
 const location = hashCode(key, this.SIZE)
//if location already exists, add in additional key value pair
 if(this.storage[location]){
   this.storage[location][key] = value
 }
//if location does not exist, create an empty object at location and then add in key value pair (to handle collisions)
 else{
  this.storage[location] = {};
  this.storage[location].key = value

 }
};

let hashTable = new HashTable();
console.log(hashTable)




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
  //get location using hash function
  const location = hashCode(key, this.SIZE)
  //return what is stored at that location with the key that was input (to handle potential collisions)
  return this.storage[location][key]
  //(this doesn't work, trying to pull from the key at the locations object, but returning undefined)
  
};

console.log(hashTable.get('key'))
hashTable.set('key', 'value')
hashTable.set('key 11', 'collision handler')
console.log(hashTable.get('key'))
console.log(hashTable)


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  //get location using hash function
  const location = hashCode(key, this.SIZE)
  //if location does not exist return undefined
  if(!this.storage[location]) return undefined;
  //otherwise delete
  delete this.storage[location]
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
