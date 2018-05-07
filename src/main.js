/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/

// specific object is assigned a hash key value to search easier
// key value pairs into an array

//Hashing is implemented in two steps:

//------------------------------------------------------------------------------
/*1. An element is converted into an integer by using a hash function. This element can be used as an index to store the original element, 
which falls into the hash table. 

2. The element is stored in the hash table where it can be quickly retrieved using hashed key.

hash = hashfunc(key)
index = hash % array_size

In this method, the hash is independent of the array size and it is then reduced to an index (a number between 0 and array_size − 1) 
by using the modulo operator (%).
*/

//------------------------------------------------------------------------------

Buckets [00] [01] [02] 
[00] = key, keyValue: [Name, 000-001] ... // chaining with linked list at the indices of Hash Tables
// OPEN HASHING
// values have key objects
[01] 
function HashTable(obj) {

  this.hash = new hashCode() // ??
  this.length = 0;
  this.items = {} // Bucket value[this.length]: keyOBJ => this.items[obj[key]] = obj[key]    this.length++

  //looking for an unused spot in the Hash Table
  for (var objKey in obj) {
    if (obj.hasOwnProperty(objKey)) {
      this.items[objKey] = obj[objKey]; // {Name(key), Value(000-0001)}
      this.length++; // Bucket length: [00] - KEY{Name, 000-001} 
    }
  }
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
  // values is an array [] // linked list
  //check if there is one existing
  
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
  // getting a value if undefined or defined
  return this.items.hasOwnProperty(key) ? this.items[key] : undefined;
  // if key exists, get the value, if it does not exist then its undefined
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
  let previous = undefined;
  if (this.items.hasOwnProperty(key)) { // if the bucket has a property
    previous = this.items[key] // sets the current one as the first bucket value
    this.length--; // decrease the index length of the bucket to avoid collision
    delete this.items[key]; // if we found the key in the bucket then delete that since there are 2 now;
    return previous; // return the first bucket property we set
  } else {
    return undefined; // if there is no key, then it is undefined for the bucket.
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

var hashTable = new HashTable();

// Do not remove!!
module.exports = HashTable;
