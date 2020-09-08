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
  // declare a variable to establish an address by using our hashCode function
  const address = hashCode(key, this.SIZE);
  // if the address in storage is equal to undefined set currentBucket to an empty array
  if (!this.storage[address]) {
    this.storage[address] = [];
  }
  // push our key/value pair to our array
  this.storage[address].push([key, value]);
  return this.storage;
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
  // declare a variable to establish an address by using our hashCode function
  const address = hashCode(key, this.SIZE);
  // declare a variable for the bucket the address leads us to
  const currentBucket = this.storage[address];
  // initialize a for loop that will check to see if first elem of the array and its corresponding key are equal to key param
  for (let i = 0; i < currentBucket.length; i++) {
    // if so, return second value elem within nested array
    if (currentBucket[i][0] === key) return currentBucket[i][1];
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
  // declare a variable to establish an address by using our hashCode function
  const address = hashCode(key, this.SIZE);
  // declare a variable for the bucket the address leads us to
  const currentBucket = this.storage[address];
  // initialize a loop that will find the key we are looking for within the bucket
  for (let i = 0; i < currentBucket.length; i++) {
    // if found assign the value we will ultimately delete to a variable
    if (currentBucket[i][0] === key) {
      let returnVal = currentBucket[i][1];
      // delete key/value pair
      delete currentBucket[i];
      // return variable
      return returnVal;
    }
  }
  return undefined;
};

const testHash = new HashTable();
testHash.set('blue', 1000);
testHash.set('green', 10000);
console.log(testHash);
testHash.remove('blue');
console.log(testHash);


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
