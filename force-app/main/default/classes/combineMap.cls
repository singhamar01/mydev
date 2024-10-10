public class combineMap {

    @AuraEnabled
    public static AuraWrapper getRuleCodeMap(){
        Map<String,Set<String>> returnMap = new Map<String,Set<String>>();

        AuraWrapper returnWrapper = new AuraWrapper();
        returnWrapper.ruleCodeMapInfo = evaluateRuleCode();

        return returnWrapper;
    }

    public class AuraWrapper{
        @AuraEnabled
        public Map<String,Set<String>> ruleCodeMapInfo  {get;set;}
    }

    private static Map<String,Set<String>> evaluateRuleCode(){
        Map<String,Set<String>> returnMap = new Map<String,Set<String>>();

        returnMap.put('SFDC-CASE-001',new Set<String>{'POL-0001','POL-0002'});

        return returnMap;
    }
}