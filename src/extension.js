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
}

const myHash = new HashTable();

HashTable.prototype.set = function(key, value) {
  //*get our index from the hashCode function
  let index = hashCode(key);
  //*if we try adding another key-value pair at an index which already has an element, we have a collision. we use subarrays at each index to handle collisions that may occur.
  //*check and see if the index is NOT an element on the hash table
  if (!this.storage[index]) {
    //*if not, create a storage array at that index
    this.storage[index] = []
  }

   //!pseudocode below for thought process on checking if 75% of slots are taken and what to do if so, code not working. need to come back and go over.
  //*check to see after adding the key-value pairs if our size is greater than 75% of size
  this.storage[index].push([key, value])
  //*create a takenSlotsCount to keep track our which slots are being used on our array
  let takenSlotsCount = 0
  //*loop over our storage object
  for (let i = 0; i < this.storage.length; i++) {
    //*if we do have an element at the current index...
    if (this.storage[i]) {
      //*incremenet our count 
      //!this does not seem to be updating from the console log below...check!
      takenSlotsCount++
    }
  }
  console.log(takenSlotsCount)
  //*if our taken slots are greater than 75% of the size...
  if (takenSlotsCount > this.size * 3/4) {
    //*double the size then rehash everything
    this.size * 2;
    if(this.storage[index]) {
      this.stoage[index] = []
    }
    this.storage[index].push([key, value])
  }
};

HashTable.prototype.get = function(key) {
  //*get the index from the hashCode function
  let index = hashCode(key);
  //*check if the index is an element on our object
  if (this.storage[index]) {
    //*if so, the index will be a sub-array. Loop over the subarray, and check if the first element of each sub-array matches with the key we're searching for. 
    for (let i = 0; i < this.storage[index].length; i++) {
      let subArray = this.storage[index][i]
      //*if our key in the subArray matches the key we're searching for, return the value
      if (subArray[0] === key) {
        return subArray[1]
      }
    }
  }
  //*if we don't ever find a matching key, return undefined
  return undefined;
};

//!no attempt here on halfing size if less than 25%, code should be similar to above logic for doubling in set funtion...to be attempted at a later time
HashTable.prototype.remove = function(key) {
  //*grab our index from hashCode function
  let index = hashCode(key);
  let cache;
  //*check and see if our object contains the element we want to remove
  if (this.storage[index]) {
    //*loop over our storage object
    for (let i = 0; i < this.storage[index].length; i++) {
      let subArray = this.storage[index][i];
      //*if we find a sub-array that matches the key we are searching for...
      if (subArray[0] === key) {
        //*store the matching value of that key in our cache variable
        cache = subArray[1];
        //*delete the key-value pair from the hash table
        delete this.storage[index];
        //*return the cached value
        return cache;
      }
    }
  }
};

//*do 13 sets as 13 is greater than 75% of 16, when we want to double our array size
console.log(myHash.set('1', 'a'))
console.log(myHash.set('2', 'b'))
console.log(myHash.set('3', 'c'))
console.log(myHash.set('4', 'd'))
console.log(myHash.set('5', 'e'))
console.log(myHash.set('6', 'f'))
console.log(myHash.set('7', 'g'))
console.log(myHash.set('8', 'h'))
console.log(myHash.set('9', 'i'))
console.log(myHash.set('10', 'j'))
console.log(myHash.set('11', 'k'))
console.log(myHash.set('12', 'l'))
console.log(myHash.set('13', 'l'))
console.log(myHash.get('code')) //*smith
// console.log(myHash.remove('code')) //*smith
console.log(myHash.storage) //*empty array
//!as we have over 75% sets, this should double but is not doing so
console.log(myHash.SIZE)

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
