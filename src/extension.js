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
  this.occupiedSpace = 0;
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
  let index = hashCode(key, this.SIZE);
  if(!this.storage[index]){
    this.storage[index] = {};
  }
  if(!this.storage[index][key]){
    this.occupiedSpace++;
  }
  this.storage[index][key] = value;
  if(this.occupiedSpace > (this.SIZE * 3 / 4)){
    this.reIndex(this.SIZE * 2);
    //console.log("size increased!");
  }
  return this.occupiedSpace;
};

HashTable.prototype.reIndex = function(newSize){
  let allTheElements = {};
  for(let i = 0; i < this.storage.length; i ++){
    if(this.storage[i] !== undefined){
      let keys = Object.keys(this.storage[i]);
      for(let j = 0; j < keys.length; j++){
        allTheElements[keys[j]] = this.get(keys[j]);
      }
    }
  }
  let keys = Object.keys(allTheElements);
  this.SIZE = newSize;
  this.storage = new Array(this.SIZE);
  this.occupiedSpace = 0;
  for(let i = 0; i < keys.length; i++){
    this.set(keys[i], allTheElements[keys[i]]);
  }
  return allTheElements;
}

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
  let index = hashCode(key, this.SIZE);
  if(!this.storage[index] || !this.storage[index][key])
    return;
  else
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
  let index = hashCode(key,this.SIZE);
  let returnVal;
  if(!this.storage[index] || !this.storage[index][key])
    return;
  else {
    this.occupiedSpace --;
    returnVal = this.storage[index][key];
    delete this.storage[index][key];
  }
  if(this.occupiedSpace < (this.SIZE * 1 / 4) && this.SIZE > 16){
    this.reIndex(this.SIZE / 2);
    //console.log("size decreased!");
  }
  return returnVal;
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
  //console.log(Math.abs(hash) % size);
  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;




