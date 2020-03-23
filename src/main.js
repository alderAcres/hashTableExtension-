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
  // run the hashCode function with the key and size as paramaters to determine where to store the key value pair
  let location = hashCode(key, SIZE);
  
  // check if there is anything being stored at the location
  if (storage[location] === undefined) {
    // if there is nothing at the location, create an empty object and store it at the specified location
    let obj = {};
    storage[location] = obj;
  } 
 
  // add the key and value as a key value pair to the object at the specified location
  storage[location][key] = value;
};


HashTable();
HashTable.prototype.set("hi", 55);
HashTable.prototype.set("hi", 5);
HashTable.prototype.set("ab", 7);

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
  // run the hashCode function with the key and size as paramaters to determine where the value is stored
  let location = hashCode(key, SIZE);  
  // create a variable to more easily call on the object stored at the location in the array
  const obj = storage[location];
  const val = obj[key];
  return val;
};

console.log(HashTable.prototype.get("hi"))
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // run the hashCode function with the key and size as paramaters to determine where the value is stored
  let location = hashCode(key, SIZE);  
  const obj = storage[location];
  


  // if there's nothing stored at the location, this means the key does not exist so return undefined
  if (storage[location] === undefined) {
    return undefined
  }

  // if the key does not exist, return undefined
  else if(obj[key] === undefined) {
    return undefined;
  }

  // if the key does exist, delete the key value pair from the object
  else {
    // delete
    delete obj.key;
    console.log(key + " was deleted from the hashtable")
  }

};


console.log(HashTable.prototype.remove("hi"))

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
