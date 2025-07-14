import { LightningElement, track } from 'lwc';
//add import from apex class for addNumbers
import addNumbers from '@salesforce/apex/myCalculator.addNumbers'; // Uncomment if using Apex

export default class Calculator extends LightningElement {
    @track currentInput = '0';
    @track previousInput = null;
    @track operator = null;
    @track result = null;
    @track history = []; // To store calculation history

    handleNumberClick(event) {
        const number = event.target.dataset.value;
        if (this.currentInput === '0' || this.result !== null) {
            this.currentInput = number;
            this.result = null; // Clear result when new number is typed
        } else {
            this.currentInput += number;
        }
    }

    handleDecimalClick() {
        if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
    }

    handleOperatorClick(event) {
        const op = event.target.dataset.value;

        if (this.previousInput === null) {
            this.previousInput = parseFloat(this.currentInput);
            this.operator = op;
            this.currentInput = '0'; // Reset current input for next number
        } else if (this.currentInput !== '0' && this.operator) {
            this.calculate();
            this.previousInput = this.result;
            this.operator = op;
            this.currentInput = '0';
        } else {
            this.operator = op; // Change operator if already set
        }
    }

    calculate() {
        let num1 = parseFloat(this.previousInput);
        let num2 = parseFloat(this.currentInput);
        let currentResult;
        let expression = `${num1} ${this.operator} ${num2}`;

        switch (this.operator) {
            case '+':
                //currentResult = num1 + num2;
                currentResult = addNumbers({ num1: num1, num2: num2 }) // Uncomment if using Apex
                currentResult = Number(currentResult); // Ensure result is a number
                console.log('Result from Server Apex:', JSON.stringify(currentResult)); // Debugging line
                break;
            case '-':
                currentResult = num1 - num2;
                break;
            case '*':
                currentResult = num1 * num2;
                break;
            case '/':
                if (num2 !== 0) {
                    currentResult = num1 / num2;
                } else {
                    currentResult = 'Error: Division by zero';
                }
                break;
            default:
                currentResult = parseFloat(this.currentInput);
        }

        this.result = currentResult;
        this.currentInput = String(currentResult); // Display result
        this.previousInput = null; // Reset previous for next calculation
        this.operator = null; // Reset operator

        if (currentResult !== 'Error: Division by zero') {
            this.history.push({ expression: expression, result: currentResult });
        }
    }

    handleEqualsClick() {
        if (this.previousInput !== null && this.operator !== null) {
            this.calculate();
        }
    }

    handleClearClick() {
        this.currentInput = '0';
        this.previousInput = null;
        this.operator = null;
        this.result = null;
    }

    handleClearHistoryClick() {
        this.history = [];
    }
}