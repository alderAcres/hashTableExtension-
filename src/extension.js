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
  
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  //create an index with our hashcode using the key as arg
  const index = hashCode(key, this.SIZE);

  //use coded index to assign the value to proper position
  // this.storage[index] = {value};
  
  // -- handle collison -- 
  this.storage[index] = {};
  this.storage[index][key] = value;

  //hashExtension

  //if the number of undefines drops below a certain number 
  let undefinesEls = this.SIZE;
  undefinesEls -=1 ;
  if (undefinesEls === (this.SIZE/4)) {
    //extend the table --- rehash
    this.SIZE = (this.SIZE)*2;
  };
  //extend the table --- rehash

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
  //calculate our index
  const index = hashCode(key, this.SIZE);
  
  // return the elment at the index
  return this.storage[index];
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
  //calculate our index store in variable 
  const index = hashCode(key, this.SIZE);

  // If the key does not exist in the hash table, return undefined
  if (this.storage[index] === undefined) return undefined;
  
  //remove the object --- delete a property

  //if element is in object delete key value pair
  if (this.storage[index].constructor === Object) {
    delete this.storage[index][key];
  } else {
    //else set to undefined
    this.storage[index] = undefined;
  }
};

let hashBrown = new HashTable;

hashBrown.set('Mr', 'Diallo');
hashBrown.set('Mrs', 'Diallo');
hashBrown.set('Dr', 'Diallo');
hashBrown.set('Senior', 'Diallo');
console.log(hashBrown)

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
