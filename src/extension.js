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

HashTable.prototype.set = function(key, value) {
  console.log(this.stored)
  if((this.stored + 1) / this.SIZE > 0.75) { 
    console.log('hi');
    let oldSize = this.SIZE;
    this.SIZE = this.SIZE * 2;
    console.log(oldSize);
    let newStor = new Array(this.SIZE);
    for(let i = 0; i < oldSize; i++) {
      if(this.storage[i] !== undefined) {
        for(k in this.storage[i]) {
          console.log(k);
          console.log(this.SIZE)
          let binNum = hashCode(k, this.SIZE);
          console.log(binNum)
          if(newStor[binNum] === undefined) {
            newStor[binNum] = {};
          }
          newStor[binNum][k] = value;
        }
      }
    }
    this.store++;
    this.storage = newStor;
  } else {
    let binNum = hashCode(key, this.SIZE);
    if(this.storage[binNum] === undefined) {
      this.storage[binNum] = {};
    }
    this.storage[binNum][key] = value;
    this.stored++;
  }
};

let newHash = new HashTable();
newHash.set('elemt', '16');
newHash.set('fdsg', 'yo');
newHash.set('last hello1', 'hello');
newHash.set('last hello2', 'hello');
newHash.set('last hello3', 'hello');
newHash.set('last hello4', 'hello');
newHash.set('last hello5', 'hello');
newHash.set('last hello6', 'hello');
newHash.set('last hello7', 'hello');
newHash.set('last hell8', 'hello');
newHash.set('last hello9', 'hello');
console.log(newHash.stored);
newHash.set('last hello10', 'hello');
console.log(newHash.stored)
console.log(newHash.storage);
newHash.set('last hello11', 'hello');
console.log(newHash.storage.length);
console.log(newHash.storage);
newHash.set('last hello12', 'hello');


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
  let binNum = hashCode(key, this.SIZE);
  return this.storage[binNum][key];
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
  let binNum = hashCode(key, this.SIZE);
  if(this.storage[binNum] === undefined || this.storage[binNum][key] === undefined) return undefined;
  delete this.storage[binNum][key];
  this.stored--;
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
