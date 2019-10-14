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
  this.SIZE = 16; //capacity
  this.usage=0; 
  //the hasthable is an array... 
  this.storage = new Array(this.SIZE);
  //why would you use an array????
  //this.storage={};
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
  //set is to add
  if(key===undefined){
    return;
  }
  let potentialKey=hashCode(key,this.SIZE);
  if(this.storage[potentialKey]!==undefined){//if not undefined, we override by value. collision resolution
    this.storage[potentialKey][key]=value;
    this.usage++;
   }
  else{
    this.storage[potentialKey]={}; //always encapsulate in map within the array., when no object empty array there yet...
    this.storage[potentialKey][key]=value;
    this.usage++;//we have a usage to check how far we are to capacity
  }

  //after the addition check size, we assume 75% storage in the 1 dimensional size .75*16 and not assuming the handled collisions increases size in the next dimension
  if(this.usage>.75*this.SIZE){
    //resize and rehash everything from old hash
    //first we must do this all internally and encapsulate hashmap features
    //we must get all of the original keys to rehash to values

    //create temp new features and reassign the master at the very end(size, etc)
    let doubledSize=this.SIZE*2;
    let tempStorage=new Array(doubledSize);
    //let tempObjs; //we are going to iterate storage and use the original key value pairs as a map, then we hash
    //get back original keys to rehash function
    //the array contains object mappings to key value pairs;;;;

    //the potential hashed key is the address with the stored object of the original key value mapping at that address, and values are primitives
    //iterate through smaller
    for(let i=0;i<this.storage.length;i++){
      //we itroughe the hashed address positions that contain key value pairs based on the older potential keys
      let objectsHere=this.storage[i];//in case of collisions, there are definitely potentially more than one original key here
      if(objectsHere===undefined){
        continue; //nothing could be there roughly 25% of the time or less
      }
      else{
        let keys=Object.keys(objectsHere);
        for(let j=0;j<keys.length;j++){
          //the original keys
          let key=keys[i];
          let newHashKey=hashCode(key,doubledSize);
          //check for collisions again
          if(tempStorage[newHashedKey]!==undefined){
            tempStorage[newHashedKey][key]=objectsHere[key];
          }
          else{
            tempStorage[newHashedKey]={};
            tempStorage[newHashedKey][key]=objectsHere[key];
          }
        }
      }

    }
    this.SIZE*=2;
    this.storage=tempStorage;
    //this.usage is still the same tho
  }

  //we can make a helper method that takes in the desired percentage of size change and do the same with checks that storage is dynamically correct


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
  let hashedKey=hashCode(key,this.SIZE);
  return this.storage[hashedKey];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {//removing an element is the same as swapping an element with null or undefined
  let temp=this.storage[hashCode(key,this.SIZE)];
this.storage[hashCode(key,this.SIZE)]=undefined;
this.usage--; //update current usage


if(this.SIZE>16 && this.usage<Math.floor(.25*this.SIZE)){
  //resize and rehash everything from old hash
      //first we must do this all internally and encapsulate hashmap features
      //we must get all of the original keys to rehash to values
  
      //create temp new features and reassign the master at the very end(size, etc)
      let halvedSize=this.SIZE/2;
      let tempStorage=new Array(halvedSize);
      //get back original keys to rehash function
      //the array contains object mappings to key value pairs;

      //the potential hashed key is the address with the stored object of the original key value mapping at that address, and values are primitives
      //iterate through smaller
      for(let i=0;i<this.storage.length;i++){
        //we itroughe the hashed address positions that contain key value pairs based on the older potential keys
        let objectsHere=this.storage[i];//in case of collisions, there are definitely potentially more than one original key here
        if(objectsHere===undefined){
          continue; //nothing could be there roughly 75% of the time or mores, to do try to short circuit the empty slots
        }
        else{
          let keys=Object.keys(objectsHere);
          for(let j=0;j<keys.length;j++){
            //the original keys
            let key=keys[i];
            let newHashKey=hashCode(key,doubledSize);
            //check for collisions again
            if(tempStorage[newHashedKey]!==undefined){
              tempStorage[newHashedKey][key]=objectsHere[key];
            }
            else{
              tempStorage[newHashedKey]={};
              tempStorage[newHashedKey][key]=objectsHere[key];
            }
          }
        }
  
      }
      this.SIZE/=2;
      this.storage=tempStorage;
      //this.usage is still the same tho





  return temp;
};


// Do not modify

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
