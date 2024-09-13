import 'dotenv/config';
import { List } from './src/models/List.js';
console.log('mickey');
List.findAll().then(response => console.log(response));
