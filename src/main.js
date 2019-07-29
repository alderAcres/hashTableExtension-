// ## How do I get started?
// 1. Fork this repo
// 1. Clone your fork
// 1. Complete the challenge in located in `src/main.js`.
//   - You must implement the `get`, `set`, and `remove` functions on the HashTable prototype. 
//   - Each function is commented with its specifications. Implement the functions exactly as their documentation prescribes. You may assume the functions will be called with the types listed in their documentation.
//   - **important** Be sure to return the specified return value from each function's documentation
// 1. Extension: Copy-paste your working code from `src/main.js` into `src/extension.js`.
//   - In `extension.js` implement resizing in the `set` and `remove` methods.

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.numberItemsStored = 0;
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
  // 1. handle collisions (use an array);
  // 2. create a variable, set it equal to the bucket location (run the key through the hash function)
  // 3. create an antiCollision array
  // 4. check if anything exists at bucket location
  // 5. if nothing exists, add the antiCollision array
  // 6. add [key, value] as a subArray in the antiCollision array
  // 7. if something DOES exist inside the antiCollision array, iterate through and check all keys.
      // if key matches, overwrite the value 
      //    (note; could probably just overwrite that subArray... with the new subArray, since key is the same...)
  // 8. adjust constructor function to have a key "numberValuesStored"
  // 9. increase the value of numberItemsStored by 1
    
  const bucketLocation = hashCode(key, this.SIZE);
  const antiCollision = [];

  if (this.storage[bucketLocation] === undefined){
    this.storage[bucketLocation] = antiCollision;
    this.storage[bucketLocation].push([key, value]);
    this.numberItemsStored += 1;
    return this.numberItemsStored;
  }
  if (this.storage[bucketLocation] !== undefined){
    for (let i = 0; i < this.storage[bucketLocation].length; i += 1){
      if (this.storage[bucketLocation][i][0] === key) this.storage[bucketLocation][i][1] = value;
      this.numberItemsStored += 1
      return this.numberItemsStored;
    }
    this.storage[bucketLocation].push([key, value]);
    return;
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

  /*
  1. create a variable, intiialize it to hashTable location (returned value from hash function);
  2. once at specific location, loop through elements in antiCollision array
    - check if subArray[0] === key. If so, return subArray[1]
  3. if loop through whole array, and nothing is present, return "Key is not stored in HashTable."
  */

  const bucketLocation = hashCode(key, this.SIZE);

  for (let i = 0; i < this.storage[bucketLocation].length; i += 1){
    if (this.storage[bucketLocation][i][0] === key) return this.storage[bucketLocation][i][1];
  }

  return "Requested key is not stored in HashTable.";


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

  /*
  1. create a variable, initialize it to bucketLocation (returned value from hashFunction);
  2. iterate through all subArrays present at bucketLocation;
  3. if requested key is found:
    - overwrite the subArray to undefined;
    - i.e. alternatively, use the .splice() array method to actually delete the information at that location
      - (this will also reindex the remaining elements, so you don't have a hole in that spot, thereby managing storage space better);
  4. if element is removed from hashTable, decrease numberItemsStored by 1
  5. if key is not found, return undefined
  */

  const bucketLocation = hashCode(key, this.SIZE);
  let removedValue;

  for (let i = 0; i < this.storage[bucketLocation].length; i += 1){
    if (this.storage[bucketLocation][i][0] === key){
      removedValue = this.storage[bucketLocation][i][1];
      this.storage[bucketLocation].splice(i, 1);
      this.numberItemsStored -= 1;
      return removedValue;
    }
  }

  return undefined;

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
