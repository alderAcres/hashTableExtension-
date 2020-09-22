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
  this.SIZE = 4;
  this.limit = Math.floor(this.SIZE * .75)
  this.lowerLimit = Math.floor(this.SIZE * .25); 
  this.storage = new Array(this.SIZE);
  this.counter = 0; 
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
  
  //check if it is already there. 
  const index = hashCode(key, this.SIZE)
  if (this.storage.hasOwnProperty(index)) {
    if (this.storage[index].hasOwnProperty(key)) {
      return this.counter; 
    }
  }

  this.counter++; 
  if (this.counter > this.limit) {
    this.rehash('larger'); // make the hash table larger. 
  }

  if (this.storage[index] === undefined) {
    this.storage[index] = {}; 
  }

  this.storage[index][key] = value; 
  return this.counter; 

};

HashTable.prototype.rehash = function(string) { // function that makes the hash larger or smaller, depending on string input. 

  if(string === 'larger') {
    this.SIZE = Math.floor(this.SIZE * 2); 
  } else if (string === 'smaller') {
    this.SIZE = Math.floor(this.SIZE / 2 ); 
  }

  this.limit = Math.floor(this.SIZE * .75); 
  this.lowerLimit = Math.floor(this.SIZE * .25); 
  this.oldStorage = this.storage; 
  this.storage = new Array(this.SIZE); 
  
  //now we iterate through the array. For each, if we find an object, iterate through the object and rehash anything in the object. 
  
  for(let obj of this.oldStorage) {
    if (obj) { //if it finds an object...
      for (let key in obj) { // iterate through the objet and rehash anything in it. 
        let value = this.oldStorage[key]; 
        const index = hashCode(key, this.SIZE)
        if (this.storage[index] === undefined) {
          this.storage[index] = {}; 
        }
        this.storage[index][key] = obj[key]; 
      }
    }
  }
  delete this.oldStorage;
}


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

  const index = hashCode(key, this.SIZE)
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
  if (this.storage[index] === undefined) return undefined; 
  else if (this.storage[index][key] === undefined) return undefined; 
  
  this.counter--; 

  if (this.SIZE > 16 && this.counter < this.lowerLimit) {
    this.rehash('smaller'); 
  }

  const output = this.storage[index][key];
  delete this.storage[index][key]; 

  return output; 

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

const hash = new HashTable(); 
console.log(hash)
hash.set('test1', 'test1'); 
hash.set('test2', 'test2'); 
hash.set('test3', 'test3'); 
hash.set('test4', 'test4'); 
hash.set('test5', 'test5'); 
hash.set('test6', 'test6'); 
hash.set('test7', 'test7'); 
hash.remove('test7')
hash.remove('test6')
hash.remove('test5')
hash.remove('test4')
console.log(hash)
