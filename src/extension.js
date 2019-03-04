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
class HashTable{
  constructor(){
    this.size = 16
    this.upperLimit = Math.ceil(this.size * 0.75)
    this.lowerLimit = Math.max(16, Math.floor(this.size * 0.25))
    this.storage = new Array(16).fill(undefined)
  }

  set(key,value){
    let hashVal = hashCode(key,this.size);
    //just going to use an array for dealing with collisions
    //downsides relative to linked list will be slower setting and removing
    //no effect on speed of getting, and easier to implement
    let node = {}
    node[key] = value;
    if (!this.storage[hashVal]){
      this.storage[hashVal] = [node]
    }else{
      //need to check if this key has already been assigned a value,
      //if so: reassign, if not: push
      let reassigned = false;
      for (let el of this.storage[hashVal]){
        if (el[key]){
          el[key] = value
          reassigned = true
          break
        }
      }
      if (!reassigned) this.storage[hashVal].push(node)
    }
    //need to return the new length
    let totalHashEntries = this.measure()
    return totalHashEntries
  }

  get(key){
    let hashVal = hashCode(key,this.size);
    if (!this.storage[hashVal]){
      console.log('no such entry in this hash table')
      return
    }

    //if the bucket (array) at this hashVal only has one element, just return it, else search for the key
    if (this.storage[hashVal].length === 1){
      console.log('no collision detected when getting')
      return this.storage[hashVal][0][key]
    }else if (this.storage[hashVal].length > 1){
      console.log('collision detected on GET')
      for (let el of this.storage[hashVal]){
        if (el[key]){
          return el[key];
        }
      }
    }else{
      console.log('no such entry in this hash table')
    }
  }

  remove(key){
    //must check first wether removing one element would put us below the lower limit

    let hashVal = hashCode(key,this.size);
    if (!this.storage[hashVal]){
      console.log('no such entry in this hash table')
      return
    }

    //if the bucket (array) at this hashVal only has one element, just return it, else search for the key
    if (this.storage[hashVal].length === 1){
      console.log('no collision detected when removing')
      let val = this.storage[hashVal].pop()[key]
      console.log('storage after removing: ',this.storage[hashVal])
      return val
    }else if (this.storage[hashVal].length > 1){
      console.log('collision detected on REM')
      for (let i = 0; i < this.storage[hashVal].length; i++){
        if (this.storage[hashVal][i][key] !== undefined){
          let val = this.storage[hashVal].splice(i,1)[0][key]
          console.log('storage after removing: ',this.storage[hashVal])
          return val
        }
      }
    }else{
      console.log('no such entry in this hash table')
    }
  }

  measure(newLength = this.size){
    //this function calculates the 'size' of the hashmap and checks it against the upper and lower limits
    let length = 0
    for (let el of this.storage){
      if (el){
        el.forEach(element => {
          length++;
        });
      }
    }
    console.log(`hash table now has ${length} entries`)

    if (newLength > this.upperLimit){
      //reassign size and rehash here 
    }else if (newLength < this.lowerLimit){
      //reassign size and rehash here 
    }

    return length
  }
}

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
