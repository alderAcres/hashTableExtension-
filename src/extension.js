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
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash] === undefined) this.storage[hash] = {};
  this.storage[hash][key] = value;

  
  // check if adding new item will push  the number of stored items to over 75% of the hash's SIZE
    // create counter variable to keep track of keys across this.storage array indexes and initialize to 0
    // let countOfKeys = 0;
    // declare keys variable to keep track of keys of objects within indexes of this.storage
    // let keys = [];
    // declare savedKeys variable to keep track of keys if we need to rehash them
    // let savedKeys = [];

    // for loop to iterate over each array index in this.storage
    // for (let i =0; i<this.storage.length; i++) {
      // create a new variable to store keys array from Object.keys(this.storage[i])
      // keys = Object.keys(this.storage[i]);
      // use forEach to iterate over keys and for each element increment countOfKeys by 1;
      // keys.forEach(el => countOfKeys++);
    
    // check if count is ever greater than 75% of hash's SIZE
    // if count > this.SIZE*.75
      // save all previous keys if it is greater by iterating through this.storage array and then through the objects within the indexes
      // for (let i=0; i<this.storage.length; i++() {
        // keys = Object.keys(this.storage[i]);
      // can create a new array to store all key values and concatenate them all onto that array
        // savedKeys = savedKeys.concatenate(keys);
      // if it is greater than 75% of hash's SIZE double hash size
      //  this.SIZE = this.SIZE*2;
      // set storagesize to whatever double the this.SIZE is;
        // this.storage = new Array(this.SIZE);
      // run set function on every value in savedKeys
        // not sure how i would do this - feel like I would need to create an object or new class outside of set in order to store the savedKeys
        // and do all this functionality outside of my set function as opposed to inside it 
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
  const hash = hashCode(key, this.SIZE);
  return this.storage[hash][key];
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
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash][key]) {
    let returned = this.storage[hash][key]
    delete this.storage[hash][key]
    return returned;
  }
  return undefined;


  // check if removing item will push the number of stored items to less than 25% of the hash's SIZE
    // create counter variable to keep track of keys across this.storage array indexes and initialize to 0
    // let countOfKeys = 0;
    // declare keys variable to keep track of keys of objects within indexes of this.storage
    // let keys = [];
    

    // for loop to iterate over each array index in this.storage
    // for (let i =0; i<this.storage.length; i++) {
      // create a new variable to store keys array from Object.keys(this.storage[i])
      // keys = Object.keys(this.storage[i]);
      // use forEach to iterate over keys and for each element increment countOfKeys by 1;
      // keys.forEach(el => countOfKeys++);
    
    // check if count is ever less than 25 of hash's SIZE
    // if count < this.SIZE*.25
      // delete item to be removed
        // delete this.storage[hash][key]
      // save all previous keys by iterating through this.storage array and then through the objects within the indexes
      // for (let i=0; i<this.storage.length; i++() {
        // keys = Object.keys(this.storage[i]);
      // can create a new array to store all key values and concatenate them all onto that array
        // savedKeys = savedKeys.concatenate(keys);
      // if it is less than 25% of hash's SIZE double hash size
      // this.SIZE = this.SIZE*.5;
      // set storagesize to whatever less than this.SIZE is;
        // this.storage = new Array(this.SIZE);
      // run set function on every value in savedKeys
        // not sure how i would do this - feel like I would need to create an object or new class outside of set in order to store the savedKeys
        // because of same issues mentioned above in set

};

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
