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


HashTable.prototype.set = function(key, value) {
  // pass the key and size into hashcode, assign it to const index. The index will then be the correct index in storage
  const index = hashCode(key, this.SIZE)
  //if add the new item will push the number of stored item to over 75%
  if(this.number + 1 >= 3/4 * this.SIZE){
    //create a variable with all items from old storage
    const oldStorage = this.storage

    //set storage to new array with correct size
    this.storage = new Array(this.SIZE * 2)

    // set the correct size to size
    this.SIZE = this.SIZE * 2;
    // set number to 0, because the recursion will handle the increments of number
    this.number = 0;
    

    //iterate through every item in old storage and recursively call the set function with keys and values
    for (let i = 0; i < Object.keys(oldStorage).length; i += 1){
      for ([key, value] in Object.entries(oldStorage[i])){
        this.set(key,value)
      }
    }


  }
  else {

    //check if spot in index is undefined
    //if undefined, at index create a new object and as key value pair.
    if (this.storage[index] === undefined){
      this.storage[index] = {}
      this.storage[index][key] = value
      this.number += 1
    } else {
      // if object exists at index, add key and value pair

      let tempObj = {}
      tempObj[key] = value
      let oldObj = this.storage[index]
      
      this.storage[index][key] = value

    }

    // return the number of key value pairs in  hashtable
    return this.number

  }
    

};



HashTable.prototype.remove = function(key) {
  //correct index of item in storage
  const index = hashCode(key, this.SIZE)

  // if the value of the key at the correct index in hashtable is undefined return undefined
  if (this.storage[index][key] === undefined) return undefined

  //store the value key and value that will be deleted
  const storedObject = this.storage[index][key]



  // delete the item
  delete this.storage[index][key]



  if(this.storage[index] === {} ){
    this.storage[index] === undefined
    this.number -= 1;
  }

  //return the deleted item
  return storedObject


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
