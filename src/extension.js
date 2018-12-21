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
  this.RESIZE = Math.floor(this.SIZE*.75);
  this.load = 0;
  
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

//hash the key
//add key-value pair to the array
const hash = hashCode(key,this.SIZE);

//if the index is empty, first create an object then add the keyvalue pair
if(!this.storage[hash]){

   //first increment the load since we know we're going to add a new value
   this.load += 1;
   //check if the load hits 75% of the table size;
   if(this.load>=this.RESIZE){
    let temp = [];
     //STEP 1: GET ALL THE KEY VALUE PAIRS
     //loop through the hashtable
     for(let i =0; i <this.storage.length; i++){
       //push each key-value pair into temp
       if(this.storage[i]){
        temp.concat(Object.entries(this.storage[i]));
       }
     }

     //STEP 2: RESIZE THE HASH TABLE
     //we first need to delete the storage so we can start from scratch
     delete this.storage;

     //double the size of the array;
     this.SIZE=this.SIZE *2;
     this.storage = new Array(this.SIZE);
     this.RESIZE = Math.floor(this.SIZE*.75);
     //STEP 3: REHASH EVERYTHING

     for (let j = 0; j < temp.length; j +=1 ){
       this.set(temp[i][0],temp[i][1]);
     }

   }

   // if we didnt need to load balance the array
   else{
    this.storage[hash] = {};
    this.storage[hash][key] = value;
   }


}

//if we have a collision, just add key-value to the object
else{
  this.storage[hash][key] = value;
}

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

  //create the hash of the key and access the hash to get the value at that location using that key
  const hash = hashCode(key,this.SIZE);
  return(this.storage[hash][key]);

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

  //get the hash
  const hash = hashCode(key,this.SIZE);

  //save the value to return
  const ret = this.storage[hash][key];
  //delete the key at that location
  delete this.storage[hash][key];

  //return the value
  return ret;

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


let hashtable = new HashTable();
console.log("Our original hashtable size is: " +hashtable.SIZE);

for(let i =0; i<60; i++){
  hashtable.set(i.toString(),i);
}

console.log("Our new hastable size is: " +hashtable.SIZE);