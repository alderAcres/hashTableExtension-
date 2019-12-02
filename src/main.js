/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;                         // Total size of the storage
  this.capacity = 0;                      // Number of items in storage
  this.storage = new Array(this.SIZE);    // Storage
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
  
  let idx = hashCode(key,this.SIZE);    // Process param key with hashCode function to get coded index
  // let obj = this.storage[idx];
  this.storage[idx] = {[key]:value};    // Use processed key to get access to the index of the storage
                                        // and set corresponding [key]:value

  this.capacity++;                      // Increment the number of items in the hash table
  return this.capacity;                 // return current number items in the table.
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
  let idx = hashCode(key,this.SIZE);      // Process param key with hashCode function to get coded index
  let obj = this.storage[idx];            // Access the index of the target with processed code.
  return obj[key];                        // Return the value that corresponds with the key.
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
  let idx = hashCode(key,this.SIZE);      // Process param key with hashCode function to get coded index
  let obj = this.storage[idx];            // Access the index of the target with processed code.
  let objVal = obj[key];                  // Save value before deleting
  delete this.storage[idx];               // delete object
  this.capacity--;                        // decrement capacity
  return objVal;                          // Return value deleted
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




// TEST=========================================================================================================================================================================================================================================================================================================================================================================================================================================
let test = new HashTable;

test.set("goodbye", 5);
test.set("hellodd", 22);
test.set("return",677);
test.set("returny",627);
test.set("returnss",122);

console.log(test.capacity);
// console.log(test.remove("goodbye"))
console.log(test.storage)
console.log(test.SIZE)
console.log(test.capacity)
