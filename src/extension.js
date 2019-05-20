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
//create a counter everytime a new key : value is added
HashTable.prototype.count = 0;

HashTable.prototype.set = function(key, value) {
  if(this.SIZE / this.count > .75 ){
    this.SIZE *= 2;
  };
  const valueIndex = hashCode(key, this.SIZE);
  this.storage[valueIndex] = {[key]: value};
  //create a count everytime we set something new
  this.count += 1;
};
//remove counter everytime we delete 
HashTable.prototype.remove = function(key) {
  if(this.SIZE > 16 && this.SIZE  < Math.floor(this.SIZE / 4)){
    this.SIZE =  thiss.SIZE / 2;
    //rehash everything 
    //find the buckets with things with filter and then rehash every element
    //find all active keys
    const filtedArr = Object.keys(this.storage).filter((el) => el);
    
    //find all active values
    //rehash those key value pairs
  };
  const valueIndex = hashCode(key, this.SIZE);
  if(!this.storage[valueIndex]){
    return undefined;
  }
  // get the index of a key in a bucket
  const theVal = Object.keys(this.storage[valueIndex]).indexOf(key);
  //delete specific key if multiple keys are in same bucket;
  if(Object.keys(this.storage[valueIndex]).length > 1){
    //console.log('deleting')
    delete this.storage[valueIndex][theVal];
  }
  //get the object if it only has 1 key value
  delete this.storage[valueIndex][key];
  //never mind, you can't delete objects
  this.count -= 1;
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
