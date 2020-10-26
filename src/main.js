/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
class HashTable {
  constructor() {
    this.SIZE = 16;

    this.storage = new Array(this.SIZE);
  }

  /*   set - Adds given value to the hash table with specified key.
   *
   * - If the provided key has already been used to store another value, simply overwrite
   *   the existing value with the new value.
   * - If the hashed address already contains another key/value pair, you must handle
   *   the collision appropriately.
   *  @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
   * */
  set = (key, value) => {
    //declare const new object to store differet key value pairs to empty obj to handle collisions
    const valObj = {};
    // run the hashCode on key and assign it to a cache pass in string and size
    // bucket = output
    let bucket = hashCode(key, this.SIZE); // result will be number: 0 1 2 .. 15
    // console.log(bucket)
    // if this bucket already has an obj,
    // add a new key with new val to that obj
    if(this.storage[bucket]) { // if there is an obj
      this.storage[bucket][key] = value;
    } else {
      //else, assign the key this new obj
      this.storage[bucket] = valObj;
      //add value to new key
      valObj[key] = value;
    }
  }

  /** get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed address, then you must retrieve
*   the correct value that was originally stored with the provided key
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/


  get = function(key) {
    // run hashCode passing in key
    //store output into drawer
    let drawer = hashCode(key, this.SIZE);
    //search this.storage[drawer] for key
    // return key;
    return this.storage[drawer][key];
  }
  /**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
  remove = function(key) {
    // pass key to hashcode to get drawer and assign to variable
    let drawer = hashCode(key, this.SIZE);
    // assing the old value to a temp variable to return later after deletion
    let value = this.storage[drawer][key];
    // delete this.storage drawer(the value)
    delete this.storage[drawer][key];
    // return key
    return value;
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
// HashTable.prototype.set = function(key, value) {

// };

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
// HashTable.prototype.get = function(key) {

// };

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
// HashTable.prototype.remove = function(key) {

// };


// Do not modify
function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if(string.length === 0) return hash;

  for(let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
