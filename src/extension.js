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
  this.counter = 0; //used to keep track on number of items stored
  this.fillCheck = 0;
}

/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.

********** NEW ************
* - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {

  //use hashCode function to get the index we want from the key parameter
  const index = hashCode(key, this.SIZE);

  if (this.fillCheck >= Math.floor((0.75)*this.SIZE)){ //if fillcheck (keeps track of indexes filled) reaches the .75% capacity
    this.SIZE *= 2; //double the size of the SIZE property to...
    const oldStorage = [] //holder to remember this storage
    this.storage.forEach((el) => {oldStorage.push(el)}); //clone this.storage into the holder
    this.storage = new Array(this.SIZE); //...double the size of the storage
    this.fillCheck = 0; //reset the fillCheck for rehashing

    oldStorage.forEach((element) =>{ //go through each index in the storage
      for (elKey in oldStorage.element){ //then go through each key in the object of each element in stroage
        this.set(elKey, oldStorage.element[elKey]); //recurse and add the key-value pair into the appropriate index
      }
    });
  }
  //put the value into the array at the index given by hashCode, but we need to deal with colisions.
  if (!this.storage[index]){ //check if object already exists at index of storage
    this.storage[index] = {}; //if not, create that object
    this.fillCheck++;
      
  }
  //add the key-value pair into the object
  this.storage[index][key] = value;
  this.counter++;
  return this.counter;
    
};
const test = new HashTable();
test.set('hey', 16);
test.set('yoo', 17);
test.set('hey1', 16);
test.set('yoo1', 17);
test.set('hey2', 16);
test.set('asdf', 17);
test.set('hey3', 16);
test.set('yoo3', 17);
test.set('hef', 16);
test.set('yoo4', 17);
test.set('d5ll', 16);
test.set('yoo5asdf', 17);
test.set('expandof', 200);
test.set('zycdf34asdfas0', 75)

console.log(test);


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
  //use hashcode to get the index to look at
  //use key to look for the value in the object at the index we're looking at

  return this.storage[hashCode(key, this.SIZE)][key];

};



/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined

********** NEW ************

* - If the hash table's SIZE is greater than 16 and the result of removing the
    item drops the number of stored items to be less than 25% of the hash table's SIZE
    (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  const index = hashCode(key, this.SIZE); //get index to look for through hashCode

  if (this.storage[index][key]){ //if storage at index has the key property
    const holder = this.storage[index][key]; //use a holder that we'll return
    delete this.storage[index][key]; //delete the key value pair from the object
    this.counter--; //update the counter;

    return holder; //return our holder
  }

  return undefined; //if storage at index doesnt have the key property, return undefined
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
