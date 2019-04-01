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
  this.size = 0;
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

//when called will go through entire hash table and rehash entries with the current this.SIZE varible
HashTable.prototype.rehash = function () {
  const newTable = new Array(this.SIZE);
  const oldTable = this.storage;
  this.storage = newTable;
  this.size = 0; // newtables size is currently 0

  //iterate through old hash table (DO NOT USE this.size as a reference here)
  oldTable.forEach(elm => {
    //for each table entrie, iterate through object and call set on each entry.
    //careful with checking to call rehash, this could lead to an infinite loop here
    for (let key in elm) {
      this.set(key, elm[key]); //calls set which will place it in the new hash table 
    }

  })
}

HashTable.prototype.set = function (key, value) {
  const hash = hashCode(key, this.SIZE);

  if (!this.storage[hash]) this.storage[hash] = {}; // if hash table is empty for this entry - create empty object in that spot

  if (this.storage[hash][key]) console.log("Value exists for Key already - overwriting");
  this.storage[hash][key] = value; //store key/value pair in the hash table object

  this.size++;

  //calculate how full the hash table currently is, if 75% or more double the size and rehash things

  let percentFull = Math.floor(this.size / this.SIZE * 100);
  if (percentFull >= 75) {
    console.log(`Table is currently ${percentFull} percent full - resizeing and rehashing`);
    this.SIZE = this.SIZE * 2;
    this.rehash();
  }


  return this.size; //return total number of items stored in hash
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
HashTable.prototype.get = function (key) {
  const hash = hashCode(key, this.SIZE);;
  if (!this.storage[hash]) console.error("Entry not found in hash table") //log error if hash table is empty (SHOULDN'T HAPPEN EVER)
  if (!this.storage[hash][key]) console.error("Key not found in Hashed Object") //log error if hash table is empty (SHOULDN'T HAPPEN EVER)

  return this.storage[hash][key]; //if either of the error message above are hit, this will be undefined by default
}

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  const hash = hashCode(key, this.SIZE);;
  if (!this.storage[hash]) {
    console.error(`"Entry not found in hash table" Hash:${hash}`) //log error if hash table is empty (SHOULDN'T HAPPEN EVER)
    return undefined;
  }
  if (!this.storage[hash][key]) {
    console.error(`"Key not found in Hashed Object. Hash:${hash} Key:${key}`) //log error if hash table is empty (SHOULDN'T HAPPEN EVER)
    return undefined;
  }
  const retval = this.storage[hash][key];
  delete this.storage[hash][key];
  this.size--;

  //calculate how full the hash table currently is, if 25% or less cut table in half and rehash things
  let percentFull = Math.floor(this.size / this.SIZE * 100);
  if (percentFull <= 25) {
    console.log(`Table is currently ${percentFull} percent full - resizeing and rehashing`);
    this.SIZE = this.SIZE / 2;
    this.rehash();
  }

  return retval;
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