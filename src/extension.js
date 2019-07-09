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
// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------


function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
  for(let i = 0 ; i< this.storage.length; i++){
    this.storage[i] ={}
  }
  console.log(this.storage)
}
// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

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
  const hashedIndex = hashCode(key,this.SIZE)
  const lengthOfStorage = Object.keys(this.storage).length
  
  if(this.SIZE > lengthOfStorage/0.75){
    this.SIZE = this.SIZE * 2
    // for(let index in this.storage){
    //   console.log(this.storage[hashedIndex] = value)
    // }
    console.log(this.storage[hashedIndex][key] = value)

  }else{
    console.log(this.storage[hashedIndex][key] = value)
  }
};
// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

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
  const hashedIndex = hashCode(key,this.SIZE)
  return this.storage[hashedIndex][key]
};
// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  const hashedIndex = hashCode(key,this.SIZE)
  if(this.SIZE > 16 && Math.floor(this.size/0.25)){
    this.SIZE = this.SIZE/2
    delete this.storage[hashedIndex][key]

  }else{
  delete this.storage[hashedIndex][key]
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
// ----------------------------------------------------------------------------------------------------------
//create an instance of a hastable
// ----------------------------------------------------------------------------------------------------------

let entry1 = new HashTable

console.log(hashCode('use43esqrgc', 16))
console.log(hashCode('use43esqrgda', 16))
// ----------------------------------------------------------------------------------------------------------
//place data in table with set method
// ----------------------------------------------------------------------------------------------------------
entry1.set('username', "password")
entry1.set('wowethan', "greatmoves")
entry1.set('charles', "barkely")
entry1.set('use43esqrgc', "banter")
entry1.set('use43esqrgda', "banter")
// ----------------------------------------------------------------------------------------------------------
//retrieve data from table with get method
// ----------------------------------------------------------------------------------------------------------
console.log(entry1.get('username'))
console.log(entry1.get('greatmoves'))
console.log(entry1.get('barkely'))

// ----------------------------------------------------------------------------------------------------------
//the full hash table
// ----------------------------------------------------------------------------------------------------------
console.log(entry1.storage)

// Do not remove!!
module.exports = HashTable;