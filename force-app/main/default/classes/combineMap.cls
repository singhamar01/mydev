public class combineMap {

    @AuraEnabled
    public static AuraWrapper getRuleCodeMap(){
        Map<String,Set<String>> returnMap = new Map<String,Set<String>>();

        AuraWrapper returnWrapper = new AuraWrapper();
        returnWrapper.ruleCodeMapInfo = returnMap;

        return returnWrapper;
    }

    public class AuraWrapper{
        @AuraEnabled
        public Map<String,Set<String>> ruleCodeMapInfo  {get;set;}
    }
}