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
//find the index from the function hashCode - where in array to store the value - hash the key to find index
let index = hashCode (key, this.SIZE)
//if you don't see that address of the key
if (!this.storage[index]) {
//the object storage at that string get no value which is empty object 
this.storage[index] = {} ; }
//if you find the string the assign the value to the string key - hashed index contains key/value pair
this.storage[index][key] = value ;
//if the provided key has already been used then overwrite value at index with new value
// this.storage[index] = value;
//return the hashed address where you set the key-value pairs
return index;
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
//find the index from the function hashCode - where in array to store the value - hash the key to find index
let index = hashCode (key, this.SIZE)
//if address or the key is not found that means can't retrieve a value so return undefined or address not found
if(!this.storage[index]) return undefined;
//otherwise get the value at the address if there's just one unique value at the hashed address
//return this.storage[index] //= value;
//and if there's more than just one value stored at that address we specify what key(string) that we want the value of
return this.storage[index][key] //= value;
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
//find the index from the function hashCode - where in array to store the value - hash the key to find index
let index = hashCode (key, this.SIZE)
//if you don't find the address/ key(string you looking for) return undefined
if(!this.storage[index]) return undefined;
//in case there's collision we assign the value at the specified key to a variable
let valueRemoved = this.storage [index][key];
//delete that value at the specified key
delete this.stoarge [index][key];
// return the value remove from the hashtable at tha key given 
return valueRemoved;
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
