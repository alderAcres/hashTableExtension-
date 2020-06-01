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
  //use hashCode to obtain a number where key:value pair will be stored
  let num = hashCode(string, this.Size);
    //assign number to key
    key = num;
    //store value at that assigned number which is assoicated with with key
    this.storage[key] = value;
    //not sure how to handle collision
};
 
//I'm not sure how to write my tests for constructors functions:
//I create a new instance of a HashTable by assigning it to a variable;
//I invoke it and try to add values
//I know that my newHash has access to the methods created because they are stored in the prototype section of this object 
//I apply the method to the value of interest to see the result
// used mdn as a resource but did not quite understand: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor

let newHash = new HashTable();
newHash() = {a: "Cyn"};
newHash()= {b:"NYC"};
console.log(newHash.get("Cyn"))

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
  //use hashCode to obtain a number that was assigned to the key and where it's value was stored;
  let num = hashCode(string, this.Size);
    //assign number to that key;
    key = num;
    //store value at that assigned number which is assoicated with with key
    return this.storage[key];
    
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
  //use hashCode to obtain a number that was assigned to the key and where it's value was stored;
  let num = hashCode(string, this.Size);
    //assign number to that key;
    key = num;
    //if key does not exist return undefined;
    if(!this.storage[key] === undefined) {
      return undefined;
    }
    //delete that key at that number inorder to remove from hash table storage
    delete this.storage[key];
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
