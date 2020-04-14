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
  this.itemsStored = 0;
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
  const hashAddress = hashCode(key, this.SIZE);
  
  if (this.storage[hashAddress] == undefined) {
    const obj = {};
    obj[key] = value;
    this.storage[hashAddress] = obj;
    return ++this.itemsStored;
  } else {
    if (this.storage[hashAddress][key] == undefined){
        ++this.itemsStored
    } 
    this.storage[hashAddress][key] = value;
    // console.log(this.storage);
    return this.itemsStored;
  };
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
  const hashAddress = hashCode(key, this.SIZE);

  if (this.storage[hashAddress] === undefined || this.storage[hashAddress][key] === undefined) {
    throw new Error(`HashTable get: no item found with key **${key}** provided ! `);
  }
  return this.storage[hashAddress][key];
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
  let hashAddress = hashCode(key, this.SIZE);
  
  // console.log(this.storage[hashAddress], key)
  if (this.storage[hashAddress] === undefined || this.storage[hashAddress][key] === undefined) {
    throw Error(`HashTable get: no item found with key ${key} provided ! `);
  } else {
    deletedValue = this.storage[hashAddress][key];
    delete this.storage[hashAddress][key]
    this.itemsStored--;
    return deletedValue;
  }

};

let hashtable = new HashTable();
console.log(hashtable.set("male", "tommy")); //1
console.log(hashtable.set("male", "harry"));  //1
console.log(hashtable.set("female", "katty"))  //2
console.log(hashtable.get("male")); //harry
console.log(hashtable.remove("male")) //harry


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
