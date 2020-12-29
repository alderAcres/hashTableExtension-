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
  this.numStored= 0;
}


HashTable.prototype.set = function(key, value) {
  //create index for hey
  ++this.numStored
  //if adding new item will push number of stored items to over 75%
  if (this.numStored/this.SIZE > 0.75){
    //double hash table size
    this.SIZE*=2

    //create new hashTable
    let newHashTable= new HashTable()
    //loop through the current hash table

    //if there is only one item at that index, simply use remove method and use that return value with spread operator to call .set method

    //if at the index there is collision, loop through that indexed array containing all collided pairs and rehash every element using the key and new size

    //set this.storage equal to newHashTable so update our current hashtable with all rehashed key-value pairs
  }







  let index= hashCode(key, this.SIZE);
  //if no value is in the index, create empty array, and push in key value pair, return number of items 
  //stored in Hash Table
  if (this.storage[index] === undefined){
    this.storage[index]= [];
    this.storage[index].push([key, value]);
    return this.numStored
  } 
  // if there is an item already stored (collision)
  else {
    //we check if the current key has already been used to store another value, if so we replace old value
    //with new value by iterating and replacing value directly
    let keyIncluded= false
    for (let i=0; i < this.storage[index].length; i++){
      if (this.storage[index][i][0] === key){
        this.storage[index][i][1] = value;
        keyIncluded= true;
        return this.numStored
      } 
    }
    //if the key has not been used before we simply push in the key-value pair and return number of items
    //stored in the Hash Table
    if (!keyIncluded){
     this.storage[index].push([key, value])
     return this.numStored 
    }
  }
};


HashTable.prototype.get = function(key) {
  //get index for that key
  let index = hashCode(key, this.SIZE);
  //if the the key does not exist in the hashtable, return undefined
  if (this.storage[index] == undefined){
    return undefined
  }
  // if there is only one item at the index, simply return the associated value
  else if (this.storage[index].length === 1){
    return this.storage[index][0][1]
  } else {
    //if there at the index we have a collision, loop through the array and return the 
    //value associated with key we are passing in
    for (let i=0; i < this.storage[index].length; i++){
      if (this.storage[index][i][0]===key){
        return this.storage[index][i][1]
      }
    }
  }
};


HashTable.prototype.remove = function(key) {
  let index= hashCode(key, this.SIZE)
 //if the the key does not exist in the hashtable
  if (this.storage[index] === undefined){
    return undefined
  }
  //if there is only one item at the index
  else if (this.storage[index].length === 1){
    --this.numStored;
    return this.storage[index].pop()
  } 
  //if at the index we have collision
  else {
    for (let i=0; i < this.storage[index].length; i++){
      if (this.storage[index][i][0]===key){
        --this.numStored;
        //declare variable called currPair, keeps track of current pair, which we will delete and return
        let currPair= this.storage[index][i];
        //delete pair at index i
        this.storage[index].splice(i, 1)
        //return key-value pair deleted
        return currPair
      }
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
