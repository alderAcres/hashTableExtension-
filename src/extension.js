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
  this.SIZE = 2;
  
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  const tooBig = this.storage.length === 0 ? 0 : this.storage.reduce((a,b)=>{return b?a+=Object.keys(b).length:a;},0)
  if(tooBig > Math.floor(this.SIZE *.75)){
    this.SIZE += this.SIZE;
    const newArr = [];

    //for each element in array, if it is object, for each element of object, add to code through hash
    this.storage.forEach((e)=>{
      if(e){
        Object.keys(e).forEach((el)=>{
          console.log(el, e[el]);
          newArr[hashCode(el,this.SIZE)] = { el : e[el]};
        })
      }
    })
    this.storage = newArr;
  }
  const position = hashCode(key, this.SIZE);
  if(!this.storage[position]){this.storage[position] = {}};
  this.storage[position][key] = value;
};

HashTable.prototype.get = function(key) {
  return this.storage[hashCode(key,this.size)][key];
};

HashTable.prototype.remove = function(key) {
  if(this.storage.length === 0){
    return undefined;
  }
  const position = hashCode(key, this.size);
  const output = this.storage[position][key];
  delete this.storage[position][key];
  return output;
};

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

const HT = new HashTable();
HT.set("butt",1);
HT.set("batt",7);
console.log(HT.storage);
HT.set("boot",5);
HT.set("bott",4);
console.log(HT.storage);
HT.set("bart",3);
HT.set("bunt",2);
console.log(HT.storage);