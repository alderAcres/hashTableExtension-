/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;

  // To count the number of items added to storage, including clashes
  this.itemCount = 0
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
  // Hash the key
  let hashedKey = hashCode(key, this.SIZE);
  // If object exists, add key value pair
  if (this.storage[hashedKey]){
    this.storage[hashedKey][key] = value
  } else { // else, create object and add
    this.storage[hashedKey] = {
      [key]: value
    }
  }
  // return the number of stored items after incrementing (inc. clashed)
  return ++this.itemCount
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
  // Hash the key
  let hashedKey = hashCode(key, this.SIZE);
  // Check if key value pair exists and return if so
  if (this.storage[hashedKey]){
    return this.storage[hashedKey][key]
  } else { // else, return item not found
    return "item not found"  
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
  // Hash the key
  let hashedKey = hashCode(key, this.SIZE);
  // Check for key value pair at location
  let returned = this.storage[hashedKey][key]
  // If key value pair exist, delete them but return the stored value and decrement item count
  if (returned !== undefined){
    delete this.storage[hashedKey][key]
    this.itemCount--
    return returned
  } else { // else, return key not found
    return "Key not found in storage"
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

let myHash = new HashTable()
// console.log(myHash.set("henry", "black") + "SET")
// console.log(myHash.set("address", "Bogota") + "SET")
// console.log(myHash.storage)
// console.log(myHash.get("henry") + "GET")
// console.log(myHash.get("address") + "GET")
// console.log("COUNT: " + myHash.itemCount)
// console.log(myHash.remove("henry") + "REMOVE")
// console.log("COUNT: " + myHash.itemCount)
// console.log(myHash.remove("address") + "REMOVE")
// console.log("COUNT: " + myHash.itemCount)
console.log(myHash.storage[1])