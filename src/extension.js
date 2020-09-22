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
  this.hashUsed = 0
  this.storage = new Array(this.SIZE);
}


HashTable.prototype.set = function(key, value) {
  // Determine hash value 
let newHash = hashCode(key, this.SIZE);

  //Determine if an object already exists at this hash value
if(!this.storage[newHash]) {

  //No object exists then create new empty object
  this.storage[newHash] = {};
  this.hashUsed++;

  //Set key value pair in appropriate hash location
  this.storage[newHash][key] = value;

  //Hash already exisits with key
} else if(this.storage[newHash][key]){

  //Reset key value to new value passed in with function
   this.storage[newHash][key] = value;


  //Obj is defined but no matching key then set key value pair
} else this.storage[newHash][key] = value;

//Code to test if hash has reached capacity
if(this.hashUsed > (this.SIZE * .75)){

  this.SIZE = this.SIZE * 2;
  this.hashUsed = 0;
  let oldArr = this.storage;
  this.storage = new Array(this.SIZE);

  for(let i = 0; i < oldArr.length; i++){
    if(oldArr[i]){
      for(let prop in oldArr[i]){
      let newHash = hashCode(prop, this.SIZE);
      //repeat code to reset new hashes
      }
    }
  }
};


}


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
// Determine hash value 
let newHash = hashCode(key, this.SIZE);

//Does an obj exist at this hash and if not return no key  value exists
if(this.storage[newHash] === undefined) return 'No value with this key exists';


//Object exists but no matching key pair then return no key value exists
else if(this.storage[newHash][key] === undefined) return 'No value with this key exists';


//Key is found in appropriate hash: return matching value
else return this.storage[newHash][key];

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
// Determine hash value 
let newHash = hashCode(key, this.SIZE);

//Determine if obj exists at key or if key exists within obj

if(this.storage[newHash] === undefined) return undefined;

else if(this.storage[newHash][key] === undefined) return undefined;

else{
//Store value of key pair that is being deleted
  let output = this.storage[newHash][key];

  //Delete key pair
  delete this.storage[newHash][key];

  //Return value of passed in key
  return output;
}
};


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



let newHaz = new HashTable();

newHaz.set('hi', 45)
newHaz.set('hillz', 50)
newHaz.set('bi', 45)
newHaz.set('byes', 45)
newHaz.set('hello', 5)
newHaz.set('hey', 5)
newHaz.set('book', 5)
newHaz.set('ipad', 45)
newHaz.set('man', 50)
newHaz.set('look', 45)
newHaz.set('learn', 45)
newHaz.set('help', 5)
newHaz.set('cup', 45)
newHaz.set('bowl', 50)
newHaz.set('food', 45)
newHaz.set('please', 45)
newHaz.set('waterz', 5)
newHaz.set('ughsss', 5)

console.log(newHaz.get('hi'))
console.log(newHaz.get('no'))

console.log(newHaz)

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
