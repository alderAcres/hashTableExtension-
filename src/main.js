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
  //create the index using hash function
  const index = hashCode(key, this.SIZE);
  console.log(index)
  //check if anything exists in bucket
  if (this.storage[index]) {
    //add key value pair to bucket
    this.storage[index][key] = value;
  }
  //otherwise store a key/value pair there
  else {
    //initialize a new holding object
    this.storage[index] = {};
    //store input key/value at storage object
    this.storage[index][key] = value;
  }
  console.log(this.storage[0])
  return this.storage.filter(bucket=>(typeof bucket === 'object')).length
};

const myHash = new HashTable();
myHash.set('key 1', 'value 1')
myHash.set('key 2', 'value 2')
console.log(myHash)

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
  //create the index using the hash function
  const index = hashCode(key, this.SIZE);
  //check if anything exists at the bucket
  console.log(this.storage[index]);
  if (this.storage[index]) {
    //return the value stored at the input key
    return this.storage[index][key];
  }
  //otherwise do nothing
  return;
};

console.log(myHash.get('key 1')) //->'value 1'
console.log(myHash.get('key 2')) //->'value 2'
console.log(myHash.get('jeffrey')) //->'undefined'

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  //create index using hash function
  const index = hashCode(key, this.SIZE);
  //check if there is anything at the bucket
  console.log(this.storage[index])
  if (this.storage[index]) {
    //capture value to return before deleting it
    const returnVal = this.storage[index][key]
    //delete the value at the input key
    delete this.storage[index][key];
    //check length of storage object at current bucket
      //set storage object to undefined if object size is 0
    console.log(Object.keys(this.storage[index]).length);
    if (Object.keys(this.storage[index]).length === 0) this.storage[index] = undefined;
    return returnVal;
  }
  //otherwise do nothing
  return;
};

console.log(myHash.remove('key 1')) //'value 1'
console.log(myHash)
console.log(myHash.set('key 1', 'value 1'))
console.log(myHash)


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
