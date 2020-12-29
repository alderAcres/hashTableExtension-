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


HashTable.prototype.set = function(key, value) {

  let sizeCounter = 0

  for(let x = 0; x < this.SIZE; x++) {
    if(this.storage[x] === undefined) {
      sizeCounter++
    }
  }
 
  const size = this.SIZE

  const percentEmpty = (sizeCounter / size)

  if(percentEmpty <= .25) {
    this.SIZE = this.SIZE * 2
  }

  let index = hashCode(key, this.SIZE);
  
  if(!this.storage[index]){
    this.storage[index] = [ ];
  }
  this.storage[index].push([key,value])

  return index
};

HashTable.prototype.remove = function(key) {

  let index = hashCode(key, this.SIZE)
  
  // if there is no bucket
  if(!this.storage[index])return null

     for(let storage of this.storage[index]){
       //console.log(storage)
       // if key  matches
       if(storage[0] === key){
         
         // value
         let val = storage[1]
         storage[0] = undefined
         storage[1] = undefined
         return val
        }
     }

    //REALIZING WITH 5 MINS LEFT THAT THIS WILL NEVER
    //RUN BECAUSE IM RETURNING VAL ON LINE 69 
    // WHOOPS

     let sizeCounter = 0

     for(let x = 0; x < this.SIZE; x++) {
       if(this.storage[x] === undefined) {
         sizeCounter++
       }
     }
    
    const size = this.SIZE
   
    const percentEmpty = (sizeCounter / size)
   
    if(size > 16 && percentEmpty > .75) {
      this.SIZE = this.SIZE / 2
    }
    console.log(this.SIZE)

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


//console.log(table.storage)


// Do not remove!!
module.exports = HashTable;
