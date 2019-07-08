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
HashTable.prototype.set = function set(key, value) {
  const hashedKey = hashCode(key);

  // no value stored there yet, just set it
  if (!this.storage[hashedKey]) {
    this.storage[hashedKey] = value;
    // if we've already had a collision here before, then just add new prop
  } else if (typeof this.storage[hashedKey] === 'object') {
    this.storage[hashedKey][key] = value;
  } else {
    // get the previous value stored there
    const prevValue = this.storage[hashedKey];
    // make this space in the array an object and set a default property name
    // for the previous value
    this.storage[hashedKey] = {
      naught: prevValue,
    };
    // add another property for the key we're trying to add;
    this.storage[hashedKey][key] = value;
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
HashTable.prototype.get = function get(key) {
  // get the hashed key
  // if value at hKey is an object, ask if key is in the Object.keys
  // if it's not, then it must have been the naught property, so return it
  // if it is, then acess this.storage[hKey][key];
  // else, return the value stored there
  const hKey = hashCode(key);
  if (typeof this.storage[hKey] === 'object') {
    if (this.storage[hKey][key]) return this.storage[hKey][key];
    return this.storage[hKey].naught;
  }
  return this.storage[hKey];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function remove(key) {
  // get hKey
  // if value at hKey is an object, check if the key is a property
  // if it is, then delete it
  // else delete the naught
  // set the value at hKey to be undefined
  const hKey = hashCode(key);
  let val = undefined;

  if (typeof this.storage[hKey] === 'object') {
    if (this.storage[hKey][key]) {
      val = this.storage[hKey][key];
      delete this.storage[hKey][key];
    } else { // it was the naught value;
      val = this.storage[hKey].naught;
      delete this.storage[hKey].naught;
    } // if there are no more things stored in this object, delete it
    if (Object.keys(this.storage[hKey]).length === 0) {
      this.storage[hKey] = undefined;
    }
    // if there wasn't a collision but the key exists, get it and return
  } if (this.storage[hKey]) {
    val = this.storage[hKey];
    this.storage[hKey] = undefined;
  }

  return val;
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

console.log(13/16);