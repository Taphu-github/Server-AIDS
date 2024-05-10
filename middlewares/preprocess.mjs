import Animal from '../models/animal.mjs';
import moment from 'moment';

export default async function preprocessAnimalData(req, res, next){
    res.setHeader('Content-Type', 'application/json');

    try {
        
        // Fetch animal data from the database
        const data=await Animal.find()
        console.log(data);
        const uniqueDates = [...new Set(data.map(({ enroachDate }) => moment(enroachDate).format('YYYY-MM-DD')))].sort();

        // Step 2: Initialize seven arrays filled with zeros
        const horseArray = new Array(uniqueDates.length).fill(0);
        const monkeyArray = new Array(uniqueDates.length).fill(0);
        const bearArray = new Array(uniqueDates.length).fill(0);
        const boarArray = new Array(uniqueDates.length).fill(0);
        const cattleArray = new Array(uniqueDates.length).fill(0);
        const deerArray = new Array(uniqueDates.length).fill(0);
        const elephantArray = new Array(uniqueDates.length).fill(0);
        // Initialize arrays for other animals similarly...
        
        // Step 3: Iterate through the data and accumulate total animal counts per day
        data.forEach(({ enroachDate, animalCount, animalname }) => {
        const dateIndex = uniqueDates.indexOf(moment(enroachDate).format('YYYY-MM-DD'));
        switch (animalname) {
            case 'Bear':
            bearArray[dateIndex] += animalCount;
            break;
            case 'Boar':
            boarArray[dateIndex] += animalCount;
            break;
            case 'Cattle':
            cattleArray[dateIndex] += animalCount;
            break;
            case 'Deer':
            deerArray[dateIndex] += animalCount;
            break;
            case 'Elephant':
            elephantArray[dateIndex] += animalCount;
            break;
            case 'Horse':
            horseArray[dateIndex] += animalCount;
            break;
            case 'Monkey':
            monkeyArray[dateIndex] += animalCount;
            break;
            
            
            // Accumulate counts for other animals similarly...
        }
        });
        const returnobj={
            'Dates': uniqueDates,
            'Bear':bearArray,
            'Boar': boarArray,
            'Cattle':cattleArray,
            'Deer':deerArray,
            'Elephant':elephantArray,
            'Horse':horseArray,
            'Monkey':monkeyArray
        };
        // Store the preprocessed data in res.locals
        res.locals.animals=returnobj;
        next();
        } catch (err) {
        res.status(500).json('Error: ' + err.message); // Handle errors
        }
    }

  