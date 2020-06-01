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
  this.SIZE = 4;
  this.ITEMS = 0;
  this.PAIRS = {}
  this.storage = new Array(this.SIZE);
}


HashTable.prototype.set = function(key, value) {
   this.ITEMS++

   this.PAIRS[key] = value

   if (this.ITEMS > this.SIZE * .75){
     this.SIZE = this.SIZE * 2
     this.storage = new Array(this.SIZE)

     for (let prop in this.PAIRS){
       let arrayIndexDouble = hashCode(prop, this.SIZE)

       //  if the place in the array already has an object, add that key value pair to that object
      if (this.storage[arrayIndexDouble]){
        this.storage[arrayIndexDouble][prop] = this.PAIRS[prop]
        
      } 
      // else create a new Object storing that key value pair and setting it to that index in the array
      else {
        let newObject = {}
        newObject[prop] = this.PAIRS[prop]
        this.storage[arrayIndexDouble] = newObject  
      } 
     }
     
     
   }

   else {
          // find the index where the value should be placed, invoking hashcode with key and array size
          let arrayIndex = hashCode(key, this.SIZE)

          //  if the place in the array already has an object, add that key value pair to that object
          if (this.storage[arrayIndex]){
            this.storage[arrayIndex][key] = value
            
          } 

          // else create a new Object storing that key value pair and setting it to that index in the array
          else {
            let newObject = {}
            newObject[key] = value
            this.storage[arrayIndex] = newObject  
          } 
   }
  
   
};


HashTable.prototype.get = function(key) {
  // find the index where the value should be placed, invoking hashcode with key and array size
    let arrayIndex = hashCode(key, this.SIZE);
    let object = this.storage[arrayIndex]
     
    // iterate the hrough the object, if the prop is equal to the key, return the value of that key
    for (let prop in object){
      if (prop === key){
        return object[prop]
      }
    }
    // return false if nothing is found
    return false
};


HashTable.prototype.remove = function(key) {

  // find the index where the value should be placed, invoking hashcode with key and array size
  let arrayIndex = hashCode(key, this.SIZE);
  let object = this.storage[arrayIndex]
  
  // if object doesn't exist return undefined
  if(!object){
    return undefined
  }

  // else run a for  loop through that object, if that property exists within the object, we remove it
  for (let prop in object){
    if (prop === key){
      delete object[prop]
      this.ITEMS--
      return
    }
  }

  return undefined
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

const phoneNumbers = new HashTable()
phoneNumbers.set('Anthony',9179969715)
phoneNumbers.set('Police',911)
phoneNumbers.set('Hero',987654321)
phoneNumbers.set('David',987654322)
console.log(phoneNumbers)
// Do not remove!!
module.exports = HashTable;
