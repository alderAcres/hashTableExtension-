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
  // hash the key
  const index = hashCode(key, this.SIZE);
  // check if the hashtable at index is populated or not
  if (this.storage[index] === undefined) {
    // if it is empty, create a bucket
    const bucket = {};
    // create key/value pairs for the bucket
    bucket[key] = value;
    // set the storage at index to equal that buckey
    this.storage[index] = bucket;
  } else {
    // if it is already populated, add another key/value pair to the bucket
    this.storage[index][key] = value;
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
  // find the corresponding bucket by hashing the key 
  const index = hashCode(key, this.SIZE);
  // return that bucket with the key/value pair
  const current = this.storage[index];
  return current[key]
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
  // find the index of the hashtable we need to remove
  const index = hashCode(key, this.SIZE);
  const current = this.storage[index];
  // check if the hashtable at index exists
  if (!current) {
    // if not, return undefined
    return undefined;
  } else {
    // else, since we have to return the deleted key, save it to another variable
    const deletedKey = current[key]
    // delete the key/value pair
    delete current[key]
    // return the copied key/value pair
    return deletedKey;
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



const table = new HashTable();
table.set(0, 1);
table.set(2, 3);
table.set(4, 5);
console.log(table);


console.log(table.get(0))
console.log(table.get(2))
console.log(table.get(4))
console.log(table.get(10))


console.log(table.remove(0))
console.log(table.remove(2))
console.log(table)
console.log(table.remove(10))



