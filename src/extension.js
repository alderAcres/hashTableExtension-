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
  this.items = 0;
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
  //increment the number of items in the hash table
  this.items++;
  //check if the number of items in hash table is over 75% of its size
  if(this.items > Math.floor(this.SIZE*1.75)){
    this.SIZE = this.SIZE*2;
    //rehash everything before adding the value
    //create a new storage
    let newStorage = new Array(this.SIZE);
    //copy the values in this storage to new one
    this.storage.forEach((el)=>{
      if(el){
        for(let key in el){
          let newIndex = hashCode(key, this.SIZE);
          if(!newStorage[newIndex]) newStorage[newIndex] = {};
          newStorage[newIndex] = el[key];
        }
      }
    })
    this.storage = newStorage;

  }
  //get an index from the hash function provided using the key and size of the buckets
  let index = hashCode(key, this.SIZE);
  
  //check if the buckets already has the key and create an obj to store the key-value pair
  if(!this.storage[index]) this.storage[index] = {};

  //store the key-value pair in the right index
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
  //get an index from the hash function provided using the key and size of the buckets
  let index = hashCode(key, this.SIZE);
  //return the value stored at index using key since the key-value pair is stored in obj form
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
  //get an index from the hash function provided using the key and size of the buckets
  let index = hashCode(key, this.SIZE);
  //check if the key exist, 
  if(!this.storage[index][key])
    //if not, return undefined
    return undefined;
    //otherwise save the value in a new var
  else{
    let removed = this.storage[index][key];
    //remove the entry in the obj at the index
    delete this.storage[index][key];
    //decrement the number of items in the hash table
    this.items--;
    //return the value using the new store var
    return removed;
  }
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

hashT.set("hi", "bye");
hashT.set("hello", "goodbye");
hashT.set("welcome", "thanks");
hashT.set("nice", "you, too");
console.log(hashT);
hashT.set("nice", "good to know");
hashT.set(0, 1000);
console.log(hashT);
