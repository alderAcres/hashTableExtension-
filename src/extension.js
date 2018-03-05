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
  this.occupied = 0;
  this.storage = new Array(this.SIZE);
  this.sizechange = this.storage;
}

HashTable.prototype.set = function(key, value) {
  const index = hashCode(key,this.SIZE);
  if(this.storage[index]){
    this.storage[index][key] = value;
  } else  {
    this.storage[index] = {};
    this.occupied++;
    this.storage[index][key] = value;
  }
  if(this.occupied === this.SIZE*.75 ){
    this.SIZE = this.SIZE*2;
    this.occupied = 0;
    this.storage = new Array(this.SIZE);
    this.sizechange.forEach((obj) => {
     obj ? Object.keys(obj).forEach(key => this.set(key,obj[key])):null
    })
  }
};


HashTable.prototype.get = function(key) {
  const index = hashCode(key, this.SIZE);
  return this.storage[index][key] ? this.storage[index][key] : undefined;
};

HashTable.prototype.remove = function(key) {
  const index = hashCode(key,this.SIZE);
  if(!this.storage[index][key]){
    return undefined;
  } else {
    const removed = this.storage[index][key];
    delete this.storage[index][key];
    if(Object.keys(this.storage[index]).length===0){
      delete this.storage[index];
      this.occupied--;
    }
    if(this.occupied < Math.floor(this.SIZE*.25)&&this.SIZE>16){
      this.SIZE = this.SIZE/2;
      this.occupied = 0;
      this.storage = new Array(this.SIZE);
      this.sizechange.forEach((obj) => {
      obj ? Object.keys(obj).forEach(key => this.set(key,obj[key])):null
      })
    }
    return removed;
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

let HT = new HashTable();
HT.set(1,10);
HT.set(40,11);
for(let i = 0 ;i<16; i++){
  HT.set('D'+i,'value'+i);
}
for(let j = 0; j< 11;j++){
  HT.remove('D'+j);
}
console.log(HT);
// Do not remove!!
module.exports = HashTable;
