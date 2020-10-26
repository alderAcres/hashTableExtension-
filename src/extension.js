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

// what set does is takes the data given, scrambles up the key
// does some div and that determines where to put the key in mem
// sometimes more than one key wants to go in the same spot
// so the first time we put a thing in a slot, we put an empty object in the slot
// this was that slow can hold multiple data that are unique

// extension
// if adding a new item makes the table more than 75% full, 
// add the new entry
// double the hash size and rehash all the data 

HashTable.prototype.set = function(key, value) {
  // first we check to see how full the table is

  // if its under 75% full, add as usual

  // if its going to be over 75 with this addition

  // make a brand new storage with double the size

  // iterate thru old storage finding where it isn't undefined

  // get all the key values and hash them again at the new size

  // put them in new storage

  // delete old storage

  // make new storage the current storage

  // so first we put the key arg thru the hashing function
  const hashedKey = hashCode(key, this.SIZE);
  // we create an empty object and put it in that slot gotten from the hash func
  this.storage[hashedKey] = {};
  // we put our original key val params into that object
  this.storage[hashedKey][key] = value;
  // return the hash table
  return this;
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

// what get does is access the place in memory where the key lives
// it lets us know what the value is at key
// the key needs to be hashed so we know where to look in mem

HashTable.prototype.get = function(key) {
  // first we hash the key arg
  const hashedKey = hashCode(key, this.SIZE);
  console.log(hashedKey);
  // then we check memory at that pointer
  // return the value found at that place
  // if the place in mem at hashedKey is empty we return a string saying so
  if (this.storage[hashedKey] === undefined) {
    return undefined;
  } else {
    // if a value is there we return the val at key
  return this.storage[hashedKey][key];
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

// what remove does is delete an existing kv pair from the hashtable
// if the key isn't in the table, return undefined

HashTable.prototype.remove = function(key) {
  // first we hash the key arg
  const hashedKey = hashCode(key, this.SIZE);
  console.log(hashedKey);
  console.log(this.storage[hashedKey])
  // check memory at the calculated pointer
  // if the place in memory is undefined it means that kv pair isn't in the table
  // return undefined
  if (this.storage[hashedKey] === undefined) {
    return undefined;
  } else {
    // delete the kv pair and return the table
  delete this.storage[hashedKey][key];
  return this;
  }
};

const migHash = new HashTable();
migHash.set('pizza', true);
migHash.set('water', 6);
migHash.set('water', 'blue'); // should overwrite 6
migHash.set('pants', 'yes');
console.log(migHash)
console.log(migHash.get('pizza')); // true
console.log(migHash.get('blankblank')); // undefined
console.log(migHash);
console.log(migHash.remove('pizza'));
console.log(migHash);

// // Do not modify
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


// YOUR CODE ABOVE

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
