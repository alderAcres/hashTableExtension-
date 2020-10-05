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
  this.storage = new Array(this.SIZE);
  this.items = 0;
}

/**
* set - Adds given value to the hash table with specified key.
*
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately. (object?)
      If adding the new item will push the number of stored items to over 75% of the hash table's SIZE, 
      then double the hash table's SIZE and rehash everything
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  //check for resize
  if ((this.items + 1) > (this.SIZE*(3/4))){
    // temporarily store all key-value pairs in a map
    const tempMap = new Map();
    for (let i = 0; i < this.SIZE; i++){
      if (this.storage[i] !== undefined){
        for (let key in this.storage[i]){
          tempMap.set(key, this.storage[i][key]);
        }
      }
    }
    
    //double size, clear storage and reset num items
    this.SIZE = this.SIZE * 2;
    this.storage = new Array(this.SIZE);
    this.items = 0;

    //iterate over items in tempMap to rehash and assign to storage
    for (let entry of tempMap.entries()){
      // console.log('in the rehash step of set')
      // console.log(this.storage, entry)
      let hashIndex = hashCode(entry[0], this.SIZE);
      if (this.storage[hashIndex] === undefined) {
        this.storage[hashIndex] = {}
      };
      this.storage[hashIndex][entry[0]] = entry[1];
      this.items++;
    }
  }

  //deal with input
  //invoke the hashCode function, passing in key and size to get a hashIndex, store as hashIndex
  let hashIndex = hashCode(key, this.SIZE);
  // console.log(hashIndex)

  //assign value to hashIndex on hash table as obj with key-val pairs to handle collisions
  if (this.storage[hashIndex] === undefined) {
    this.storage[hashIndex] = {}
  };
  this.storage[hashIndex][key] = value;

  //pre increment and return number of items in hash table
  return ++this.items;
  
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
  //invoke the hashCode function, passing in key and size to get a hashIndex, store as hashIndex
  let hashIndex = hashCode(key, this.SIZE);

  //return the value at hashIndex at key
  return this.storage[hashIndex][key];
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

  //invoke the hashCode function, passing in key and size to get a hashIndex, store as hashIndex
  let hashIndex = hashCode(key, this.SIZE);
  // console.log(this.storage)
  // console.log(this.storage[hashIndex])

  //store the value at key at hashIndex as temp
  let temp = this.storage[hashIndex][key];

  //delete the key/val pair at hashIndex and decrement this.items
  delete this.storage[hashIndex][key];
  this.items--;

  //is resize necessary?
  if ((this.items) < (this.SIZE*(1/4))){
    // temporarily store all key-value pairs in a map
    const tempMap = new Map();
    for (let i = 0; i < this.SIZE; i++){
      if (this.storage[i] !== undefined){
        for (let key in this.storage[i]){
          tempMap.set(key, this.storage[i][key])
        }
      }
    }
    
    //halve size, clear storage and reset num items
    this.SIZE = this.SIZE / 2;
    this.storage = new Array(this.SIZE);
    this.items = 0;

    //iterate over items in tempMap to rehash and assign to storage
    for (let entry of tempMap.entries()){
      let hashIndex = hashCode(entry[0], this.SIZE);
      if (this.storage[hashIndex] === undefined) {
        this.storage[hashIndex] = {}
      };
      this.storage[hashIndex][entry[0]] = entry[1];
      this.items++;
    }
  }

  //return temp
  return temp;
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


// //test cases
// const myHash = new HashTable();
// myHash.set('key1', true); 
// myHash.set('key2', false);
// myHash.set('key3', 3); 
// myHash.set('key4', 6);
// myHash.set('hi', 1);
// myHash.set('hi2', 2);
// myHash.set('hi3', 3);
// myHash.set('hi4', 4);
// myHash.set('hi6', 5);
// myHash.set('hi7', 5);
// myHash.set('hi8', 5);
// myHash.set('hi9', 5);
// myHash.set('testing1', 5);
// myHash.set('testing2', 5);
// myHash.set('testitestting2ng1', 5);
// console.log(myHash.SIZE, myHash.storage) //should be array of size 32 
// myHash.remove('key1');
// myHash.remove('key2');
// myHash.remove('key3'); 
// myHash.remove('key4');
// myHash.remove('hi');
// myHash.remove('hi2');
// myHash.remove('hi3');
// myHash.remove('hi4');
// myHash.remove('hi6');

// console.log(myHash.SIZE, myHash.storage) //should be array of size 16

