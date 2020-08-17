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
  // for (let i =0; i<this.storage.length; i++){
  //   //prevent collision
  //   this.storage[i] = new Map();
  //}
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
  //index of where we want to store value
const storeVal = hashCode(key, this.size);
//if its empty
if(!this.storage[storeVal]) {
  //create an obj and sets its value with key/value
const obj = {key:value};
//assign the value for that index in that array storage to the obj
this.storage[storeVal] = obj;

} else {
  //adding key/value pair to the obj at the index of the array of storage 
  let obj = this.storage[StoreVal];
  const hold = Object.keys(this.storage[StoreVal]);
  for(let i = 0; i < hold.length +1; i++) {
   if(!obj[hold[i]]) {
   this.storage[storeVal].key = value;
   //console.log(this.storage[storeVal])
  }
}
}
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
  const storeVal = hashCode(key, this.size);
  const hold = Object.keys(this.storage[StoreVal]);
if(this.storage[hashVal].key){
  return hold[0]
}
  return this.storage[hashVal].key
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
  const storeVal = hashCode(key, this.size);
  const deleted = this.storage[storeVal].key;
  if((!this.storage[storeVal])) { 
    return undefined; 
  } else {
  //delete this.storage
  delete this.storage[storeVal].key;
  return deleted;
  };
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
