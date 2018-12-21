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
  this.SIZE = 4;
  this.MINSIZE = this.SIZE;
  this.storage = new Array(this.SIZE);
  this.numElements = 0;
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
  
  //if adding new element will be more than 75% of this.SIZE
  if((this.numElements+1) > (this.SIZE*.75)){
    //re-hash everything
    // console.log(this.SIZE)
    this.SIZE *=2;
    let arrSize = this.SIZE;
    // let newArr = new Array(this.SIZE);
    let newArr = this.storage.reduce(function(acc,curr){
      let currObjKeys = Object.keys(curr);
      for(let i = 0; i < currObjKeys.length; i++){
        let newHashIndex = hashCode(currObjKeys[i], arrSize);
        if(!acc[newHashIndex]) acc[newHashIndex] = {};
        acc[newHashIndex][currObjKeys[i]] = curr[currObjKeys[i]];
      }
      return acc;

    }, new Array(this.SIZE));
    this.storage = newArr.slice(0)

  }
  let hashKey = hashCode(key, this.SIZE);
  if(!this.storage[hashKey]) this.storage[hashKey] = {};
  this.storage[hashKey][key] = value;
  this.numElements+=1;
  return this.numElements;


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
  return this.storage[hashCode(key,this.SIZE)][key];
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
  let hashKey = hashCode(key,this.SIZE);
  if(!this.storage[hashKey][key]) return undefined;
  else{
    if(((this.numElements-1) < Math.floor(this.SIZE*.25))&& this.SIZE > this.MINSIZE){
      //re-hash everything
      this.SIZE = this.SIZE/2;
      let arrSize = this.SIZE;
      let newArr = this.storage.reduce(function(acc,curr){
        let currObjKeys = Object.keys(curr);
        for(let i = 0; i < currObjKeys.length; i++){
          let newHashIndex = hashCode(currObjKeys[i], arrSize);
          if(!acc[newHashIndex]) acc[newHashIndex] = {};
          acc[newHashIndex][currObjKeys[i]] = curr[currObjKeys[i]];
        }
        return acc;
  
      }, new Array(this.SIZE));
      this.storage = newArr.slice(0)
  
    }
    let value = this.storage[hashKey][key];
    delete this.storage[hashKey][key];
    this.numElements--;
    return value;
  }
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


// let ht = new HashTable();
// console.log(ht.set(0,true));
// console.log(ht.set(1,'b'));
// console.log(ht.set(2,3));
// // console.log(ht);
// console.log(ht.set(4,3));
// console.log(ht.set(5,3));
// console.log(ht.set(6,3));
// console.log(ht.set(7,3));
// console.log(ht.set(8,3));
// console.log(ht);
// // 
// // console.log(ht.set('apple',3));
// // console.log('apple ' + ht.get('apple'))
// console.log(ht);
// console.log(ht.remove(8));
// console.log(ht.remove(7));
// console.log(ht.remove(6));
// console.log(ht.remove(5));
// console.log(ht.remove(4));
// console.log(ht.remove(2));

// console.log(ht);

// 
// Do not remove!!
module.exports = HashTable;
