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
  this.occupied = 0;
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
  // get the location in storage by hashing the input key
  const location = hashCode(key,this.SIZE);
  let previouslyOccupied = this.occupied;
  // access that location and assign it the value passed in
  if (this.storage[location]) {
    this.storage[location][key] = value;
  }
  else {
  
    if (((this.occupied + 1) / this.SIZE) > .75){
      this.SIZE *= 2;
      console.log("Doubling the size!");
      
      const newStorage = new Array(this.SIZE);
      // loop through all existing locations and
      for(const element of this.storage){
        if (element){
          // this block is producing NaN for many of the things stored in original storage
          for (const oldKey in element){
            let newLocation = hashCode(oldKey);
            if(!newStorage[newLocation]) {
              newStorage[newLocation] = {}
            };
            newStorage[newLocation] = element[oldKey];
          }
        }
      }
        //loop through all keys in the object
        // store in new storage
      this.storage = newStorage;
    }
    this.storage[location] = {};
    this.storage[location][key] = value;
    this.occupied += 1;
  }
  return this.occupied - previouslyOccupied;
};

const nums = new HashTable();
nums.set('one',1);
nums.set('two',2);
nums.set('three',3);
nums.set('four',4);
nums.set('five',5);
nums.set('six',6);
nums.set('seven',7);
nums.set('eight',8);
nums.set('nine',9);
nums.set('ten',10);
nums.set('eleven',11);
nums.set('twelve',12);
nums.set('thirteen',13);
nums.set('15',15);
nums.set('16',16);
nums.set('17',17);
nums.set('18',18);
nums.set('19',19);
nums.set('20',20);
nums.set('21',21);
nums.set('22',22);
nums.set('23',23);
nums.set('140',140);
nums.set('Dolly Parton','Jolene');
nums.set('Becky G','La Respuesta');
nums.set('John Lennon','Imagine');
nums.set('Paul McCartney','Obladee');
console.log(nums.storage);

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
  // hash the key and get the location
  const location = hashCode(key,this.SIZE);
  
  return this.storage[location][key]; 
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
  const location = hashCode(key,this.SIZE);
  const deletedValue = this.get(key);
  delete this.storage[location][key];
  return deletedValue;
};

// let jolene = new HashTable();
// jolene.set('Jolene','Please don\'t take my man.');
// console.log(jolene.remove('Jolene'));
// console.log(jolene.storage);



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
