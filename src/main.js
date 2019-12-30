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
  //first we get the index by running the hashcode passing in the key and the storage size.
  const index = hashCode(key, this.SIZE);
  //checking to see if the storage index has a value in it. if it doesn't have a OBJ then we assign it an obj
  if(this.storage[index] === undefined){
    //creating a empty object so we can pass this obj to the index;
    const obj = {};
    //assigning the empty obj with the key value pair;
    obj[key] = value;
    //assign the storage index with the obj
    this.storage[index] = obj;
  }else{
    //if the storage index already has an obj assigned to it. Add the key value pair to that obj.
    this.storage[index][key] = value;
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
  //we have to iterate over our storage to find the key
  for(let i = 0; i < this.storage.length; i += 1){
    //check to see if index has a object inside and if it does have an obj does it make the key
    if (typeof this.storage[i] === 'object' && this.storage[i].hasOwnProperty(key) === true){
      //return key value;
      return this.storage[i][key]
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
  //iterate over our hashtable to find the matching key.
  for (let i = 0; i < this.storage.length; i += 1) {
    //check to see if index has a object inside and if it does have an obj does it make the key
    if (typeof this.storage[i] === 'object' && this.storage[i].hasOwnProperty(key) === true){
    //once we find the match we have to create a variable to store the current key value pair;
      const holder = this.storage[i][key];
      // delete the current key value pair
      delete this.storage[i][key];
      // return the variable that was holding the key value pair that we deleted.
      return holder;
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


const hash = new HashTable();

console.log(hash)

hash.set('red', 11);
hash.set('green', 14);
hash.set('blue', 16);
console.log(hash.storage.length)

console.log(hash)

console.log(hash.get('red'));
console.log(hash)

console.log(hash.remove('red'));

console.log(hash)