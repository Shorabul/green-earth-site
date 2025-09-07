#### 7) Create a README file to answer the following question-


#### 1) What is the difference between var, let, and const?

- **`var`** is function-scoped, not block-scoped. **`let`** is block-scoped and only accessible within curly braces `{}`. **`const`** is also block-scoped.

- **`var`** is hoisted to the top of its function scope and initialized as `undefined`. In contrast, **`let`** remains in the `temporal dead zone` until it is initialized. **`const`** is also hoisted, but like let, it stays in the `temporal dead zone` until initialization.

- **`var`** allows both `re-declaration` and `re-assignment`. **`let`** does not allow `re-declaration` but does allow `re-assignment`. On the other hand, const allows neither `re-declaration` or `re-assignment`.


#### 2) What is the difference between map(), forEach(), and filter()? 

- **`forEach()`**
    - Iterates over each element.
    - Executes a callback function.
    - Does **not** return a new array.

- **`map()`**
    - Processes every element and returns a **modified** version..
    - Returns a **new array** with the transformed values.
    - Original array remains unchanged.

- **`filter()`**
    - Goes through each item and keeps only the ones that **match** a specific condition..
    - Returns a **new array** with only the matching elements.


#### 3) What are arrow functions in ES6?

- Arrow functions are a shorter way to write functions in JavaScript.
- Example: ```const greet = name => `Hello, ${name}`;```


#### 4) How does destructuring assignment work in ES6?

- **Array Destructuring**
```const colors = ['red', 'green', 'blue']; const [first, second] = colors;```

- **skip values**
```const colors = ['red', 'green', 'blue']; const [first, , third] = colors;```

- **Object Destructuring**
```const person = { name: 'Shorabul', age: 24 }; const { name, age } = person;```

- **Rename variables or Set default values**
```const person = { name: 'Shorabul Hoque', age: 24 }; const { name, age } = person;```
```const { name: fullName, country = 'Bangladesh' } = person;```

- **Swapping variables**
```let x = 1, y = 2; [x, y] = [y, x];```


#### 5) Explain template literals in ES6. How are they different from string concatenation?

- Template literals make writing strings much easier and cleaner. Instead of using quotation marks and lots of ```+``` signs to enclose text and variables, use backticks ```(`)``` and put variables directly inside ```${...}``. Write multi-line strings without special characters.

- String Concatenation
```const user = "Shorabul"; const age = 24; const message = `User ${user} is ${age} years old.`;```

- String Concatenation
```const user = "Shorabul"; const age = 20; const message = "User " + user + " is " + age + " years old.";```