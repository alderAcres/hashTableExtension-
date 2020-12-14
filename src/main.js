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

  let positionNum = hashCode(key, this.SIZE)

  // If no obj exists in current position
  if(this.storage[positionNum] === undefined){
    const newObj = {};
    newObj[key] = value 
    this.storage[positionNum] = newObj
  } else {
    let currentObj = this.storage[positionNum]
    // if new input key matches current existing key, overwrite value
    if(currentObj[key]){
      currentObj[key] = value;
    } else {
      // if key val pair exists but keys dont match, create new key val pair in same obj
      currentObj[key] = value;
    }
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
  let positionNum = hashCode(key, this.SIZE)
  console.log(positionNum)
  if(!this.storage[positionNum]) return undefined;
  const retrievedObj = this.storage[positionNum]
  if(retrievedObj[key]) return retrievedObj[key]
  return "no key exists"

  // have to create case where multiple values exist for the same key

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
  let positionNum = hashCode(key, this.SIZE)
  if(!this.storage[positionNum]) return "nothing stored in input key address"
  // if currently occupied, check existing obj
  const currentObj = this.storage[positionNum]
  // check if input key exists 
  if(currentObj[key]){
    delete currentObj[key]
    return "key val pair successfully deleted"
  } else {
    return "input key does not exist"
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


// let myHash = new HashTable()
// myHash.set("first key", "first value")
// myHash.set("first key", "another value")
// myHash.set("second key", "second value")
// console.log(myHash)
// console.log(myHash.get("first key"))
// console.log(myHash.get("second key"))
// console.log(myHash.get("first key"))
// console.log(myHash.remove("second key"))
// console.log(myHash.remove("first key"))
// console.log(myHash.remove("apples"))
// console.log(myHash.remove("first key"))
