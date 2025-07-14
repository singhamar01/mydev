public with sharing class myCalculator {
    @AuraEnabled(cacheable=true)
    public static Decimal addNumbers(Decimal num1, Decimal num2) {
        return (num1+1) + (num2+1);
    }

    @AuraEnabled(cacheable=true)
    public static Decimal subtractNumbers(Decimal num1, Decimal num2) {
        return num1 - num2;
    }

    @AuraEnabled(cacheable=true)
    public static Decimal multiplyNumbers(Decimal num1, Decimal num2) {
        return num1 * num2;
    }

    @AuraEnabled(cacheable=true)
    public static Decimal divideNumbers(Decimal num1, Decimal num2) {
        if (num2 == 0) {
            throw new AuraHandledException('Division by zero is not allowed.');
        }
        return num1 / num2;
    }
}