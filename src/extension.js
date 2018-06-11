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
  this.storage[0]={"work":"work"};
  this.count=0;
}


HashTable.prototype.set = function(key, value) {
  let location=hashCode(key,this.SIZE);

  if (!this.storage[location]) { 
    this.storage[location]={}; 
    this.count += 1;
    }
  
  this.storage[location][key]=value;
 
  if ( this.count/this.SIZE >= .75){
      this.double();
  }
};

HashTable.prototype.double = function (){

  this.SIZE=this.SIZE*2;
  
  let newObj=this.storage;
  
  this.storage = new Array(this.SIZE);
  this.count=0;
  
  //this.storage= new Array(this.SIZE);
  for (let i=0;i<newObj.length;i++){
    console.log(newObj[i]);

    for (let prop in newObj[i]){
        
      this.set( prop, newObj[i][prop]);
    }
  } 

};

HashTable.prototype.get = function(key) {
  for (let i=0;i<this.storage.length;i++){
    //console.log(this.storage[i]);
    for (const prop in this.storage[i]){
        //console.log(prop);
      if (prop===key){
        //onsole.log(key+ ' is equal to '+ this.storage[prop]);
        return this.storage[i][prop];
      }
    }
    }
   return -1; //if key not in storage, will return -1 
};

HashTable.prototype.remove = function(key) {
    for (let i=0;i<this.storage.length;i++){
    //console.log(this.storage[i]);
    for (var prop in this.storage[i]){
        //console.log(prop);
      if (prop===key){
        //console.log(key+ ' is equal to '+ this.storage[prop]);
        delete this.storage[i][prop];
        return;
         }
      }
    }
   return undefined;
};


// Do not modify
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
