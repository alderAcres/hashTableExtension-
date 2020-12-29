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

HashTable.prototype.resize = function(newLimit){
  let oldStorage = this.storage;
  this.SIZE = newLimit;
  this.storage = [];

   for (let i = 0; i < oldStorage.length; i++) {
     let bucket = oldStorage[i];
     if (bucket) {
       // Reassign for each bucket
       for (let j = 0; j < bucket.length; j++) {
         let indexed = hashCode(bucket[j][0], this.SIZE);

        //  if(!this.storage[index]) this.storage[index] = [];
        //  this.storage[index].push([key, value]);

        if(!this.storage[indexed]) this.storage[indexed] = [];
        this.storage[indexed].push([bucket[j][0], bucket[j][1]])
        }
     }
   }
   return this.storage;
 };
HashTable.prototype.set = function(key, value) {
  this.count += 1;
  let index = hashCode(key, this.SIZE);
  let bucket = this.storage[index];
  if(!this.storage[index]) this.storage[index] = [];
    this.storage[index].push([key, value]);

  if(bucket) {
    for (var i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
      } 
  } 
  bucket.push(key, value);
console.log(this.count / this.SIZE)
  if(this.count / this.SIZE >= .75) this.resize(this.SIZE * 2);
   
}
};


/**
* get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed address, then you must retrieve
*   the correct value that was originally stored with the provided key
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/
HashTable.prototype.get = function(key) {
  let index = hashCode(key, this.SIZE);
  if(!this.storage[index]) return undefined;
  for(let i = 0; i < this.storage[index].length; i++) {
    if(this.storage[index][i][0] === key) return this.storage[index][i][1];
  }
};
let tree = new HashTable();
tree.set('hello', 'blue');
tree.set('hell', 'blue');
tree.set('hello', 'ble');
tree.set('hello', 'blue');
tree.set('hello', 'blue');
tree.set('hello', 'blue');
tree.set('hello', 'blue');
tree.set('hello', 'blue');
tree.set('hello', 'blue');
tree.set('hello', 'blue');
tree.set('hello', 'blue');
tree.set('hello', 'blue');

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let index = hashCode(key, this.SIZE);
  if(this.storage[index].length < 1) {
    let val = this.storage[index][1];
    this.storage.splice(0, 1);
    return val;
  }
  if(!this.storage[index]) return undefined;

  for(let i = 0; i < this.storage[index].length; i++) {
    if(this.storage[index][i][0] === key) {
      let val = this.storage[index][i][1];
      this.storage[index].splice(i, 1);
      return val;
    }
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
