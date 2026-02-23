## Answers to Questions

## - 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

     Answers to the Questions no-01
     ==============================

 Difference between getElementById, getElementsByClassName, querySelector, querySelectorAll

getElementById selects a single element using its id.

getElementsByClassName selects multiple elements using class name and returns an HTMLCollection.

querySelector selects the first matching element using CSS selector.

querySelectorAll selects all matching elements using CSS selector and returns a NodeList.

## - 3. How do you create and insert a new element into the DOM?

     Answers to the Questions no-01
     ==============================

We use document.createElement() to create a new element.
Then we use appendChild() or append() to insert it into the DOM.

Example:
const div = document.createElement("div");
div.innerText = "Hello";
document.body.appendChild(div);

## - 4. What is Event Bubbling? And how does it work?

     Answers to the Questions no-01
     ==============================


 Event bubbling means when an event happens on a child element,
it first runs on that element,
then moves upward to its parent,
then to document.



## - 5. What is Event Delegation in JavaScript? Why is it useful?

     Answers to the Questions no-05
     ==============================

    
Event delegation means adding one event listener to a parent element to handle events for its child elements.
It improves performance and reduces multiple event listeners.

## - 6. What is the difference between preventDefault() and stopPropagation() methods?

     Answers to the Questions no-06
     ==============================

preventDefault() stops default browser behavior.

stopPropagation() stops the event from bubbling to parent elements.
