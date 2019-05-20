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
  this.stored = 0;
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
  //create hashcode;
  let hashed = hashCode(key, this.SIZE);
  // check if key has already been saved;
  if(!this.storage[hashed]) this.storage[hashed] = {};
  // hold original object length to check new number of items stored
  let ogStored = Object.keys(this.storage[hashed]).length;
  //store new key/value pair
  this.storage[hashed][key] = value;
  //check if there was a new item or if it was a subtitution
  if(Object.keys(this.storage[hashed]).length > ogStored) this.stored ++;
  // if it surpasses 75% of the size, double the size and rehash keys!
  if(this.stored > 0.75*this.SIZE){
    this.SIZE = 2*this.SIZE;
    this.storage.length = 2*this.storage.length;
    this.rehash();
  }
  //return the number of items stored
  return this.stored;
};

HashTable.prototype.rehash = function(){
  for(let i = 0; i < this.storage.length; i++){
    for(item in this.storage[i]){
      this.set(item, this.storage[i][item]);
    };
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
  //save hash code
  let hashed = hashCode(key, this.SIZE);
  //search for the hash code with specific key stored
  //to avoid conflicting with other keys that have the same code
  return this.storage[hashed][key];
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
  //save hashcode
  let hashed = hashCode(key, this.SIZE);
  //check if the item is in storage
  if(!(this.storage[hashed][key])) return undefined;
  //delete if item is in storage
  else {
  delete this.storage[hashed][key];
  this.stored --;
  };
  if(this.SIZE > 16 && this.stored < Math.floor(0.25*this.SIZE)){
    this.SIZE = this.SIZE/2;
    this.rehash();
    this.storage.length = this.storage.length/2;
    };
  return this.stored;
};

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

//tests
const testTable = new HashTable;
for(let i = 0; i < 12; i++){
  testTable.set('apple' + i, i)
};
console.log(testTable);
testTable.set('appleX', 75);
console.log(testTable);

for(let i = 0; i < 6; i++){
  testTable.remove('apple' + i, i)
};
console.log(testTable);
testTable.remove('appleX', 75);
console.log(testTable);