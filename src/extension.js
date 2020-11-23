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

HashTable.prototype.set = function(key, value) {
  //take in the key and convert it into a hash value 
  let hashValue = hashCode(key); 
  //declare storage size variable and set it equal to 0
  let storageSize = 0; 
  //declare new storage variable
  let newStorage;  
  
  //NORMALLY ADD THE ELEMENT 
  this.set(key, value); 

  //check how much of the hashtable has been filled out 
  for(let i = 0; i < this.storage.length; i++){
    if(this.storage[i]){
      storageSize++; 
    }
  }

  //if > 75% has been filled out then double the size and rehash every item
  if(storageSize / this.SIZE > 0.75){
    //double size
    this.SIZE = this.SIZE * 2; 
    newStorage = new Array(this.SIZE); 
    
    //rehash every single item 
    for(let i = 0; i < this.storage.length; i++){
      for(let j = 0; j < this.storage[i].length; j++){
        let hashValue = hashCode(key); 
        if(!newStorage[hashValue]){
          newStorage[hashValue] = []; 
          newStorage[hashValue].push([key, value]); 
        } else {
          newStorage[hashValue].push([key, value]); 
        }
      }
    }

    this.storage = newStorage; 
  }
   
   
};


HashTable.prototype.remove = function(key) {
  //take in the key and convert it into a hash value 
  let hashValue = hashCode(key); 
  //declare storage size variable and set it equal to 0
  let storageSize = 0; 
  //declare new storage variable
  let newStorage;  
  
  //check how much of the hashtable has been filled out 
  for(let i = 0; i < this.storage.length; i++){
    if(this.storage[i]){
      storageSize++; 
    }
  }

  this.remove(key); 

  //after removing the value, if the population of the items is less than 25% of the SIZE variable, then resize and rehash the storage array
  if(storageSize / this.SIZE < 0.25){
    //double size
    this.SIZE = this.SIZE / 2; 
    newStorage = new Array(this.SIZE); 
    
    //rehash every single item 
    for(let i = 0; i < this.storage.length; i++){
      for(let j = 0; j < this.storage[i].length; j++){
        let hashValue = hashCode(key); 
        if(!newStorage[hashValue]){
          newStorage[hashValue] = []; 
          newStorage[hashValue].push([key, value]); 
        } else {
          newStorage[hashValue].push([key, value]); 
        }
      }
    }

    this.storage = newStorage; 
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
