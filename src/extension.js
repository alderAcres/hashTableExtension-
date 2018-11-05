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
    // delcare a varible to keep track of the current length 
    this.SIZE = 16;
    this.currentLen = 0;

    this.storage = new Array(this.SIZE);
}


HashTable.prototype.set = function(key, value) {

    // increment the current length everytime we put soemthing in the space
    // check if current length is greter than or equal to 75% times the SIZE
    // if true:   call new rehash function 


    let index = hashCode(key, this.SIZE);

    if (this)

        if (!this.storage[index]) this.storage[index] = {}; currentLen += 1;
    this.storage[index][key] = value;
    this.currentLen += 1;

    if (this.currentLen >= 0.75 * this.SIZE) {
        this.rehash();
    }
};

// create a new prototype to function in a rehash function passing in the size
// reassign the whole size to size mutilply by 2
// set the current length to 0; 
// dellcare another reference for the storage so if doesnt affect 

HashTable.prototype.rehash = function(size) {
    this.SIZE * 2;




}


HashTable.prototype.get = function(key) {
    let index = hashCode(key, this.SIZE);

    return this.storage[index][key];
};


HashTable.prototype.remove = function(key) {
    // declare a varible to store the removed index value 
    // delete that value at index 
    // return removed index value we stored int he varible 
    let index = hashCode(key, this.SIZE);

    let removed = this.storage[index][key];

    delete this.storage[index][key];

    return removed;
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

let hashtable = new HashTable;

hashtable.set("cat", 8);
hashtable.set("toy", 8);
hashtable.set("world", 7);
hashtable.set("play", 8);
hashtable.set("see", 8);
hashtable.set("jump", 8);
hashtable.set("high", 8);
hashtable.set("owl", 8);
hashtable.set("ca", 8);
hashtable.set("to", 8);
hashtable.set("wo", 7);
hashtable.set("p", 8);
hashtable.set("awe", 8);
hashtable.set("fly", 8);
hashtable.set("ihone", 8);
hashtable.set("look", 8);
hashtable.set("tool", 8);
hashtable.set("move", 8);
hashtable.set("quit", 7);
hashtable.set("phone", 8);
hashtable.set("copute", 8);
hashtable.set("code", 8);
hashtable.set("wet", 8);
hashtable.set("don", 8);
hashtable.set("at", 8);
hashtable.set("t", 8);
hashtable.set("rld", 7);
hashtable.set("pla", 8);
hashtable.set("s", 8);
hashtable.set("j", 8);
hashtable.set("hig", 8);
hashtable.set("o", 8);

// console.log(hashtable.remove("high"))
// 
console.log(JSON.stringify(hashtable));
