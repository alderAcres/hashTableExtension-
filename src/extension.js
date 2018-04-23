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
  this.count = 0;
}



HashTable.prototype.set = function(key, value) {

  let buck = hashCode(key, this.SIZE);

  if(this.storage[buck] !== undefined){
    this.storage[buck][key] = value;
  }
  else{
      obj = {};
      obj[key] = value;
      this.storage[buck] = obj;
      }

  if (this.count > 0.75*this.SIZE){
        temp = new HashTable();
        temp.SIZE = 2 * this.SIZE;
    
        for(var x in this.storage){
          let k =  this.storage[x];
          let v = this.storage[x][v];
    
          if(this.storage[x] !== undefined){
            temp.storage[hashCode(k, temp.SIZE)][k] = v;
          }
          else{
            obj = {};
            obj[k] = v;
            temp.storage[x] = obj;
          }
        }
        this = temp;
  }};


HashTable.prototype.remove = function(key) {
  if(typeof this.storage[hashCode(key, this.SIZE)] === "object"){
    const output = this.storage[hashCode(key, this.SIZE)][key];
    this.storage[hashCode(key, this.SIZE)] = undefined;
    this.count =- 1;
    

    if (this.count < 0.25*this.SIZE){
    temp = new HashTable();
    temp.SIZE = 0.25 * this.SIZE;

    for(var x in this.storage){
      let k =  this.storage[x];
      let v = this.storage[x][v];

      if(this.storage[x] !== undefined){
        temp.storage[hashCode(k, temp.SIZE)][k] = v;
      }
      else{
        obj = {};
        obj[k] = v;
        temp.storage[x] = obj;
      }
    
    this = temp;
  }}
  return output;
}

else{
  return undefined;

}};




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
