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



// YOUR CODE ABOVE
/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.things = [];
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

HashTable.prototype.reHash = function(){
  this.storage = new Array(this.SIZE);
  for(let i in this.things){
    let key = Object.keys(this.things[i])[0];
    let value = this.things[i][key];
    this.set(key, value);
    this.things.pop();
  }
}



HashTable.prototype.set = function(key, value) {
  let index = hashCode(key, this.SIZE);
  if(this.storage[index] == undefined){
    this.storage[index] = {[key]: value};
  } else if(Array.isArray(this.storage[index])){
    this.storage[index].push({[key]: value});
  } else if (!Array.isArray(this.storage[index] && typeof(this.storage[index]) == "object")){
    let temp = this.storage[index];
    this.storage[index] = [temp, {[key]: value}];
  }

  this.things.push({[key]: value});
  if(this.things.length/this.SIZE >= 0.75){
    this.SIZE *= 2;
    this.reHash;
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

  let index = hashCode(key, this.SIZE);
  if(Array.isArray(this.storage[index])){ //if there have been collisions before
    for(let i of this.storage[index]){
      if(Object.keys(i)[0] == key){
        return i[key];
      }
    }
  } else {
    return this.storage[index][key];
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
  let index = hashCode(key, this.SIZE);
  if(Array.isArray(this.storage[index])){
    for(let i in this.storage[index]){
      if(Object.keys(this.storage[index][i])[0] == key){
        this.storage[index].splice(i, 1);
      }
    }
  } else {
    delete this.storage[index];
  }
  
  for(let i in this.things){
    if(Object.keys(this.things[i])[0] == key){
      this.things.splice(i, 1);
    }
  }
  if(this.things.length/this.SIZE <= 0.25){
    this.SIZE *= 0.5;
    this.reHash();
  }
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