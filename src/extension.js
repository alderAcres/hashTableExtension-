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
  this.items = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function (key, value) {
  let newkey = hashCode(key, this.SIZE);
  let hashlimit = this.SIZE * 0.75;

  if (this.items >= hashlimit) {
    this.SIZE = this.SIZE * 2;
    console.log(
      "Reached upper limit, size increasing. Size is now: " + this.SIZE
    );
    for (let element in this.storage) {
      element = hashCode(element, this.SIZE);
    }
  }

  if (this.storage[newkey]) {
    this.storage[newkey][key] = value;
  } else {
    this.storage[newkey] = {};
    this.storage[newkey][key] = value;
    this.items++;
  }
};

HashTable.prototype.get = function (key) {
  let newkey = hashCode(key, this.SIZE);
  return this.storage[newkey][key];
};

HashTable.prototype.remove = function (key) {
  let newkey = hashCode(key, this.SIZE);
  let hashlimit = Math.floor(this.SIZE * 0.25);
  if (!this.storage[newkey]) return undefined;
  else {
    delete this.storage[newkey][key];
    this.items--;
    if (this.SIZE > 16 && this.items <= hashlimit) {
      this.SIZE = Math.floor(this.SIZE / 2);
      console.log(
        "Reached lower limit, size decreasing. Size is now: " + this.SIZE
      );
      for (let element in this.storage) {
        element = hashCode(element, this.SIZE);
      }
    }
  }
};

// YOUR CODE ABOVE

function hashCode(string, size) {
  "use strict";

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

//tests
// let bb = new HashTable();
// bb.set("A", 1);
// bb.set("B", 2);
// bb.set("C", 3);
// bb.set("D", 4);
// bb.set("E", 5);
// bb.set("F", 6);
// bb.set("G", 7);
// bb.set("H", 8);
// bb.set("I", 9);
// bb.set("J", 10);
// bb.set("K", 11);
// bb.set("L", 12);
// bb.set("M", 13);
// bb.set("N", 14);
// bb.set("O", 15);
// bb.set("P", 16);
// bb.set("Q", 17);
// bb.set("R", 18);
// bb.set("S", 19);
// bb.set("T", 20);
// bb.set("U", 21);
// bb.set("V", 22);
// bb.set("W", 23);
// bb.set("X", 24);
// bb.set("Y", 25);
// bb.set("Z", 26);
// bb.set("AA", 27);
// bb.set("AB", 28);
// bb.set("AC", 29);
// bb.set("AD", 30);
// bb.set("AE", 31);
// bb.set("AF", 32);
// bb.set("32829843224332", 33);
// bb.set("328298432243sdsdsddssd32", 34);
// bb.set("328298wqw432243sdsdsddssd32", 35);
// bb.set("328ewewwewewe298wqw432243sdsdsddssd32", 36);
// bb.remove("G");
// bb.remove("H");
// bb.remove("I");
// bb.remove("J");
// bb.remove("K");
// bb.remove("L");
// bb.remove("M");
// bb.remove("N");
// bb.remove("O");
// bb.remove("P");
// bb.remove("Q");
// bb.remove("R");
// bb.remove("S");
// bb.remove("T");
// bb.remove("U");
// bb.remove("V");
// bb.remove("W");
// bb.remove("X");
// bb.remove("Y");
// bb.remove("Z");
// bb.remove("AA");
// bb.remove("AB");
// bb.remove("AC");
// bb.remove("AD");
// bb.remove("AE");
// bb.remove("AF");

// console.log(bb);
// console.log(bb.get("A"));
// Do not remove!!
module.exports = HashTable;
