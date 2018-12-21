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
  //Create a unique hashkey by passing the given key into the hash function
  let hashkey = hashCode(key, this.SIZE);
  //Create a new bin
  let bin = {};
  //Add the key:value pair to that bin object. 
  bin[key] = value;
  //If it doesn't exist, add our bin to the storage object (hashtable) at the hashkey location.
  if(!this.storage[hashkey]){
    this.storage[hashkey] = bin;
  }
  //If a bin already exists in that hashkey location, add the key:value pair to the existing bin.
  else if(this.storage[hashkey]){
    this.storage[hashkey][key] = value;
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
  //Find the hashkey where the value is stored by passing the given key into the hash function.
  let hashkey = hashCode(key,this.SIZE);
  //Use the hashkey to go to that spot in the hashtable.
  //Use the given key to find the value we want.
  //Return that value.
  //If there is nothing in that spot of the hashtable, return a message "Nothing is here."
  if(this.storage[hashkey]){
    return this.storage[hashkey][key];
  }else{
    return "There is nothing here.";
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
  //Create the hashkey by passing the given key into the hash function.
  let hashkey = hashCode(key,this.SIZE);
  //Use the hashkey to go to the specific spot in the hash table.
  //Identify the specific key:value pair by using key, then use delete to get rid of it.
  //If the key doesn't exist there, return undefined.
  if(this.storage[hashkey][key]){
    delete this.storage[hashkey][key];
  }else{
    return undefined;
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

let myTable = new HashTable();
console.log(myTable.set("Adrian", "Diamond"));
console.log(myTable.get("Adrian"))
console.log(myTable.remove("Polly"))
