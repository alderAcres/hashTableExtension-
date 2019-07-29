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
  //**edge cases**
  //less than 2 arguments or if key isn't a string
  if (arguments.length < 2 || typeof key !== 'string') {
    throw new TypeError('Valid key needed')
  }
  //if value isn't a string|number|boolean
  if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
    throw new TypeError('Valid input needed')
  }

  //convert key into hash key
  let hashKey = hashCode(key, this.SIZE);
  //check if an array already exists in the bucket
  if (Array.isArray(this.storage[hashKey])) {
      //checks if the key already exists in the bucket array
      let indexIfExists = this.storage[hashKey].findIndex((x) => {
        return key === x.key;
      })
      //if so, rewrite it
      if (indexIfExists !== -1) {
        this.storage[hashKey][indexIfExists].value = value;
      } 
      else {
        //if not, create a new entry for the value with key being attached to it
        this.storage[hashKey].push({
          key: key,
          value: value
        })
      }
  } else {
    //if not, create one and push the the value to it
    this.storage[hashKey] = [];
    this.storage[hashKey].push({
      key: key,
      value: value
    })
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
  //edge case
  //invalid argument length or if key isn't a string
  if (arguments.length !== 1 || typeof key !== 'string') {
    throw new TypeError('Valid input needed')
  }
  //convert key into hash key
  let hashKey = hashCode(key, this.SIZE);
  let bucket = this.storage[hashKey];

  //see if the bucket is an array, if not return an error
  if (!Array.isArray(bucket)) {
    throw new TypeError('Could not retrieve the value')
  } else {
    //else, retrieve the index of the object that has key in it
    let indexForRetrieval = bucket.findIndex((x) => x.key === key);
    //if index is -1, throw an error
    if (indexForRetrieval === -1) {
      throw new TypeError('Could not retrieve the value')
    } else {
      //else return its value
      return bucket[indexForRetrieval].value;
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
HashTable.prototype.remove = function(key) {
  //edge case
  //invalid argument length or if key isn't a string
  if (arguments.length !== 1 || typeof key !== 'string') {
    throw new TypeError('Valid input needed')
  }
  //hash the key
  let hashKey = hashCode(key, this.SIZE);
  let bucket = this.storage[hashKey]

  //if the bucket isn't an array, throw an error
  if (!Array.isArray(bucket)) {
    throw new TypeError('Could not retrieve the value')
  } else {
    //otherwise, access the bucket and find the index
    let indexforDeletion = bucket.findIndex((x) => x.key === key);
      //if index returns -1, throw an error
    if (indexforDeletion === -1) {
      throw new TypeError('Could not retrieve the value')      
    } else {
      //else, remove via splice
      bucket.splice(indexforDeletion, 1)
    }
  }
  //turn bucket back to undefined if no more value is stored on the array -> to save memory!
  if (bucket.length === 0) {
    this.storage[hashKey] = undefined;
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
