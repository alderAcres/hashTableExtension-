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
  this.count = 0;
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
  // determine hash code for input key
  let code = hashCode(key, this.SIZE);
  // check if bucket is empty
  if (this.storage[code] === undefined) {
    // if yes, place new object with input key/value pair; increment hash count by one
    let obj = {};
    obj[key] = value;
    this.storage[code] = obj;
    this.count++;
  // otherwise check if bucket already contains property with input key
  } else if (this.storage[code][key]) {
    // if yes, overwrite this property with the new input value
    this.storage[code][key] = value;
  // otherwise
  } else {
    // add new property to object in bucket; increment hash count by one
    this.storage[code][key] = value;
    this.count++;
  }
  // return hash count
  return this.count;
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
  // determine hash code for input key
  let code = hashCode(key, this.SIZE);
  // return value at input key
  return this.storage[code][key];
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
  // determine hash code for input key
  let code = hashCode(key, this.SIZE);
  // check if property for given input key exists
  if (this.storage[code][key]) {
    // assign constant to value at input key
    const removed = this.storage[code][key];
    // use delete operater to remove appropriate property
    delete this.storage[code][key];
    // decrement hash count by one
    this.count--;
    // return constant created above
    return removed;
  }
  // log failure message
  console.log('No property for the given key exists or its corresponding value is undefined'); 
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
