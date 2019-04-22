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
  let hashIndex = hashCode(key, this.SIZE); //create a hash key which will be the index at which the value is stored
  if(!this.storage[hashIndex]){ //check if the key value already exists in the storage
    this.storage[hashIndex] = {}; //if does not exist, create an empty object
  }
  this.storage[hashIndex][key] = value; //store the key as the property, and the value as the value in KVP pair in the calculated hashIndex
  console.log(this.storage);
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
  let hashIndex = hashCode(key, this.SIZE);//calculate the hashIndex
  
  if(key in this.storage[hashIndex]) { //check if the key entered exists in the storage of the hashIndex 
    return this.storage[hashIndex][key]; //if found, return the value stored at that key 
  } else { //if the key is not found, return an error message
    return 'The key you entered does not exist';
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
  let hashIndex = hashCode(key, this.SIZE); //calculate the hashIndex

  if(key in this.storage[hashIndex]) { //check if the key entered exists in the storage of the hashIndex
    delete this.storage[hashIndex][key]; //if found delete the key
    return 'key has been deleted'; 
  } else return undefined; //if not found, return undefined; 

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

let newHash = new HashTable();
newHash.set(1, 'alice'); //test to set a value
newHash.set(1, 'cathy'); //test to overwrite a value if key is the same
newHash.set(2, 'kevin'); //test to have multiple key/values in the same hashIndex
console.log(newHash.get(1)); //test to get the an existing key
console.log(newHash.get(3)); //test to get a key that does not exist
console.log(newHash.remove(1)); //test to remove an existing key
console.log(newHash.remove(1)); //test to remove a key that does not exist
