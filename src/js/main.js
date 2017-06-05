// Importing vendor packages
import './jquery-global.js';
import 'bootstrap';
import 'es6-shim';
import _ from 'lodash';

import TodoListController from './controllers/TodoListController';

// Initialize Page controller
TodoListController.initialize(
    {
        id: 'list',
        storage: 'localStorage',
        engine: 'jQuery'
    }
);