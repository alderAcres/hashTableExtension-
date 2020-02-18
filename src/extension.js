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
/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  //get number of stored items
  let storedItems = Object.keys(this.storage).length
  //get 3/4 of this.SIZE
  let sevenFivePercent = this.SIZE*.75
  //if storage size is = or greater than this num set this.SIZE to this.SIZE times 2
  if(storedItems >= sevenFivePercent) {
    this.SIZE = this.SIZE*2
  }

  //set an index with hash code
    let index = hashCode(key, this.SIZE)
    //if an obj at the index already exists, add new key/value pair
    if(this.storage[index]) {
      this.storage[index][key] = value
    //if not, create a new object and set its key value pair
    } else {
      let newObj = {}
      newObj[key] = value
      this.storage[index] = newObj
    }
};

HashTable.prototype.get = function(key) {
  //get index from provided key
  let index = hashCode(key, this.SIZE)
  //set new varable to retrived object 
  let retrievedObj = this.storage[index]
  //get value of object
  let value = retrievedObj[key]
  //return value
  return value
};
// - If the hash table's SIZE is greater than 16 and the result of removing the
// item drops the number of stored items to be less than 25% of the hash table's SIZE
// (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
HashTable.prototype.remove = function(key) {
  //get number of stored items
  let storedItems = Object.keys(this.storage).length
  //get 3/4 of this.SIZE
  let twentyFivePercent = this.SIZE*.25
  //current stored items is less than 25% of the current size, set this.size back to 16
  if(this.SIZE > 16 && storedItems < twentyFivePercent) {
    this.SIZE = this.SIZE/2
  }
  console.log(this.SIZE)
  //get index from provided key
  let index = hashCode(key, this.SIZE)
  //check if theres an object
  if(this.storage[index] === undefined) return undefined
  //if there is delete the object
  delete this.storage[index]
};

let newHash = new HashTable()
newHash.set('password', 'My name is Taylor')
newHash.set('newPass', 'More information')
console.log(newHash.storage)
newHash.set('newpassfrgsd', "this is a collision")
console.log(newHash.storage)
console.log(newHash.get('newpassfrgsd'))
console.log(newHash.get('password'))
newHash.remove('password')
console.log(newHash.storage)



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
