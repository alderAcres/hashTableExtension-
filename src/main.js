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

//pass the key to the hash function to get a hashed version of input. Insert
//the provided value into the storage array at the index represented by this hash code.
//collisions: If multiple values result in same hash code, account for this by saving 
// values in an object like so - { key: value }

HashTable.prototype.set = function(key, value) {
  let hash = hashCode(key, this.SIZE);
  //check if there is already a value stored at the current hash code
  //if not, initialize that index of storage to an empty object
  if (!this.storage[hash]) {
    this.storage[hash] = {};
    //store the value associated with that code in the object
    this.storage[hash][key] = value;
  }
  //if there is already a value at that hash code, simply store it's value in the object
  else this.storage[hash][key] = value;
}

let hashTable = new HashTable();
hashTable.set('hello', true);
hashTable.set(4, false)
hashTable.set('gross', false)
console.log(hashTable.storage) 

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
  let hash = hashCode(key, this.SIZE);
  //each key is an object containing passed values and their hash codes
  //acces the index of storage with hash, and access value of hash key in object, return 
  return this.storage[hash][key];
};

console.log(hashTable.get('hello'))
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
  let hash = hashCode(key, this.SIZE);
  //remove the entry stored at hash code 
  delete this.storage[hash];
};

console.log(hashTable.remove(4))
console.log(hashTable)




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
