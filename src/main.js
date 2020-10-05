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
  //run key through hash function to get hash code
  let code = hashCode(key, this.SIZE);
  // console.log(code); 

  //check table object to see if the key already exists at given hash code
    //if not, add key/value pair
    //if so, check if key is the same & replace value if so
      //else push new key value pair into same hash code
        //NOTE: I think this means that if at that hash code there is a key value pair with the same key as "key" argument, we overwrite the corresponding value, whereas if the hash code is the same, but not the key, that's a collision and we have to add another key-value pair 
  if (!this.storage[code]) {
    this.storage[code] = {};
  }

  this.storage[code][key] = value;
  //everything's adding at the same index and not sure why yet
  

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
  //get hash code from key and hash function
  //loop through existing elements at hash code to see if one matches the key
    //return
  //else return error message?
  
  let code = hashCode(key, this.SIZE);
  let keyArray = Object.keys(this.storage[code]); 
  for (let i = 0; i < keyArray.length; i++) {
    if (keyArray[i] === key) return keyArray[code][key];
  }
  console.log("this key is not recorded, sry")
  //need to test this more
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


let table = new HashTable();
table.set(10, 94);
table.set(20, 72);
table.set(30, 1);
table.set(21, 6);
table.set(15, 21);
table.set(32, 34);
console.log(table.storage);






// Do not remove!!
module.exports = HashTable;
