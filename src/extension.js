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
  let hashAddr = hashCode(key, this.SIZE);
  let hashStored = 1;

  for (let i = 0; i < this.storage.length; i++){
    if (this.storage[i]){
      hashStored++;
    }
  }

  if (hashStored > this.SIZE * .75){
    this.SIZE = this.SIZE * 2;
    
    for (let i = 0; i < this.storage.length; i++){
      let ele = this.storage[i];
     
      if (ele){
        let newAddr = hashCode(ele, this.SIZE);

        this.storage[newAddr] = ele;
      }
    }

    this.storage[hashAddr] = value;
  } else {
    this.storage[hashAddr] = value;
  }

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
  let hashAddr = hashCode(key, this.SIZE);

  return this.storage[hashAddr];
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
  let hashAddr = hashCode(key, this.SIZE);

  if(this.storage[hashAddr]){

    if(this.SIZE > 16){
      let hashStored = 0;

     for (let i = 0; i < this.storage.length; i++){
      if (this.storage[i]){
      hashStored++;
        }
     }

    delete this.storage[hashAddr];

    if(hashStored - 1 < this.SIZE * .25){
      this.SIZE = this.SIZE/2;
    
      for (let i = 0; i < this.storage.length; i++){
         let ele = this.storage[i];
     
        if (ele){
          let newAddr = hashCode(ele, this.SIZE);

          this.storage[newAddr] = ele;
        }
      }
    }
  } else {
    return undefined;
  }
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

// Do not remove!!
module.exports = HashTable;


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

let table = new HashTable();
console.log(table);
table.set("hi", 1);
table.set("heya", 2)
table.set("heyb", 2)
table.set("heyc", 2)
table.set("heyd", 2)
table.set("heye", 2)
table.set("heyf", 2)
table.set("heyg", 2)
table.set("heyh", 2)
table.set("heyi", 2)
table.set("heyj", 2)
table.set("asb", 5)
table.set("asdlkjf", 2);
table.set('aslkdjfsldk', 19);
table.remove("hi");
table.remove("heya");
table.remove("heyf")

console.log(table);
