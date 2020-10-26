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
  const location = hashCode(key, this.size); // location will be a number outputted from hash function
  console.log(location);
  if (this.storage[location] === undefined) this.storage[location] = {}; //sets empty object container into location to handle collisions
  this.storage[location][key] = value; //will overwrite any value already stored in this location
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
  const location = hashCode(key, this.size);//determines location
  if (this.storage[location][key]) return this.storage[location][key]; //retrieves value stored under key at specific location
  return "--> * value not found * <--"
   
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
  const location = hashCode(key, this.size);
  if (this.storage[location][key] === undefined) return undefined;
  delete this.storage[location][key];
};

const pleaseWorkHash = new HashTable();
pleaseWorkHash.set(3, 'this is data');
console.log(pleaseWorkHash)
pleaseWorkHash.set(3, 'this is more data');
console.log(pleaseWorkHash)
pleaseWorkHash.set('hash', 'i love data');
console.log(pleaseWorkHash);
console.log(pleaseWorkHash.get('hash'));
console.log(pleaseWorkHash.get(28));
pleaseWorkHash.remove(3);
pleaseWorkHash.set('zoom', 'this is still data');
console.log(pleaseWorkHash);
//ISSUES::
//when the hashtable is logged, it shows 16 empty array indices and one object, so it appears i'm not putting the object containing my values into separate array spaces inside my hashtable, but rather putting them all into an object which is also stored on my array Hash... (???) --> it seems as if my hash function is always outputting the same value (NaN) when it runs and all my values are being stored in the object placed at this index



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
