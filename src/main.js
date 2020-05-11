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

  let hash = hashCode(key, this.SIZE)

  if(!this.storage[hash]){
    
    this.storage[hash]={};

    this.storage[hash][key]=value;
    console.log(this.storage[hash])
  }
  
  else{//if hash location exists/overwrite

    this.storage[hash]=value;
    console.log(this.storage[hash])
  }

  //unsure if this approproiatly handles collsion since it essentially creates a key;pair object whenver it places a value in  a hash. prevents collision, but mayne  not  cleam
  
  // value of hash  location  = value of object of key value pairs within hash location to handle collisions
  

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

  let hash = hashCode(key, this.SIZE)
          // value of hash at location
  //check if it contains multiple values
  if(Object.values(this.storage[hash]).length > 1){

    return this.storage[hash][key];

  }
  else {

    return this.storage[hash]
  }

  return this.storage[hash]
    // if more than one value at location
    // this.storage[hash][key]
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

  let hash = hashCode(key, this.SIZE);

  if (this.storage[hash]){console.log(this.storage[hash])

    let removedVal =this.storage[hash]
    delete this.storage[hash];

    return removedVal
  }

  else{
    
    return undefined 
  }

};

let table = new HashTable

console.log(table.set(7,12))
console.log(table)
console.log(table.get(7))
console.log(table)
console.log(table.remove(7))
console.log(table)
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
