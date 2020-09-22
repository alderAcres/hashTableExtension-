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
HashTable.prototype.set = function (key, value) {
  // get the hashed index from invoking hashing function on key
  let hashedKey = hashCode(key, this.SIZE);
  // check to see if hashed index has been called once before, if not, initialize empty object there
  // then set the key-value pair
  if (this.storage[hashedKey] === undefined) {
    this.storage[hashedKey] = {};
    this.storage[hashedKey][key] = value;
  }
  // else, if the hashed index already has an object, check to see if that object has the same key
  // if it does, overwrite it
  else {
    let hashedKeyObject = this.storage[hashedKey];
    if (typeof hashedKeyObject === 'object') {
      if (hashedKeyObject.hasOwnProperty(key)) {
        console.log('This key has previously been used at this hashed index, replacing its matching value');
        hashedKeyObject[key] = value;
        return;
      }
      // collisions of key-value pairs of another key not matching current key is handled through the use of the object, which can hold different key-value pairs as long as the keys are unique
      else {
        hashedKeyObject[key] = value;
      }
    }
  }
}

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
HashTable.prototype.get = function (key) {
  // get the hashed index from invoking hashing function on key
  let hashedKey = hashCode(key, this.SIZE);
  // check the hashed index location, see if there is an object there, if not, return no values
  if (this.storage[hashedKey] === undefined) {
    console.log('This hashed index is empty');
    return;
  }
  // if there is an object there, check to see if that object has a key that matches current target key
  else {
    let hashedKeyObject = this.storage[hashedKey];
    if (hashedKeyObject.hasOwnProperty(key)) {
    // if it does, return the matching value
      return hashedKeyObject[key];
    }
    // if not, return that this index does not have the target
    else {
      console.log('This hashed index does not contain the target key.');
      return;
    }
  }
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  // get the hashed index from invoking hashing function on key
  let hashedKey = hashCode(key, this.SIZE);
  // check to see if hashed index is an object
  if (this.storage[hashedKey] === undefined) {
    // if it is, return that there is nothing to remove
    console.log('This hashed index is empty, nothing to remove.');
    return;
  }
  // if it an object, check to see if that object has a key that matches target key
  else {
    let hashedKeyObject = this.storage[hashedKey];
    if (hashedKeyObject.hasOwnProperty(key)) {
      // if it does, delete it
      delete hashedKeyObject[key];
      console.log('Deleted.');
      return;
    }
    // it it does not, return that the key is not in this index
    else {
      console.log('This hashed index does not contain this key.');
      return;
    }
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