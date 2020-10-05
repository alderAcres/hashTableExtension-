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
  this.count = 0;
  // this.SIZE = 16;
  this.storage = new Array(this.SIZE);

  if(this.count < (Math.ceil(this.SIZE * 0.25))) this.Size /= 2;
  else {this.Size = 16} 
  if(this.count > (Math.floor(this.SIZE * 0.75))) this.Size *= 2; 
  else {this.SIZE = 16}
};

HashTable.prototype.set = function (key, value) {
  let hashNum = hashCode(key, this.SIZE); // gets unique id form hash
  if (!this.storage[hashNum]) this.storage[hashNum] = {};
  this.storage[hashNum][key] = value;
  this.count++;
  if(this.count < (Math.ceil(this.SIZE * 0.25))) this.Size /= 2;
  else {this.Size = 16} 
  if(this.count > (Math.floor(this.SIZE * 0.75))) this.Size *= 2; 
  else {this.SIZE = 16}
  return this;
};
HashTable.prototype.get = function (key) {
  let hashNum = hashCode(key, this.SIZE); // gets unique id form hash
  //check if there's value with specific key
  if (!this.storage[hashNum]) return undefined;
  return this.storage[hashNum][key];
};
HashTable.prototype.remove = function (key) {
  let hashNum = hashCode(key, this.SIZE); // gets unique id form hash
  //find the specific key/value in the stored in hash
  //if it doesn't exist, do nothing

  //if exist, stored temp variable for value
  //delete that key value pair
  if (!this.storage[hashNum][key]) return undefined;
  let temp = this.storage[hashNum][key];
  delete this.storage[hashNum][key];
  this.count--;
  if(this.count < (Math.ceil(this.SIZE * 0.25))) this.Size /= 2;
  else {this.Size = 16} 
  if(this.count > (Math.floor(this.SIZE * 0.75))) this.Size *= 2; 
  else {this.SIZE = 16}
  return temp;
};
const newValue = new HashTable();
let name = 'john';
let id = 310
console.log(newValue)
console.log(newValue.set(name,id))
console.log(newValue.set('dd',2412))
console.log(newValue.set('ff',24123))
console.log(newValue.set('aa',23141))
console.log(newValue.set('af',2123123))
console.log(newValue.set('cc',245234))
console.log(newValue.set('ddf',2662))
console.log(newValue.set('ko',2444))
console.log(newValue.set('po',2222))
console.log(newValue.set('op',23))
console.log(newValue.set('fjkd',209923))
console.log(newValue.set('oeweo',214693))
console.log(newValue.set('opsadf',23563456))
console.log(newValue.set('opfadfasdf',2132383))
console.log(newValue.SIZE, newValue.count)


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
