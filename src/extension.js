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

function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
  this.length = 0;
}

// PASTE AND MODIFY YOUR CODE BELOW
HashTable.prototype.set = function(key, value) 
{
  let index = hashCode(key, this.SIZE);
  let obj = {key, value};
  if(!(this.storage[index] instanceof Object)){
    this.storage[index] = {};
  }
  this.storage[index][key] = value;
  this.length += 1;

  if(this.length >= this.SIZE * .75){
    this.SIZE *= 2;
    for(let i = 0; i < this.storage.length; i++){
      if(this.storage[i] instanceof Object){
        for(prop in this.storage[i]){
          let val = this.remove(prop, this.SIZE * .5);
          this.set(prop, val);
        }
      }
    }
  } 

};

HashTable.prototype.get = function(key) {
  let index = hashCode(key, this.SIZE);
  return this.storage[index][key];
};

HashTable.prototype.remove = function(key, newSize = this.SIZE) {
  let index = hashCode(key, newSize);
  if(!(this.storage[index] instanceof Object) || !this.storage[index].hasOwnProperty(key)){
    return undefined;
  }

  let val = this.storage[index][key];
  delete this.storage[index][key];
  this.length -= 1;

  if(this.SIZE > 16 && this.length <= this.SIZE * .25){
    this.SIZE *= .5;
    for(let i = 0; i < this.storage.length; i++){
      if(this.storage[i] instanceof Object){
        for(prop in this.storage[i]){
          let val = this.remove(prop, this.SIZE * 2);
          this.set(prop, val);
        }
      }
    }
  } 


  return val;
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

let hasher = new HashTable();
hasher.set("hi", 23);
hasher.set("a", 27);
hasher.set("b", 26);
hasher.set("c", 28);
hasher.set("d", 28);
hasher.set("e", 28);
hasher.set("f", 28);
hasher.set("g", 28);
hasher.set("h", 28);
hasher.set("i", 28);
hasher.set("j", 28);
hasher.set("k", 28);
hasher.remove("k");
hasher.remove("j");
hasher.remove("i");
hasher.remove("h");
hasher.remove("g");
hasher.remove("f");
console.log(hasher);
