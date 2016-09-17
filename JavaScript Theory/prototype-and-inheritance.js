// **  Prototypal inheritance
var parent = {
  value: "parentValue",
  obj: {
    objValue: "parentObjValue"
  },
  walk: function () {
    console.log("walking!");
  }
};

var child = Object.create(parent); // So child will inherit from parent
console.log("CHILD - child.value: ", child.value);
console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
console.log("PARENT - parent.value: ", parent.value);
console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
console.log("parent: ", parent);
console.log("child: ", child);

child.value = "childValue";
child.obj.objValue = "childObjValue";
console.log("*** CHANGED: child.value = 'childValue'");
console.log("*** CHANGED: child.obj.objValue = 'childObjValue'");
console.log("CHILD - child.value: ", child.value);
console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
console.log("PARENT - parent.value: ", parent.value);
console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
console.log("Parent: ", parent); // Parent object
console.log("Child: ", child); // {}
// changing the value of the nested object via the child changes the object value in the parent and the child

console.log("child.obj === parent.obj ? ", child.obj === parent.obj);
// TRUE - they are the same instance - shallow copy of pointers


var grandChild = Object.create(child);
console.log("Grandchild: ", grandChild);
grandChild.walk(); // from parent

//** Function constructors
// See my other course: HTML, CSS, and Javascript for Web Developers
// Lecture #48
function Dog(name) { // Capital letter denotes constructor
  this.name = name;
  console.log("'this' is: ", this);
}
// using function as constructor 
var myDog = new Dog("Max");
console.log("myDog: ", myDog);

// Not being used as a function constructor
Dog("Max2"); //  adds/changes name property in global scope (in web dev this is the browser window)

// With nested controllers the inner ones do prototypal inheritance on the outer ones
// so the nested ones have access to anything defined in the scope of the outer one(s)
// this means we need to be careful since changing a nested object (object value) inherited by an inner controller will also change the value in the outer one and all other inner controllers since all the contoller objects reference the same object/value in memory

// SO we use ng-controller="Controller1 as Ctrl1" to use controller 1 but also have an object ctrl1 that we can attach properties to
// so we get an attachment to the $scope service in this case $scope.ctrl1 which points to an instance of the controller object
// so we may now used this instead of injecting $scope when designing controllers
// can access parent using $scope.$parent ...

// using as notation means that new stuff is not added to $scope but to $scope.[as notation]
// start controller with var name = this so we can then use name in place of this when adding stuff 
// then use {{label.property}} when outputting
// with as dont need to inject $scope unless its explicitly used