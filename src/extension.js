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
  this.counter = 0;
}
// Important to note that I *think* this achieves the set functionality but I don't know if it undermines the security of a hashtable by having the values of the keys in the body of the object. 
HashTable.prototype.set = function(key, value) {
  ++this.counter;
  if (this.counter/this.SIZE <= 0.75){
    const hashedIndex = hashCode(key, this.SIZE);
    if(this.storage[hashedIndex]){
      this.storage[hashedIndex][key] = value;
    } else {
      this.storage[hashedIndex] = {};
      this.storage[hashedIndex][key] = value;
    };
  }
  if (this.counter/this.SIZE >= 0.75){
    const hashedIndex = hashCode(key, this.SIZE);
      if(this.storage[hashedIndex]){
        this.storage[hashedIndex][key] = value;
      } else {
        this.storage[hashedIndex] = {};
        this.storage[hashedIndex][key] = value;
      };
    let holderObj = {};
     for (let savedItem in this.storage){
      for (let subkey in this.storage[savedItem]){
        holderObj[subkey] = this.storage[savedItem][subkey]
      }
     }
     this.SIZE = this.SIZE*2
     this.storage = new Array(this.SIZE) 
     for (let valuekey in holderObj){
      let hashedIndex = hashCode(valuekey, this.SIZE)
      this.storage[hashedIndex] = {};
      this.storage[hashedIndex][valuekey] = holderObj[valuekey];
     }
  };
}

HashTable.prototype.get = function(key) {

  const hashedIndex = hashCode(key, this.SIZE)
  return this.storage[hashedIndex]
};


HashTable.prototype.remove = function(key) {
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
let newTable = new HashTable()
newTable.set('evan1','test1')
newTable.set('evan2','test2')
newTable.set('evan3','test3')
newTable.set('evan4','test4')
newTable.set('evan5','test5')
newTable.set('evan6','test6')
newTable.set('evan7','test7')
newTable.set('evan8','test8')
newTable.set('evan9','test9')
newTable.set('evan10','test10')
newTable.set('evan11','test12')
// newTable.set('evan12','test12')
console.log(newTable.keys)
// newTable.set('evan13','test13')
console.log(newTable)
