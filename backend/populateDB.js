import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CodeBlock from './models/codeBlock.js'; 

dotenv.config();

async function deleteAndInsertData() {
  try {

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

  
    const codeBlocks = [
      {
        title: 'Array Manipulation Example',
        code: `
          // This is an example of array manipulation
          const numbers = [1, 2, 3, 4, 5];
    
          // Using map to square each number
          const squaredNumbers = numbers.map(num => num * num);
          console.log('Squared Numbers:', squaredNumbers);
    
          // Using filter to get even numbers
          const evenNumbers = numbers.filter(num => num % 2 === 0);
          console.log('Even Numbers:', evenNumbers);
    
          // Using reduce to sum all numbers
          const sumOfNumbers = numbers.reduce((acc, num) => acc + num, 0);
          console.log('Sum of Numbers:', sumOfNumbers);
        `
      },
      {
        title: 'Object Destructuring Example',
        code: `
          // This is an example of object destructuring
          const person = {
            name: 'John Doe',
            age: 30,
            address: {
              street: '123 Main St',
              city: 'Somewhere',
              state: 'CA'
            }
          };
    
          // Destructuring object properties
          const { name, age, address: { street, city, state } } = person;
    
          console.log('Name:', name);
          console.log('Age:', age);
          console.log('Street:', street);
          console.log('City:', city);
          console.log('State:', state);
        `
      },
      {
        title: 'Async Function Example',
        code: `
          // This is an example of an async function
          async function fetchData() {
            try {
              const response = await fetch('https://api.example.com/data');
              const data = await response.json();
              console.log(data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
    
          fetchData();
        `
      },
      {
        title: 'Promise Example',
        code: `
          // This is an example of using Promises
          const fetchData = () => {
            return new Promise((resolve, reject) => {
              fetch('https://api.example.com/data')
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
            });
          };
    
          fetchData()
            .then(data => console.log(data))
            .catch(error => console.error('Error fetching data:', error));
        `
      }
    ];

  
     //await mongoose.connection.dropCollection('CodeBlocks'); 

  
  await mongoose.connection.collection('codeblocks').insertMany(codeBlocks);

    console.log('inserted successfully');
    // console.log('Data deleted and inserted successfully');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.disconnect(); 
  }
}





async function getDocuments() {
  try {
 
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

  

    const codeblocks = await CodeBlock.find();       
   console.log(codeblocks);
  } catch (error) {
    console.error('Error retrieving documents:', error);
  } finally {
    mongoose.disconnect(); 
  }
}


//deleteAndInsertData() ;
getDocuments();
