public with sharing class PersonController {
    @AuraEnabled(cacheable=true)
    public static List<Person__c> getPersons() {
        return [SELECT Id, Name, Gender__c,	Date_of_Birth__c, Marital_Status__c FROM Person__c ORDER BY Order__c];
    }
}