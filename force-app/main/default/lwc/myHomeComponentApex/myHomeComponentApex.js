import { LightningElement, wire } from 'lwc';
import getPersons from '@salesforce/apex/PersonController.getPersons';

export default class MyHomeComponent extends LightningElement {
    persons = [];
    error;
    
    @wire(getPersons)
    wiredPersons({ error, data }) {
        if (data) {
            this.persons = data;
            this.error = undefined;
            console.log('Fetched persons:', data);
        } else if (error) {
            this.error = error;
            this.persons = [];
            console.error('Error fetching persons:', error);
        }
    }
    

    connectedCallback() {
        // This method is called when the component is inserted into the DOM
        console.log('MyHomeComponent has been inserted into the DOM');
        
    }
}