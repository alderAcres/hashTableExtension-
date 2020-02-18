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
  this.number = 0;
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
  if (this.number + 1 > .75*(this.SIZE)){
    //size is 16 so anything over 12 would need rehashing
    //need to rehash everything
    var stor = {};
    for (var i =0; i<this.SIZE; i++){
      for (var prop in this.storage[i]){
        stor[prop]=this.storage[i][prop];
      }
    }
    this.SIZE=this.SIZE*2;
    this.number=0;
    for (var pro in stor){
      const ind = hashCode(pro,this.SIZE);
      if (this.storage[ind]===null){
        this.storage[ind]={};
        this.storage[ind][pro] = stor[pro];
        this.number++;
      }else if(this.storage[ind][pro]){
        this.storage[ind][pro]=stor[pro];
      }else{
        this.storage[ind][pro]=stor[pro];
        this.number++;
      }
    }
  }
  const index = hashCode(key,this.SIZE);
  if (this.storage[index]===null){
      this.storage[index]={};
      this.storage[index][key] = value;
      this.number++;
  }else if(this.storage[index][key]){
    this.storage[index][key]=value;
  }else{
    this.storage[index][key]=value;
    this.number++;
  }
  return this.number;
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
  const index = hashCode(key,this.SIZE);
  return this.storage[index][key];
};


// 2. remove:
// - If the hash table's SIZE is greater than 16 and the result of removing the
//   item drops the number of stored items to be less than 25% of the hash table's SIZE
//   (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  if (this.SIZE>16 && this.number - 1 < Math.floor(.25*this.SIZE)){
    var stor = {};
    for (var i =0; i<this.SIZE; i++){
      for (var prop in this.storage[i]){
        stor[prop]=this.storage[i][prop];
      }
    }
    this.SIZE=this.SIZE/2;
    this.number=0;
    for (var pro in stor){
      const ind = hashCode(pro,this.SIZE);
      if (this.storage[ind]===null){
        this.storage[ind]={};
        this.storage[ind][pro] = stor[pro];
        this.number++;
      }else if(this.storage[ind][pro]){
        this.storage[ind][pro]=stor[pro];
      }else{
        this.storage[ind][pro]=stor[pro];
        this.number++;
      }
    }
  }
  const index = hashCode(key,this.SIZE);
  if (this.storage[index][key]===null){
    return undefined;
  }else{
    var result=this.storage[index][key];
    delete this.storage[index][key];
    this.number--;
    return result;
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
