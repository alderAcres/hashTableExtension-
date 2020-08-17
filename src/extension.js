/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW

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
  // declare a variable hash and initalize it to the ER of invoking hashCode with key and this.SIZE passed in
  const hash = hashCode(key, this.SIZE);
  // test if that hash location exists
  if (this.storage[hash]) {
    // if so, set the key value in the hash index
    this.storage[hash][key] = value;
    // otherwise
  } else {
    // if this.storage is NOT 75% 'full', initialize as object to handle collisions
    // create varaible that represents capacity of this.storage: i:e; this.storage.length - amount of '' * 10 --> 10 - 4 * 10 = 60%
    
    // Couldn figure this out!
    
    // this.storage.forEach((el) => {
    //   console.log(el)
    //   if (!el) {
    //     count += 1; //? 
    //     console.log(count)
    //   }
    // });


    this.storage[hash] = {};
    // set the key/value to the hash index
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
HashTable.prototype.get = function(key) {
  // declare a variable hash and initalize it to the ER of invoking hashCode with key and this.SIZE passed in
  const hash = hashCode(key, this.SIZE);
  // return key-value sitting at hash
  return this.storage[hash][key]; //? 

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
  // declare a variable hash and initalize it to the ER of invoking hashCode with key and this.SIZE passed in
  const hash = hashCode(key, this.SIZE);
  // Save removed item placeholder variable
  const removed = this.storage[hash][key];
  // delete item at hash index with corresponding key
  delete this.storage[hash][key];
  // return removed 
  return removed;
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

// Tests
const testHash = new HashTable; 
testHash.set('pink', '#FFC0CB'); //? 
testHash.set('lightPink', '#FFB6C1'); //?
testHash.storage; //? 
testHash.get('pink'); //?
testHash.remove('lightPink'); //?


// Do not remove!!
module.exports = HashTable;


// YOUR CODE ABOVE

// function hashCode(string, size) {
//   'use strict';
  
//   let hash = 0;
//   if (string.length === 0) return hash;
  
//   for (let i = 0; i < string.length; i++) {
//     const letter = string.charCodeAt(i);
//     hash = ((hash << 5) - hash) + letter;
//     hash = hash & hash; // Convert to 32bit integer
//   }
  
//   return Math.abs(hash) % size;
// }

// // Do not remove!!
// module.exports = HashTable;
