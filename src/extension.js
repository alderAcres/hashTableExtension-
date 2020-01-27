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

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 4;
  this.number = 0;
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
  //find corresponding index
  const index = hashCode(key, this.SIZE);
  this.number++;
  //find 75% of current size
  const limit = this.SIZE * .75;
  console.log(`${key}: ${index}`);
  
  ///ex
  const i = hashCode("name", 8); console.log(i);
  const j = hashCode("hp", 8); console.log(j);
  const k = hashCode("class", 8); console.log(k);

  //before adding, check if number is equal to/greater than the limit
  if(this.number >= limit) {
    //make new array
    let moveHere = new Array(this.SIZE * 2);
    //rehash by iterating over the prev array
    for(let i = 0; i < this.SIZE; i++) {
      //if there is element in prev index, move 
      if(this.storage[i] != undefined) {
        //get all the keys 
        for (let [key, value] of Object.entries(this.storage[i])) {

          //calculate new index with new size
          let newIndex = hashCode(key, this.SIZE*2); console.log(newIndex);
          //assign into new array
          const newObj = {};
          newObj[key] = value;
          moveHere[newIndex] = newObj;
        }
      }
    }
    //double the size, and reassign storage to the new array
    this.SIZE *= 2; 
    this.storage = moveHere;
  }

  //if empty, make a new obj and assign it in array
  if(this.storage[index] === undefined) {
    const obj = {};
    this.storage[index] = obj;
  }

  //if same key already exists, overwrite
  //if collision, make another key-value pair
  this.storage[index][key] = value;
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
  const index = hashCode(key, this.SIZE);
  return this.storage[index][key];
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
  const index = hashCode(key, this.SIZE);

  //if key does not exist in index
  if(this.storage[index] == undefined || this.storage[index][key == undefined]) return undefined;

  const deleted = this.storage[index][key];
  delete this.storage[index][key];
  return deleted;

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


/////////////test
const ex = new HashTable();
ex.set("name", "SB"); 
ex.set("class", "CS"); 
console.log(ex);
console.log(ex.SIZE);
console.log(ex.storage.length)


ex.set("hp", "none"); 
console.log(ex);
console.log(ex.SIZE);
console.log(ex.storage.length)

ex.set("key1", "hi");
ex.set("key2", "hi2");
ex.set("key3", "hi3");
console.log(ex.SIZE);
console.log(ex);