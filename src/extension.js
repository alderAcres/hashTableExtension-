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
  let hashedIndex = hashCode(key, this.SIZE);
  
  if (!this.storage[hashedIndex]){
    this.storage[hashedIndex] = {};
    this.storage[hashedIndex][key] = value;
    this.items+=1;
    if (this.items/this.SIZE >0.75){
      resizeHashTable();
      
    } 
  } else if (this.storage[hashedIndex][key]){
    delete this.storage[hashedIndex][key];
    this.storage[hashedIndex][key] = value;
    this.items-=1
  } 

  return this.items
};

const resizeHashTable = () =>{
  let oldHashTable = this.storage;  // 16
  let double = this.SIZE * 2; //32
  let newStorage = new Array(double); // newStorage with 32 blank spaces
  // this.storage = newStorage;
  
  for (let storage of oldHashTable){
    for (let [key, value] in Object.entries(storage)){
      let newIndex = hashCode(key, double);
      if (!newStorage.storage[newIndex]){
        newStorage.storage[newIndex] = {};
        newStorage.storage[newIndex][key] = value;
        newStorage.items +=1;
    } else if (newStorage.storage[newIndex][key]){
      newStorage.storage[newIndex][key] = value;
      newStorage.items -=1;
    }
  }
} 
  delete this.storage;
  this.SIZE = double;
  this.storage = newStorage;
  this.items = newStorage.items;
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
  let lookupIndex = hashCode(key, this.SIZE);
  if (this.storage[lookupIndex]){
    return this.storage[lookupIndex][key];
  } 
    return false;
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
  let lookupIndex = hashCode(key, this.SIZE);
  if (!this.storage[lookupIndex]){
    return;
  }
  if (Object.entries(this.storage[lookupIndex]).length > 1){
    delete this.storage[lookupIndex][key];
    this.items-=1;
    return;
  }
  let tempStorageForDeletedValue = this.storage[lookupIndex][key];
  delete this.storage[lookupIndex];
  this.items-=1;
  return tempStorageForDeletedValue;
};

const hashtable = new HashTable();
// console.log(hashtable.set('123', 23));
// console.log(hashtable.set('421', 44));
// console.log(hashtable.set('hellothere', 23));
// console.log(hashtable.set('wellthen', 44));
// console.log(hashtable.set('1201mda', 23));
// console.log(hashtable.set('0a,apznd', 44));
// console.log(hashtable.set('10wmd', 23));
// console.log(hashtable.set('a01md', 44));
// console.log(hashtable.set('askdm01', 23));
// console.log(hashtable.set('120md', 44));
// console.log(hashtable.set('10dp', 44));
// console.log(hashtable.set('01m', 44));
// console.log(hashtable.set('12-1zadzs', 44));
// // console.log(hashtable.remove(''));
// console.log(hashtable.set('a12edz', true));
console.log( hashtable);

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
