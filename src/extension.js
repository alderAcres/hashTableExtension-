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
}

HashTable.prototype.resize = function(){
  let bucketsFull;
  this.storage.forEach(bucket => {
    if(bucket !== undefined && bucket.length > 0){
      bucketsFull++;
    }
  });
  let percentFull = bucketsFull / this.SIZE;
  
  //activate resize
  if (percentFull >= .75 || (percentFull <= .25 && this.SIZE >= 16)){

    //create list of pairs to be rehashed
    let toBeRehashed = [];
    this.storage.forEach(bucket => {
      if(bucket !== undefined && bucket.length > 0){
        bucket.forEach(keyvaluepair => {
          toBeRehashed.push(keyvaluepair);
        });
      }
    });
    //reset storage
    percentFull >= .75 ? this.storage = new Array(this.SIZE * 2) : this.storage = new Array(this.SIZE / 2);

    //rehash all
    toBeRehashed.forEach(keyvaluepair => {
      this.set(Object.keys(keyvaluepair)[0], keyvaluepair[Object.keys(keyvaluepair)[0]], false);
    });

  } else{
    return;
  }
  
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
HashTable.prototype.set = function(key, value, resize = true) {
  this.resize();

  let hashResult = hashCode(key,this.SIZE);
  let objInsert = {[key] : value}; 
  let returnValue;

  //if subarray does not exist, create it
  if(this.storage[hashResult] === undefined){
    this.storage[hashResult] = [];
  }

  //attempt to find existing keyvaluepair with same key
  let index = -1;
  for(let i = 0; i < this.storage[hashResult].length; i++){
    if(Object.keys(this.storage[hashResult][i])[0] === key){
      index = i;
      break;
    }
  }

  //splice or push new depending on index
  if(index !== -1){
    this.storage[hashResult].splice(index,1,objInsert);
    returnValue = 0;
  } else{
    this.storage[hashResult].push(objInsert);
    returnValue = 1;
  }
  return returnValue;
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
  let hashResult = hashCode(key,this.SIZE);
  let returnResult = undefined;
  if(this.storage[hashResult] !== undefined && this.storage[hashResult].length >0){

    this.storage[hashResult].forEach(keyvaluepair => {

      if(Object.keys(keyvaluepair)[0] === key){
    
        returnResult = keyvaluepair[key];
      }
    });
  } 
  return returnResult;
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
  this.resize();

  let hashResult = hashCode(key,this.SIZE);
  let returnResult = undefined;

  //if the subarray has values in it
  if(this.storage[hashResult] !== undefined && this.storage[hashResult].length >0){
    for(let i = 0; i < this.storage[hashResult].length; i++){
      if(Object.keys(this.storage[hashResult][i])[0] === key){
        returnResult = this.storage[hashResult][i][key];
        this.storage[hashResult].splice(i,1);
      }
    }
  }
  return returnResult;
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
