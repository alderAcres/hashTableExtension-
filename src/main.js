// I didn't make it to Hash Tables, but I wanted to take my best crack at this. Timestamped comments for retrospective.
// Also - definitely requesting an hour with the fellows to clear this topic up for me. 

/*
9:26am I've spent 10 minutes researching hash tables- during the data structures segment, I was able to 
touch on Linked Lists and binary trees, but never made it to hash tables. Not panicking though! 

9:30am I THINK I get the idea, and am trying to implement some of the same logic I used in the 
previous data structure segments. If a hashtable is an object, then I can create one using the Hashtable constructor
like I would a node in a LinkedList.

9:45am Even if my syntax is terribly off, I think I understand the principles behind hash tables- We're essentially 
creating an object that stores values on a property called storage. We can set values on this array with the set method,
which assigns the value of the storage property's array to the index passed as "key". 
Again, I could be way off course. 

9:58am You know what? I may have been completely demolished by this assessment, but instead of panicking or 
spending the entire hour looking at MDN and never even writing out logic, I at least wrote out what I think is happening.


*/


/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;

  /* 9:35- added a new property to my Hashtable constructor, numberOfElements, because the SET method 
  is supposed to return the new number of elements that are actually stored.  
  My thinking is that since this.storage is an array that has a length of 16, it doesn't necessarily have
  16 elements in it- it just has 16 storage spaces. So on line ~60ish, I want to increase the number of actual
  ELEMENTS in this.storage. 
  */

  this.numberOfElements = 0;
  
  this.storage = new Array(this.SIZE);
}

var myHashTable = new HashTable();

/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  // first, check to see if the hash table has a certain KEY already.
  //9:40am- if this.storage is an array with indices 0-15, we can store values using this.storage[key]. 
  if (!this.storage[key]){
    //if not, add it to the hash table
    this.storage[key] = value;
    this.numberOfElements ++;
  }
  //"if the key DOES exist, overwrite it anyway. 
 // "If the provided key has already been used to store another value, simply overwrite the existing value with the new value."
  if (this.storage[key]){
    this.storage[key] = value;
  
      // "@return {number} The new number of items stored in the hash table"
      // 9:41am- if I am simply overwriting the number of items stored in this hash table, I'm not increasing the number of elements.
      // Therefore, I am not including the code <this.numberOfElements ++;> to this IF statement. 
  
  };
  //Finally, I'm returning the number of elements in the actual hash table, not the length of <this.storage>
  return this.numberOfElements;


};

//Next steps:
// After building the set method on the Hashtable's prototype, I would call it on the Hashtable made on line 30ish.
myHashTable.set('Hello, World!', 0);
// 9:46am- if my syntax were flawless, then logging <myHashTable.storage[0]> would return the string 'Hello, World!',
// and the meothd would also return <1>, the amount of elements in this.storage. 



/*
9:50am- I think I'm pretty far off-base now. Re-reading the instructions, I did not add any code/logic for this instruction: 
"If the hashed address already contains another key/value pair, you must handle the collision appropriately."
My thinking was that we'd be assigning VALUE to <this.storage[key]>, but now I'm kind of lost in the weeds. 

Not panicking, but definitely skipping lunch today to ask for help with Hash Tables.  

9:55am- Looking over GET, it appears that I should be storing more than one value at this.storage[key]. This is 
where I think we can implement sub-objects. If more than one value is stored at [key], then we should convert that 
key's value to an object itself, with the values stored in order. 

Again, I'm probably way off base here, but the juices are flowing. 
*/




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
