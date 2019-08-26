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
function HashTable(size) {
  this.SIZE = size;

  this.storage = new Array(this.SIZE);

  // variable to store number of items in table
  this.itemCount = 0;
}

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
  // get index from key by using hashCode function
  const index = hashCode(key, this.SIZE);

  // determine what is 3/4 of the size of the table
  const threeFourthsOfSIZE = Math.floor(3 * this.SIZE / 4);

  // boolean to indicate whether adding an item to the table will push the 
  // number of items above 3/4 of size
  const willBeTooBig = this.SIZE + 1 > threeFourthsOfSIZE;

  if (this.storage[index][key]) {
    // if there is already an object, add the key and value as a new key-value pair
    // check if key has already been used
    // if yes, change update the value but do not change itemCount
    this.storage[index][key] = value;
  } else if (!willBeTooBig) { // run this only if the hash table will not have too many entires
    // check if there is already an object at the index
    if (!this.storage[index]) {
      // if there is not, then create an object
      // add 'key' and 'value' as a key-value pair in that object
      this.storage[index] = {};
      this.storage[index][key] = value;

      // and increment itemCount
      this.itemCount += 1;
    } else {
      // else add the new key-value pair and increment itemCount
      this.storage[index][key] = value;
      this.itemCount += 1;
    }
  } else { // run this if we need to resize the table
    // create new table called NewTable with double the size
    const newTable = new HashTable(2 * this.SIZE);

    // iterate through all the elements of the current table 
    this.storage.forEach((el) => {
      
    });
      // add all the values to newTable

    // set current table equal to newTable
  }

  // I DIDN'T FINISH REVISING THIS FUNCTION AHHH

  

  // return itemCount
  return this.itemCount;
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
  // get index from key by using hashCode function
  const index = hashCode(key, this.SIZE);

  // use the key at the given index to get the value at that location
  // return this
  return this.storage[index][key];
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
  // get index from key by using hashCode function
  const index = hashCode(key, this.SIZE);

  // if there is an item with that key, then delete it and return it
  if (this.storage[index][key]) {
    // save the value as itemToReturn
    const itemToReturn = this.storage[index][key];

    // delete the key-value pair
    delete this.storage[index][key];

    // decrement itemCount
    this.itemCount -= 1;

    // return itemToReturn
    return itemToReturn;
  }

  // if there is no item with the key, return undefined
  if (!this.storage[index][key]) return undefined;
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
