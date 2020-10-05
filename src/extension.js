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
  this.counter = 0; 
}

/**
* set - sets given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed setress already contains another key/value pair, you must handle
*   the collision appropriately.
*
* @param {string} key - key to be used to create hashed setress
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  //passing key through the hash generator to create it's unique key
  const hashedKeyIndex = hashCode(key, this.SIZE); 

  //next need to account for collisions by creating an object to store mulitple instances to avoid collisions
  if (!this.storage.hasOwnProperty(hashedKeyIndex)) {
    //each time a new object is created, thus taking a 'spot' in this.storage, will increment by 1
    this.counter++; 
    //if this new hashedKeyIndex does not exist will create an object to store key value pairs
    this.storage[hashedKeyIndex] = {};
  }
  //else set given value to the hash table with specified key, should also overwrite if provided key has already been used
  this.storage[hashedKeyIndex][key] = value; 



  // 1. set:
  //     - If adding the new item will push the number of stored items to over 75% of
  //       the hash table's SIZE, then double the hash table's SIZE and rehash everything

  //to get this to work, will set a counter property in constructor function which will increase by 1
  //each time a key value pair is added 
  
  //if this.counter is 75% full then double this.SIZE
  if (this.counter >= Math.floor(this.SIZE * 0.75)) {
    //assign passed in keys to a new variable 
    let passedInKey = key; 
    //re-start counter at 0 
    this.counter = 0; 
    this.SIZE = this.SIZE * 2; 
    //then need to rehash everything 
    //plan to do this by iterating through this.storage and rehashing each value to account for the change in size
    //since hash function takes size into account 
    //create an empty array that will take the new rehashed keys as well as values
    const arrOfKeyToHash = [];
    for (const hash in this.storage) {
      for (const [key,value] in Object.entries(this.storage[hash])) {
        //object.entries, should give me the key value pairs which I need to rehash

        //now to rehash and push those keys into this.storage
        arrOfKeyToHash.push([hashCode(key, this.SIZE), value])
      }
    }
    //now that we have that  arr (hashedkeys and values) need to place those in this.storage
    //by iterating through that array of subarrays containing hashkey and values
    for (const subArrs of arrOfKeyToHash) {
      //now to iterate through those subs
      if(!this.storage.hasOwnProperty(subArrs[0])) {
        //create object for collisions
        this.counter++; 
        this.storage[subArrs[0]] = {};
      } //assign those values for the rehashed this.storage after increasing in size 
      this.storage[subArrs[0]][passedInKey] = subArrs[1];
    } //return this.storage after rehashing 
    return this.storage; 
  }

};

/**
* get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed setress, then you must retrieve
*   the correct value that was originally stored with the provided key
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/
HashTable.prototype.get = function(key) {
  //again pass in key in hash function 
  const hashedKeyIndex = hashCode(key, this.SIZE);

  //check if our storage at that hashedkeyindex and at that key exists, if true, return value 
  if (this.storage.hasOwnProperty(hashedKeyIndex) && this.storage[hashedKeyIndex].hasOwnProperty(key)) {
    return this.storage[hashedKeyIndex][key]; 
  }
  //should return undefined if not present 
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
  //pass in key to hash func
  const hashedKeyIndex = hashCode(key, this.SIZE);

  //we are just deleting key/value pair from the hash table, not returning
  //similar to get method in that we have to evaluate if key exists in table 
  if (this.storage.hasOwnProperty(hashedKeyIndex) && this.storage[hashedKeyIndex].hasOwnProperty(key)) {
    //if exists, then delete from table
    delete this.storage[hashedKeyIndex][key];
    this.counter--;

    //then need to rehash everything 
    //plan to do this by iterating through this.storage and rehashing each value to account for the change in size
    //since hash function takes size into account 
    //create an empty array that will take the new rehashed keys as well as values
    const arrOfKeyToHash = [];
    for (const hash in this.storage) {
      for (const [key,value] in Object.entries(this.storage[hash])) {
        //object.entries, should give me the key value pairs which I need to rehash

        //now to rehash and push those keys into this.storage
        arrOfKeyToHash.push([hashCode(key, this.SIZE), value])
      }
    }
    //now that we have that  arr (hashedkeys and values) need to place those in this.storage
    //by iterating through that array of subarrays containing hashkey and values
    for (const subArrs of arrOfKeyToHash) {
      //now to iterate through those subs
      if(!this.storage.hasOwnProperty(subArrs[0])) {
        //create object for collisions
        this.counter++; 
        this.storage[subArrs[0]] = {};
      } //assign those values for the rehashed this.storage after increasing in size 
      this.storage[subArrs[0]][passedInKey] = subArrs[1];
    } //return this.storage after rehashing 
    return this.storage; 
  }



  // 2. remove:
  //     - If the hash table's SIZE is greater than 16 and the result of removing the
  //       item drops the number of stored items to be less than 25% of the hash table's SIZE
  //       (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.

  if (this.counter <= Math.floor(this.SIZE * 0.25) && this.SIZE > 16) {
    //need to rehash everything and do similar to the rehashing in the set method
    //but now need to reduce size of hash by 1/2 
    let passedInKey = key; 
    this.SIZE = this.SIZE / 2; 
    //re-start counter at 0 
    this.counter = 0;

  }

};


// Do not remove!!
module.exports = HashTable;



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


let test = [[1,2], [2,3]];

function hello (arr) {
  for (const [elem,value] of Object.entries(arr)) {
    console.log(value);
  }
}

console.log(hello(test));