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
  this.itemsStored = 0;
  this.OVERFLOW = this.SIZE * 3/4;
  this.UNDERFLOW = this.SIZE * 1/2;
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
  let hashAddress = hashCode(key, this.SIZE);
  
  if (this.storage[hashAddress] == undefined) {
    const obj = {};
    obj[key] = value;
    this.storage[hashAddress] = obj;
    return ++this.itemsStored;
  } else {
    if (this.itemsStored >= this.OVERFLOW){
      this.SIZE = this.SIZE*2
      this.storage = this.rehash(this.SIZE);
      hashAddress = hashCode(key, this.SIZE);
    }
    console.log(this.storage[hashAddress], hashAddress)
    if (this.storage[hashAddress] == undefined){
      const obj = {};
      obj[key] = value;
      this.storage[hashAddress] = obj;
    }else {
      this.storage[hashAddress][key] = value;
    }

    return this.itemsStored;
  }
};


HashTable.prototype.rehash = function(size){
  this.SIZE = size;
  const newStorage = new Array(this.SIZE);
  
  return this.storage.reduce( (acc, currObj) =>{
    if (currObj instanceof Object){
      Object.keys(currObj).forEach(currKey =>{
        const hash = hashCode(currKey, this.SIZE);
        if (acc[hash] == undefined){
          const obj = {};
          obj[currKey] = currObj[currKey];
          acc[hash] = obj;
        }else{
          acc[hash][currKey] = currObj[currKey]
        }
      });
    }
    return acc;
  },newStorage)
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
  const hashAddress = hashCode(key, this.SIZE);

  if (this.storage[hashAddress] === undefined || this.storage[hashAddress][key] === undefined) {
    throw new Error(`HashTable get: no item found with key **${key}** provided ! `);
  }
  return this.storage[hashAddress][key];
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
  let hashAddress = hashCode(key, this.SIZE);
  
  // console.log(this.storage[hashAddress], key)
  if (this.storage[hashAddress] === undefined || this.storage[hashAddress][key] === undefined) {
    throw Error(`HashTable get: no item found with key ${key} provided ! `);
  } else {
    deletedValue = this.storage[hashAddress][key];
    delete this.storage[hashAddress][key]
    this.itemsStored--;
    if (this.itemsStored <= this.UNDERFLOW){
      this.SIZE = this.SIZE/2;
      this.storage = this.rehash(this.SIZE);
      console.log(this.storage, this.SIZE);
    }
    return deletedValue;
  }

};

let hashtable = new HashTable();
console.log(hashtable.set("male1", "tommy1")); 
console.log(hashtable.set("male2", "james2"));  
console.log(hashtable.set("male3", "james3")); 
console.log(hashtable.set("male4", "katty4"));  
console.log(hashtable.set("male5", "katty5"));
console.log(hashtable.set("male6", "james6")); 
console.log(hashtable.set("male7", "katty7"));  
console.log(hashtable.set("male8", "katty8"));
console.log(hashtable.set("male9", "james9")); 
console.log(hashtable.set("male10", "katty10"));  
console.log(hashtable.set("male11", "katty11"));
console.log(hashtable.set("male12", "james12")); 
console.log(hashtable.set("male13", "katty13")); 
console.log(hashtable.set("male14", "katty14"));
console.log(hashtable.set("male15", "james15")); 
console.log(hashtable.set("male16", "katty16")); 
console.log(hashtable.set("male17", "katty17"));
console.log(hashtable);
console.log(hashtable.set("male18", "katty18"));
console.log(hashtable.set("male19", "katty19"));
console.log(hashtable.set("male20", "katty20"));
console.log(hashtable);

console.log(hashtable.get("male15")); 
console.log(hashtable.get("male12")) 

console.log(hashtable.remove("male20"));
console.log(hashtable.remove("male19"));
console.log(hashtable.remove("male18"));
console.log(hashtable.remove("male17"));
console.log(hashtable.remove("male16"));
console.log(hashtable.remove("male15"));
console.log(hashtable.remove("male14"));
console.log(hashtable.remove("male13"));
console.log(hashtable.remove("male12"));
console.log(hashtable.remove("male11"));
console.log(hashtable.remove("male10"));
console.log(hashtable.remove("male9"));

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
