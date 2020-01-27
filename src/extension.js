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

HashTable.prototype.set = function(key, value) {
  let hashObj = {};
  hashObj[key] = value;
  let currLength = 0;
  for(let each in this.storage){
    if(each !== null){
      currLength += 1;
    }
  }
  //this if statement checks how full the length is. 
  if(currLength === ((0.75 * this.SIZE) - 1)){
    const newObj = {};

    //this for loop should iterate through this.storage to grab everything currently stored. 
    //this chunk of code does not work. 

    for(let i = 0; i < this.SIZE; i++){
      Object.assign(newObj, this.storage[i])
    // }
    // for(let eachObj in this.storage){
    //   //console.log('these are the objects: '+ eachObj)
    //   for(let every in eachObj){
    //     console.log('THESE ARE THE EVERY' + eachObj[every])
    //     newObj[every] = eachObj[every]
    //   }
    // }
    console.log(newObj);
    this.SIZE *= 2;
    this.storage = {};
    //this for loop should iterate through newObj to rehash everything that used to be in this.storage.
    for(let eachKey in newObj){
      console.log('these are keys getting pushed: ' + eachKey)
      this.storage[hashCode(eachKey, this.SIZE)] ? this.storage[hashCode(eachKey, this.SIZE)][key] = value :  this.storage[hashCode(eachKey, this.SIZE)] = hashObj;
    }
  }
  this.storage[hashCode(key, this.SIZE)] ? this.storage[hashCode(key, this.SIZE)][key] = value :  this.storage[hashCode(key, this.SIZE)] = hashObj;
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
  return this.storage[hashCode(key, this.SIZE)][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  if(this.storage[hashCode(key, this.SIZE)] === undefined){return undefined;}
  let currLength = 0;
  for(let each in this.storage){
    if(each !== null){
      currLength += 1;
    }
  }
  console.log('Current Storage Length: ' +currLength);
  const val = this.storage[hashCode(key, this.SIZE)][key];
  if(currLength === ((0.25 * this.SIZE) + 1)){
    delete this.storage[hashCode(key, this.SIZE)][key];
    const newObj = {};
    for(let eachObj in this.storage){
      for(let every in eachObj){
        newObj[every] = eachObj[every]
      }
    }
    this.SIZE /= 2;
    this.storage = {};
    for(let eachKey in newObj){
      this.storage[hashCode(eachKey, this.SIZE)] ? this.storage[hashCode(eachKey, this.SIZE)][key] = value :  this.storage[hashCode(eachKey, this.SIZE)] = hashObj;
    }
  }
  else{
    delete this.storage[hashCode(key, this.SIZE)][key];
  }
  return val;
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


const hash = new HashTable();
hash.set('kermit','frog');
hash.set('mspiggy','pig');
hash.set('rudolph','reindeer');
hash.set('dasher','reindeer');
hash.set('dancer','reindeer');
hash.set('prancer','reindeer');
hash.set('vixen','reindeer');
hash.set('comet','reindeer');
hash.set('cupid','reindeer');
hash.set('donner','reindeer');
hash.set('blitzen','reindeer');
hash.set('olive','reindeer');
hash.set('kobe','bryant');
console.log(hash);
hash.set('Gianna', 'Bryant');
hash.set('Giannis', "Antentokuompo");
hash.set('James', "Harden");
hash.set('Stephen', "Curry");
hash.set('Kevin', "Durant");
hash.set('Lebron', "James");
hash.set('Anthony', "Davis");
hash.set('Russell', "Westbrook");
hash.set('Demar', "Derozan");
hash.set('Klay', "Thompson");
hash.set('Kyle', "Lowry");


console.log(hash);

// Do not remove!!
module.exports = HashTable;
