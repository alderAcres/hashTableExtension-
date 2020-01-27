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
  // Create a new object to put into the hashPosition -- This could probably be in an if statement to avoid making the new object everytimie
  let hashObj = {};
  // Add the key value pair to the object
  hashObj[key] = value;
  // If there is already an object at the hashPosition add the key value pair
  // Otherwise add the object
  this.storage[hashCode(key, this.SIZE)] ? this.storage[hashCode(key, this.SIZE)][key] = value : this.storage[hashCode(key, this.SIZE)] = hashObj
  // Return the number of items currently in the hashObject
  return Object.keys(this.storage[hashCode(key, this.SIZE)]).length
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
  // returns the value access by the key at the hashPosition
  return this.storage[hashCode(key, this.SIZE)][key]
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
  // Grab the value you want to delete -- could have used get method
  const removeValue = this.storage[hashCode(key, this.SIZE)][key];
  // Delete the key value pair in the hashObject at the hashPosition
  delete this.storage[hashCode(key, this.SIZE)][key];
  // If the object that held the deleted key-value pair is empty
    // Remove the object that was holding it
  if(Object.keys(this.storage[hashCode(key, this.SIZE)]).length === 0){
    delete this.storage[hashCode(key, this.SIZE)]
  }
  // Return the value that we removed
  return removeKey
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


// // TESTING AREA!

// const myHashTable = new HashTable();

// console.log(myHashTable.set('kermit', 'frog'))  // kermit is in the table under his hashValue
// myHashTable.set('ms. piggy', 'pig')  // ms. piggy is in the table under her hashValue
// myHashTable.set('fozzy', 'bear')  // fozzy is in the table under his hashValue
// myHashTable.set('animal', '????')  // animal is in the table under his hashValue

// console.log(myHashTable)  // Shows all key value pairs in hashtable 

// console.log(myHashTable.remove('kermit'))  // removes kermit from his hashPoistion returns 'frog'

// console.log(myHashTable.remove('fozzy'))  // removes fozzy, returns 'bear', and removes the object that was holding him from the hashPosition

// myHashTable.set('kermit', 'frog')  // Adds kermit back

// myHashTable.set('fozzy', 'bear')  // Adds fozzy back

// console.log(myHashTable.get('kermit'))  // 'frog'
