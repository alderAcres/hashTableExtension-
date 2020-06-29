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

// we need to add values to the correct area in hashtable, based on the hashcode. Each storage has key value pair
HashTable.prototype.set = function(key, value) {
  const hash = hashCode(key, this.SIZE); // generates the hashcode to place the key value pair
  // if there is already an existing key, then we just add the new key value pair
  if (this.storage[hash]){
    this.storage[hash][key] = value;
  } else{ // if there is no existing key, we must create an empty object then insert the key value pair
    this.storage[hash] = {} // create an empty object if nothing exists at location
    this.storage[hash][key] = value;
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

// get value stored in hash table with specified key
HashTable.prototype.get = function(key) {
  const hash = hashCode(key, this.SIZE); // generate the hash key to locate position
  // if exists, return it, else return does not exist
  if (this.storage[hash]){
    return this.storage[hash][key];
  } else{
    return "does not exist"
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

// remove value from the hashTable
HashTable.prototype.remove = function(key) {
  // generate the hash key to locate the position
  const hash = hashCode(key, this.SIZE);
  // save the key you are going to delete in a variable
  const returnVar = this.storage[hash][key];
  // use delete to remove the object with the key stored in the position
  delete this.storage[hash][key];
  // return that variable
  return returnVar
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


// create new instance of HashTable
hashTable = new HashTable;

// Test cases for set
hashTable.set("one", 1)
hashTable.set("two", 2)
hashTable.set("three", 3)

console.log(hashTable)

// Test cases for get
console.log(hashTable.get("one"))
console.log(hashTable.get("five"))


// Test cases for remove
console.log(hashTable.remove("one"))
console.log(hashTable)