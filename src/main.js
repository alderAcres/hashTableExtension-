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
  if (this.capacity >= 0.75*this.SIZE){
    this.SIZE = this.SIZE*2
    
    let deepCloned = new Array(this.SIZE)
    
    
    for (var i = 0; i < this.SIZE/2; i++) {
      deepClone = {}
      for (var j = 0; j < this.storage[i].length; j++) {
        let newPosition = hashCode(Object.keys(this.storage[i])[0],this.SIZE);
        let oldPosition = hashCode(Object.keys(this.storage[i])[0],this.SIZE/2)
        deepCloned[newPosition] = this.storage[oldPosition]
    }}

    this.storage = deepCloned
  }
  let position = hashCode(key,this.SIZE);
  if (this.storage[position] === undefined){
    let newObj = {};
    newObj[key] = value;
    return this.storage[position] = [newObj];
  }
  else{
    let newObj = {};
    newObj[key] = value;
    return this.storage[position][this.storage[position].length] = newObj;
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
  let position = hashCode(key,this.SIZE);
  for (let i=0; i<this.storage[position].length; i++){
    if (Object.keys(this.storage[position][i])[0] ===`${key}`){
      return this.storage[position][i][key];
    }
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
  if (this.capacity <= 0.25*this.SIZE && this.SIZE > 16){
    this.SIZE = this.SIZE/2
    let deepCloned = new Array(this.SIZE)
    for (var i = 0; i < this.SIZE/2; i++) {
      for (var j = 0; j < this.storage[i].length; j++) {
        let newPosition = hashCode(Object.keys(this.storage[i])[0],this.SIZE);
        let oldPosition = hashCode(Object.keys(this.storage[i])[0],this.SIZE/2)
        deepCloned[newPosition] = this.storage[oldPosition]
    }}
    this.storage = deepCloned
  }
  let position = hashCode(key,this.SIZE);
  for (let i=0; i<this.storage[position].length; i++){
    if (Object.keys(this.storage[position][i])[0] ===`${key}`){
      let value = JSON.stringify(this.storage[position][i][key]);
      this.storage[position][i][key] = undefined;
      return value = JSON.parse(value)
    }
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
