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
  this.reSizing = false;
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
  

  let index = hashCode(key, this.SIZE);

  if (this.storage[index] === undefined){
    this.storage[index] = [];
  }

  for (let i = 0; i < this.storage[index].length; i++){
    if (this.storage[index][i][0] === key){
      this.storage[index][i][1] = value;
      return;
    }
  }

  if((this.items + 1) / this.SIZE > 0.75 && !this.reSizing){
    this.reSize(this.SIZE * 2);
  }
  
  this.storage[index].push([key, value]);
  this.items++;
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
  let index = hashCode(key, this.SIZE);
  for (let i = 0; i < this.storage[index].length; i++){
    if (this.storage[index][i][0] === key){
      return this.storage[index][i][1];
    }
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
 
  let index = hashCode(key, this.SIZE);
  for (let i = 0; i < this.storage[index].length; i++){
    if (this.storage[index][i][0] === key){
      if (((this.items - 1) / this.SIZE) < 0.25){
        this.reSize(this.SIZE * .5);
      }
      let temp = this.storage[index][i][1];
      this.storage[index].splice(i, 1);
      this.items--;
      return temp;
    }
  }
};

HashTable.prototype.reSize = function(newSize){
  this.reSizing = true;
  this.SIZE = newSize;
  console.log(this.SIZE);
  let old = this.storage;
  this.storage = new Array(this.SIZE);
  for (let i = 0; i < old.length; i++){
    if (old[i]){    
      for (let j = 0; j < old[i].length; j++){
      this.set(old[i][j][0], old[i][j][1]);
      }
    }
  }
  this.reSized = false;
}


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


let andrew = new HashTable();

andrew.set('a' ,1);
andrew.set('b' ,1);
andrew.set('c' ,1);
andrew.set('d' ,1);
andrew.set('e' ,1);
andrew.set('f' ,1);
andrew.set('g' ,1);
andrew.set('h' ,1);
andrew.set('i' ,1);
console.log(andrew);
//console.log(andrew.remove('a'));
//console.log(andrew.remove('b'));
//console.log(andrew.remove('c'));
andrew.set('j' ,1);
andrew.set('k' ,1);
andrew.set('l' ,1);
andrew.set('m' ,1);
andrew.set('n' ,1);

console.log(andrew);