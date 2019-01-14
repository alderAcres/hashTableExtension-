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

    //allocate storage for colliding values within each bucket 
    for (let i = 0; i < this.SIZE; i++ ) {
      this.storage[i] = {};
    }
    //calculate the address for the key to be stored via hash function
    let hash = hashCode(key, this.SIZE);
     
    //overwrite key if key-value pair is already present
    if (this.storage[hash][key]) this.storage[hash][key] = value;
    //otherwise store the new key-value pair at the hash table address
    this.storage[hash][key] = value;
      
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
    //first calculate hash of key to get address of key if present
    let hash = hashCode(key, this.SIZE);
    //check if more than one key is stored within a bucket
    if (Object.keys(this.storage[hash]).length > 1 ) {
      if (this.storage[hash][key]) return this.storage[hash][key];
    }
    //just return the value of the key-value pair in the bucket
    return this.storage[hash][key];

};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
    //first calculate hash of key to get address of key if present
    let hash = hashCode(key, this.SIZE);
    let k = this.storage[hash];
    //return undefined if key not found at hash table address
    if (!this.storage[hash][key]) {
      return undefined
    };
    //otherwise delete the key-value pair if it's present
    delete this.storage[hash][key];

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

