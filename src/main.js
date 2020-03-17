/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.length = 0;
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
  // get where to store this by getting the hashKey
  const hashKey = hashCode(key, this.SIZE);
  // if the key's value is nil - make an array into there for collissions
  if (this.storage[hashKey] === undefined) {
    //  push value into first array element of hash[hashKey]
    const newObj = {};
    newObj[key] = value;
    this.storage[hashKey] = newObj;
    // increment the number of items stored
    this.length++;
  } else {
    // else there is already an array at this spot
    //  push value into array of hash[hashKey]
    if (this.storage[hashKey][key] === undefined) {
      this.storage[hashKey][key] = value;   
      // increment the number of items stored
      this.length++;
    } else {
      // only add without incrementing the number of items stored
      this.storage[hashKey][key] = value;
    }

  }
  // return number of items stored
  return this.length;
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
  // get where the value was stored by getting the hashKey
  const hashKey = hashCode(key, this.SIZE);
  console.log(hashKey);
  // if the value at the hashkey is undefined - return undefined
  if (this.storage[hashKey] === undefined) return undefined;
  // if the key exists at the hash[hashKey] return value
  else if (this.storage[hashKey].hasOwnProperty(key)) return this.storage[hashKey][key];
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
  // convert the key into a hashKey
  const hashKey = hashCode(key, this.SIZE);
  // if the value at the hashKey is undefined return undefined
  if (this.storage[hashKey] === undefined) return undefined;
  // else delete the key/value pair and return the value
  else if (this.storage[hashKey].hasOwnProperty(key)) {
    const returnValue = this.storage[hashKey][key];
    delete this.storage[hashKey][key];
    // decrement the size of the hash table
    this.length--;
    return returnValue;
  }
};

// Test cases
/*
const hash = new HashTable();
console.log(hash.set(8, 'number'));
console.log(hash.set(9, 'number2'));
console.log(hash.set('A', 'letter'));
console.log(hash);
console.log(hash.get(9));
console.log(hash.length);
console.log(hash.remove(9));
console.log(hash);
console.log(hash.length);
*/

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
