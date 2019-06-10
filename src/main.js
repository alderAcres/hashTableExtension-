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
  this.items = 0;
}

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

function HashLL() {
  this.head = null ;
  this.tail = null ;
  this.length = 0 ;
}

function HashLLNode(k, val) {
  this.key = k ;
  this.value = val ;
  this.next = null ;
}

HashLL.prototype.addNode = function(key, value) {
  if (!this.head) { //if the bucket is empty, add to head (and tail)
    const newNode = new HashLLNode(key, value)
    this.head = newNode ;
    this.tail = newNode ;
    this.length++ ;
  }
  else { //if the bucket is not empty, add to tail
    //but must overwrite a value if the same key is given
     //keeps track of if we added a new Node or overwrote an old one
    if (this.head.key === key) {this.head.value = value ; return } //overwrites head value if head key is same and no other links in list
    if (this.tail.key === key) {this.tail.value = value ; return } //overwrites tail value if tail key is same
    let curr = this.head ;
    while (curr.next) {
      if (curr.key === key) { //if found key in middle of list, reassign value and return
        curr.value = value ;
        return ;
      }
      curr = curr.next ;
    }
    const newNode = HashLLNode(key, value)
    curr.next = newNode ;
    this.tail = newNode ;
    this.length++ ;
  }
}

HashTable.prototype.set = function(key, value) { 
  //find which bucket to dump key,value pair in
  //create LL if bucket is empty
  //add key, value pair to bucket's LL
  //increment # of items of this
  //return this number
  let bucket = hashCode(key, this.SIZE) ;
  if (!this.storage[bucket]) { //if the slot in the storage is empty
    this.storage[bucket] = new HashLL() ; //create LL
  }
  // console.log(this.storage[bucket])
  let originalLength = this.storage[bucket].length ;
  this.storage[bucket].addNode(key, value) ; //add key, value pair as node to storage bucket's LL
  if (this.storage[bucket].length > originalLength) { //if the length of the bucket's LL changes, we know we added a node
    this.items++
  }
  return this.items ;
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
  //use hashCode to find bucket
  //look for key
  //return value
  let bucket = hashCode(key, this.SIZE) ;
  if (this.storage[bucket] == undefined) {
    return `Sorry, but ${key} is not in this hash table`
  }
  //finds value if key is in head //potentially unneccessary 
  // if (this.storage[bucket].head.key === key) {
  //   return this.storage[bucket].head.value ;
  // }
  else {
    let curr = this.storage[bucket].head ;
    while (curr) {
      if (curr.key === key) {return curr.value} //if our current link has the key, return value
      if (curr.next === null ) {return `Sorry, but ${key} is not in this hash table`} //if we hit the tail and never found the key, it's not there
      curr = curr.next ; //if the curr link doesn't have the key, keep moving
    }
  }
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
  //use hashCode to find bucket
  //look for key
  //delete key and reutrn value
  let bucket = hashCode(key, this.SIZE) ;
  if (this.storage[bucket] == undefined) {
    return `Sorry, but ${key} is not in this hash table`
  }
  // finds value if key is in head //potentially unneccessary 
  if (this.storage[bucket].head.key === key) { 
    let removed = this.storage[bucket].head.value ;
    if (this.storage[bucket].head.next) { //if the LL has more links
      this.storage[bucket].head = this.storage[bucket].head.next ;
    }
    else { //if we just cut off the head and there's nothing to follow
      this.storage[bucket] = undefined ; //obliterate LL
    }
    return removed;
  }
  else {
    let curr = this.storage[bucket].head ;
    if (curr.next === null ) {return `Sorry, but ${key} is not in this hash table`} //if we hit the tail and never found the key, it's not there
    while (curr.next) {
      if (curr.next === null ) {return `Sorry, but ${key} is not in this hash table`} //if we hit the tail and never found the key, it's not there
      if (curr.next.key === key) { //if our current link has the key, delete and return value
        let removed = curr.next.value ;
        if (curr.next.next) {
          curr.next = curr.next.next ;
        }
        return removed ;
      }
      curr = curr.next ; //if the curr link's next doesn't have the key, keep moving
    }
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


let hash = new HashTable() ;
console.log(hash.SIZE)
console.log(hash.storage)
console.log(hash.items)

//set something
hash.set("meow", "meowmeow") //tests setting
console.log(hash.set("meow", "woof")) //tests return value = # of items
hash.set("meow", "woof") //tests overwriting key values
console.log(hash.SIZE)
console.log(hash.storage)
console.log(hash.items)

console.log(hash.get('mdeow'))
console.log(hash.get('meow'))

console.log(hash.remove("jjjj"))
console.log(hash.remove("meow"))


let newHashTable = new HashTable() ;
for (let i=0; i<18; i++) {
  k = "meow" + i ;
  v = "meow" + i ;
  newHashTable.set(k, v) ;
}

console.log(newHashTable)