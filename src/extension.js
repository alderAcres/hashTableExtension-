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
  this.currentSize = 0;
  this.storage = new Array(this.SIZE);
}
HashTable.prototype.rehashEverythang = function(isIncreasing){
  let newSize = isIncreasing ? this.SIZE*2 : this.SIZE;
  if(!isIncreasing && this.SIZE > 16){
    newSize = this.SIZE/2;
  }

  let newStorage = new Array(newSize);
  for(const obj of Object.keys(this.storage)){
    for(const key of Object.keys(obj)){
      newStorage[hashCode(key,newSize)][key]= obj[key];
    }
  }
  this.SIZE = newSize;
  this.storage = newStorage;
}
HashTable.prototype.set = function(key, value) {
  //get hashed index of our key
  let hashedIndex = hashCode(key,this.SIZE);
  //check if theres anything there, if not then make new obj and throw it in there
  if(this.storage[hashedIndex]===undefined){
    let newObj = {};
    newObj[key]=value;
    this.storage[hashedIndex] = newObj;
    this.currentSize+=1
  }
  else{
    //simple overwrite existing,dont have to check cuz assigning automatically overwrites,
    //nah dude we actually gotta check it so we know whether or not to add to current size
    if(this.storage[hashedIndex][key]===undefined){
      this.currentSize+=1;
    }
    this.storage[hashedIndex][key] = value;
  }
  if(this.currentSize >= this.SIZE*.75){
    this.rehashEverythang(true);
  }
  //return number of items added which is one
  //should overwriting it make it zero? but you are kinda adding a new item into it.
  //wait actually it asks for the new number of items in it so we gotta check for current size;
  
  return this.currentSize;
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
  //const value = this.storage[hashCode(key,this.SIZE)][key];
  //return value===undefined ? undefined : value;
  return this.storage[hashCode(key,this.SIZE)][key]
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
  //we wanna return value at key
  const popped = this.get(key);
  //check if it exists
  if(popped!==undefined){
    //if yes then delete it then decrease current size
    delete this.storage[hashCode(key,this.SIZE)][key];
    this.currentSize-=1;
  }
  if(this.currentSize<=Math.floor(.25*this.SIZE)){
    this.rehashEverythang(false);
  }
  return popped;
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
