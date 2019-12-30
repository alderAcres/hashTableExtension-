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
  //initalize a counter so for each key value pair we add/delete to the hashtable we increment or decrement counter 
  this.counter = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  //first we want to check if the hash table has been filled up to 75%;
  if (this.counter >= (3/4 * this.SIZE)){
    //we need to create a variable to hold our old storage;
    const oldStorage = this.storage;
    //we are now going to increment a new storage table and double it;
    this.storage = new Array(this.SIZE * 2);
    //we are going to reassign the size to double also so we can have reference; 
    this.SIZE *= 2;
    //we will need to reset out counter to 0 again so we can run the hash function on all old storage; 
    this.counter = 0;
    for (let i = 0; i < this.oldStorage.length; i += 1){
      //checking to see if the first item in our old storage array has an OBJ;
      if(oldStorage[i] !== undefined){
        //iterate over the key value pair to and passing the key value pair and using recursion to call set again so we can run the hashcode and passing the key value pair to the new storage we created.
        for (const[key, value] of Object.entries(oldStorage[i])){
          this.set(key,value);
        }
      }
    }
  }
  //first we get the index by running the hashcode passing in the key and the storage size.
  const index = hashCode(key, this.SIZE);
  //checking to see if the storage index has a value in it. if it doesn't have a OBJ then we assign it an obj
  if(this.storage[index] === undefined){
    //creating a empty object so we can pass this obj to the index;
    const obj = {};
    //assigning the empty obj with the key value pair;
    obj[key] = value;
    //assign the storage index with the obj
    this.storage[index] = obj;
    //increment counter;
    this.counter += 1;
  }else{
    //check to see if key already exist in object; if it doesnt have it then we increment counter else we don't increment counter 
    if(this.storage[index].hasOwnProperty(key) === false){
      this.counter += 1;
    }
    //if the storage index already has an obj assigned to it. Add the key value pair to that obj.
    this.storage[index][key] = value;
  }
};

HashTable.prototype.remove = function(key) {
  //we want to check to see if the hashtable is less than 25% full.
  if(this.counter <= (1/4 * 16))
  //iterate over our hashtable to find the matching key.
  for (let i = 0; i < this.storage.length; i += 1) {
    //check to see if index has a object inside and if it does have an obj does it make the key
    if (typeof this.storage[i] === 'object' && this.storage[i].hasOwnProperty(key) === true){
    //once we find the match we have to create a variable to store the current key value pair;
      const holder = this.storage[i][key];
      // delete the current key value pair
      delete this.storage[i][key];
      // return the variable that was holding the key value pair that we deleted.
      return holder;
    }
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

// Do not remove!!
module.exports = HashTable;



