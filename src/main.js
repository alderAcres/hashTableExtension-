/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
class HashTable{
  constructor(){
    this.size = 16
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

  measure(){
    let length = 0
    for (let el of this.storage){
      if (el){
        el.forEach(element => {
          length++;
        });
      }
    }
    console.log(`hash table now has ${length} entries`)
    return length
  }
}

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


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/

// //tests:
// let table1 = new HashTable()
// console.log(table1)

// table1.set('cat1',1)
// table1.set('cat2',2)
// table1.set('cat3',3)
// table1.set('cat3',99)
// table1.set('cat4',4)
// table1.set('cat5',5)
// table1.set('cat6',6)
// table1.set('cat7',7)
// table1.set('cat8',8)
// table1.set('cat9',9)
// table1.set('cat10',10)
// table1.set('cat11',11)
// table1.set('cat12',12)
// table1.set('cat13',13)
// table1.set('cat14',14)
// table1.set('cat15',15)
// table1.set('cat16',16)
// console.log(table1.set('cat17',17))

// console.log(table1)

// console.log(table1.remove('cat2'))
// console.log(table1.remove('cat3'))
// console.log(table1.remove('cat3'))
// console.log(table1.remove('cat17'))


// console.log(table1.get('cat13'))
// console.log(table1.get('cat17'))



// Do not remove!!
module.exports = HashTable;
