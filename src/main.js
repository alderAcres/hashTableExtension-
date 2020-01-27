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
//create counter to keep track of how many objects are stored in the array.
let counter = 0;
/*check to see if the element in the storage array is undefined, if so assign it 
an empty object to be able to account for collision*/
if(this.storage[hashCode(key, this.SIZE) == undefined]){
  this.storage[hashCode(key, this.SIZE)] = {};
}
//assign the key and value to the object in the ith element of the array
this.storage[hashCode(key,this.SIZE)][key] = value;

//use a loop to iterate through array and count each element stored in objects.
for(let i = 0; i < this.storage.length; i++)
  for(key in this.storage[i]){
    counter++;
  }

//return number of items stored in table.
return counter;
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
//if no value is stored, return error string
if(this.storage[hashCode(key, this.SIZE)] == undefined){
  return 'no value stored with that key';
} else {
//else return value that is stored in that location with specific key
return this.storage[hashCode(key,this.SIZE)][key];
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
//check if key doesn't exist, if so then return undefined
if(!this.storage[hashCode(key,this.SIZE)][key]){
  return undefined;
}
//create variable and store the value that will be deleted and returned.
let deletedValue = this.storage[hashCode(key,this.length)][key];
//delete the key/value pair
delete this.storage[hashCode(key,this.SIZE)][key];
//return the deleted value
return deletedValue;
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

