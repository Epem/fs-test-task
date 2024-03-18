import mongo from '../conn/mongo.js';

import { Types } from 'mongoose';

import { body } from 'express-validator';

import { errorBodyHandler } from '../helpers/index.js'

const list = () => {
    return async function (req, res, next) {
        try {
            const { sort, feature, energyClass, capacity, page, limit } = req.body;
            let query = {};
            let sortField;
            let intLimit = 6;
            let skip = 0;

            if (feature && feature.length) {
                query.features = feature;           }

            if (energyClass && energyClass.length) {
                query.energyClass = energyClass;
            }

            if (capacity && capacity.length) {
                query.capacity = parseFloat(capacity);
            }

            switch (sort) {
                case 'price':
                    sortField = 'price.value';
                    break;
                case 'capacity':
                    sortField = 'capacity';
                    break;
                case '':
                    sortField = '_id';
            }

            if (!isNaN(page)) {
                let intPage = parseInt(page);
                let pageNumber = intPage > 0 ? intPage : 1;
                intLimit = !isNaN(limit) ? parseInt(limit) : intLimit; 
                skip = (pageNumber - 1) * intLimit;
            }

            let machinesWithFeatures = await mongo.getMachinesWithFeatures(query, sortField, skip, intLimit);
            
            
            res.status(200).json(machinesWithFeatures);



        } catch (error) {
            console.error('Error with body', req.body);
            console.error('Error fetching machines with features:', error);
            res.status(500).json({ error: 'Internal Server Error, incident logged.' });
        }
    };
};



export default (page) => {
    return [
        body('sort').optional({ checkFalsy: true }).trim().isString().withMessage('sort must be numeric'), 
        body('feature').optional({ checkFalsy: true }).trim().isString().withMessage('feature must be string'),
        body('energyClass').optional({ checkFalsy: true }).trim().isString().isLength({ min: 1, max: 3 }).withMessage('energyClass must be a string with length between 1 and 3 characters'),
        body('capacity').optional({ checkFalsy: true }).trim().isFloat().withMessage('capacity must be a float'),
        body('page').optional({ checkFalsy: true }).trim().isNumeric().withMessage('page must be a number'),
        body('limit').optional({ checkFalsy: true }).trim().isNumeric().withMessage('page must be a number'),
        errorBodyHandler,
        list()
    ];
};