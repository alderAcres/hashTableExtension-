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
  this.length = 0
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function (key, value) {

  //check if this.SIZE is more than 75% full
  //if it is, double the size & rehash everything
  //to rehash everything, create new key/value pairs 
  //to do this, need to retrieve the original keys and hash w/ those, not the hashed key.
  const output = hashCode(key, this.SIZE);
  this.storage[output] = value;
  this.length++;
  
  //const currentSize = this.size; //use this to compare if we need to rehash?
  hashCheck(this.length, this.SIZE)


};


HashTable.prototype.get = function (key) {

  const output = hashCode(key, this.SIZE);
  if (this.storage[output]) return this.storage[output];

  return null;
};


HashTable.prototype.remove = function (key) {

  const output = hashCode(key, this.SIZE);
  const deleted = this.storage[output];
  if (this.storage[output]) delete this.storage[output];

  return deleted;

};

const hashCheck = (input, size) => {
  
//need to calculate fullness of the hashtable
  //need to compare that number w/ an if to the present fullness.
    //if greater than 75%, double the size of this.SIZE.
    //if less than 25%, need to reduce the size.
  const percent = input * 100 / size;  //calculate the percent?
  const floored = Math.ceil(percent);

  if (input > floored) this.SIZE *= 2; 

} 

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


 let myTable = new HashTable();
 myTable.set("one", "one");
 myTable.set("three", "three");
 myTable.set("two", "two");
 myTable.set("four", "four");
 myTable.set("five", "five");
 myTable.set("six", "two")
 myTable.set("seven", "two")
 myTable.set("eight", "two")
 myTable.set("nine", "two")
 myTable.set("ten", "two")
 myTable.set("elev", "two")
 myTable.set("twelve", "tweleve")

// let myVal = myTable.get("o1e")
// myVal = myTable.remove("one")
// console.log(myVal)
 console.log(myTable)

// Do not remove!!
module.exports = HashTable;
