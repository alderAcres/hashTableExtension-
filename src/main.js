/**  Evan Hilton - week 1 assement - 12/2/19
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);

  this.spaceUsed = 0;
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
  //check to see key has been used already
  let existingValues = Object.values(this.storage) 

  existingValues.forEach( element => {
    for (let keyUsed in element) {  //spool out all of the key value pairs, we are trying to look at the 'key' in the 'key' : value pair
      if (keyUsed === key){ //if we have a keyUsed already present somewhere in the hashed table. over write the current value with the new
        element[keyUsed] = value;
      }
    }
  });
  
  let hashedKey = hashCode(key, this.SIZE); //otherwise, hash the key, using this to play the tuple into the storage;
  this.storage[hashedKey] = {key : value}; 
  this.spaceUsed += 1;  //this will be used to check if we need to resized, when the value is checked, we might need to shrink or enlarge the array
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
  //hash the key,
  let hashedKey = hashCode(key, this.SIZE);
  if (this.storage[hashedKey] === undefined) {
    return undefined;
  }
  //look for value, if not present return undefined (default value anyway)
  //if value is present, return value
  let keyValPair = this.storage[hashedKey];
  return keyValPair.key;
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
  //if value key value pair is not present, return undefiend 
  //(avoiding using the get/set function since it borke last time with testers)
  let hashedKey = hashCode(key, this.SIZE);
  if (this.storage[hashedKey] === undefined) {
    return undefined;
  }
  //if we have a value in that spot, assign it to a pointer
  let keyValPair = this.storage[hashedKey];
  //overwrite the value to be undefined again (our default value)
  this.storage[hashedKey] = undefined;
  this.spaceUsed -= 1;
  return keyValPair.key;
};




// THESE ARE TESTING STUFF 
let tester = new HashTable();
let testingValss = [];
for (let i = 0; i < 16; i++){
  let j = i;
  testingValss[i] = ("abc" + j);
}
console.log(testingValss);
for (let i = 0; i < testingValss.length; i++) {
  key = testingValss[i]
  tester.set(key, i);
}
tester.set("hello", 99)
console.log(tester);
console.log(tester.get("whatsup"))
console.log(tester.remove("hello"));  //should return 99 (works)
console.log(tester.get("hello")) //should return undefined (works)
tester.set("hello", 98);
console.log(tester.get("hello")) //should return 98 (works)





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
