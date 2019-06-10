function LinkedList(...args) {
  this.head = null;
  this.tail = null;
  for(let arg of args){
    this.push(arg)
  }
  this.type = 'LinkedList'
}

function Node(val) {
  this.value = val;
  this.next = null;
  this.back = null;
}

// adds node to end of list
LinkedList.prototype.push = function(value) {
  const temp = new Node(value);
  if(this.head === null) {
    this.head = temp;
    this.tail = temp;
  } else {
    
    temp.back = this.tail
    this.tail.next = temp;
    this.tail = temp;
  }
  // this.tail = temp;
};

// returns true if value is present in the list
LinkedList.prototype.contains = function(value) {
  let curr = this.head
  while (curr !== null){ //REMEMBER IT MUST BE CURR (IF CURR.NEXT will ignor ethe last one ) 
    if (curr.value === value){
      return true
    }
    const temp = curr.next
    curr = temp
  }
  return false
};

// Bonus
// adds node to beginning of list
LinkedList.prototype.addToHead = function(value) {
  let temp = new Node(value)
  temp.next = this.head
  this.head = temp
};

// Extra Bonus
// insert an item at the position specified
LinkedList.prototype.insert = function(value, position) {
  if(position === 0){
    this.addToHead(value)
  }
  let count = 1
  let curr = this.head
  while(curr != null){
    if(count === position){
      let temp = new Node(value)
      temp.next = curr.next
      curr.next = temp
      break
    }
    curr = curr.next
    count++;
  }
};

//EXTRA HELPER FUNCTION TO PRINT LIST
LinkedList.prototype.print = function(){
  let curr = this.head
  let llStr = ''
  while(curr != null){
      llStr += curr.value +  " => "
      curr = curr.next
  }
  if(curr == null){
      llStr += "null"
  }
  console.log(llStr)
}
// Extra Bonus
// remove first occurrence of value from list
LinkedList.prototype.removeItem = function(value) {

};

// Extra Bonus
// remove element at specified position in list
LinkedList.prototype.removePosition = function(position) {

};

module.exports = LinkedList
