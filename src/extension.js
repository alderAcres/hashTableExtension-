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
// Object.keys(obj).length
function HashTable() {
  this.SIZE = 16;
  this.keyCache = [];
  
  this.storage = new Array(this.SIZE);
  for ( let i = 0; i < this.SIZE; i++ ) {
    this.storage[i] = {};
  }
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

    // increase and re-set all old vals into new hashtable
    if ( (this.keyCache.length /  this.SIZE) > .75 ) {
        let newLargerHashTable = new HashTable();
        newLargerHashTable.SIZE = this.SIZE * 2;

        for ( let i = 0; i < this.keyCache.length; i++ ) {
            let oldHashVal = hashCode(this.keyCache[i], this.SIZE);
            let oldValueVal;
            let oldKeyVal = this.keyCache[i];

            oldValueVal = this.storage[oldHashVal][oldKeyVal];
            newLargerHashTable.set(oldKeyVal, oldValueVal);
        }
        this = newLargerHashTable;
    }

    let theHash = hashCode(key, this.SIZE);
    this.storage[theHash][key] = value;
    this.keyCache.push(key);

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
    let theHash = hashCode(key, this.SIZE);
    return this.storage[theHash][key];

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
    let theHash = hashCode(key, this.SIZE);
    let returnVal;
    if ( this.storage[theHash][key] !== undefined ) {
        returnVal = this.storage[theHash][key];
        delete this.storage[theHash][key];
        if ( this.keyCache.indexOf(key) > -1 ) this.keyCache.splice(this.keyCache.indexOf(key), 1);
        return returnVal;
    } else return undefined;

};


let testHT = new HashTable();
testHT.set("mom", 35);
console.log('​testHT', testHT.keyCache);
console.log('get', testHT.get("mom"));
console.log('remove', testHT.remove("mom"));
console.log('​testHT', testHT.keyCache);
console.log("end");

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
