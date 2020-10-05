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
  this.currCapacity = 0;
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
  // increment the current capacity by 1 
  this.currCapacity++;
  // check if currCapacity is > 75% the hashtables size
  const maxCapacity = this.SIZE * 0.75;

  if (this.currCapacity > maxCapacity) {
    // if so create a new storage with double the size of the curr table
    const newStorage = new Array(this.SIZE * 2);
    // add everything in old table to new table with new hash based on new size
    //    iterate through old storage and create new hash for each key value pair found
    this.storage.forEach((item) => {
      console.log("curr item:", ...Object.entries(item));
    })
    // set storage to newStorage
    // set size to new size
    this.SIZE = this.SIZE * 2;
    // add new item as usual
  }
  // get hash code for new key
  const address = hashCode(key, this.SIZE);
  //  create an object with key val pair if there is not one at the hash already
  if (!this.storage[address]) {
    this.storage[address] = { [key] : value }
  } else {
    //  else add key val pair to obj if one already exists
    //  overwrite exsisting value if key already exists at address
    this.storage[address][key] = value;
  } 
  // return curr capacity
  return this.currCapacity;
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
  // invoke hashCode with key to get address
  const address = hashCode(key, this.SIZE);
  // if that key is not found at that adress return undefined
  if (!this.storage[address][key]) return undefined;
  // else return the value assigned to the key at the address
  return this.storage[address][key];
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
  
  // invoke hashCode function with key and size to get address
  const address = hashCode(key, this.SIZE);
  // if the address and or key is undefined return undefined
  if (!this.storage[address][key]) return undefined;
  // otherwise store value at that key and address to variable
  const storedValue = this.storage[address][key];
  // delete key value pair at that address
  delete this.storage[address][key];
  
  // decrement curr capacity
  this.currCapacity--;
  const minCapacity = this.SIZE * .25;
  // if table size > 16 && currCapacity is < min Capacity (25% of table)
  if (this.SIZE > 16 && this.currCapacity < minCapacity) {
    //   create a new storage with 1/2 the current size 
    //  add everything from table to new storage with  new hash based on new size
    
  }
  // return the stored value
  return storedValue;
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

let ht = new HashTable;
console.log(ht.set("dan", 17))
console.log(ht.set("bob", 37))
console.log(ht.set("steph", 11))
console.log(ht.set("jo", 67))
console.log(ht.set("sue", 57))
console.log(ht.set("tim", 2))
console.log(ht.set("meg", 32))
console.log(ht.set("JB", 31))
console.log(ht.set("bailey", 32))
console.log(ht.set("Paul", 31))
console.log(ht.set("lou", 70))
console.log(ht.set("gail", 67))
console.log(ht.set("eliza", 25))

// Do not remove!!
module.exports = HashTable;
