/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  //add a hashtotal to keep track of our length without iterating
  this.hashtotal = 0;
  this.storage = new Array(this.SIZE);
};

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
  //we need to place the key and value into a bucket determined by its hashcode
  //---reminder, hashcode is a digit that will represent the index of our hashtable---//
  const currenthash = hashCode(key, this.SIZE);
  //if our hash location is empty, create an empty object to set our item in, so we can look up by keys
  if (!this[currenthash]) this[currenthash] = {};
  //if our key exists, overwrite value rather than add new one
    //otherwise add this k/v pair to our bucket (same code for either case)
  this[currenthash][key] = value;
  
  //increment the local total
  this.hashtotal += 1;
  //return the updated number for hashtotal
  return this.hashtotal;
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
  //determine hashcode
  const currenthash = hashCode(key, this.SIZE); 
  //if bucket is empty, return undefined
    //or if key is missing from bucket, return undefined
  if (!this[currenthash] || !this[currenthash][key]) return undefined;
  //look up and return value by the key we're given
  return this[currenthash][key];
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
  //establish current hashcode/index
  const currenthash = hashCode(key, this.SIZE);
  //if bucket is empty, or k/v pair is missing, return undefined
  if (!this[currenthash] || !this[currenthash][key]) return undefined;
//**do we need to return anything otherwise, or just delete?**//
//** if we're returning the deleted entry, I would save the value, first, then return it after deletion**/
  //remove key/value of pair passed in
  delete this[currenthash][key];
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

//let's test!
//create a hashtable
const testTable = new HashTable();
//add an entry
testTable.set(5, 'test')
console.log(testTable, testTable.get(5))
//remove it and check
testTable.remove(5)
console.log(testTable, testTable.get(5))

// Do not remove!!
module.exports = HashTable;
