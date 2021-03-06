function MainCtrl($rootScope) {
    var getCurrentLang, getQueryParam;

    getQueryParam = function(name) {
      var currentQueryParams;
      currentQueryParams = new URI().query(true);
      return currentQueryParams[name];
    };

    window.getQueryParam = getQueryParam;

    getCurrentLang = function() {
      var lang;
      lang = getQueryParam("lang");
      if (lang) {
        return lang.replace("-", "_");
      } else {
        var lang_browser = getCurrentLangByBrowserSettings();
        switch(lang_browser){
            case 'zh':
            case 'zh_TW':
                return 'zh_TW';
                break;
            default:
                return 'en';
        }
      }
    };

    getCurrentLangByBrowserSettings = function(){
        var lang = window.navigator.userLanguage || window.navigator.language;
        return lang;
    }

    window.getCurrentLang = getCurrentLang;


    getCurrentYear = function(){
        return new Date().getFullYear();
    }

    $rootScope.lang = getCurrentLang();

    $rootScope.current_year = getCurrentYear();

    $rootScope._ = function(key){
        var lang = getCurrentLang();

        if (LANGPACK && LANGPACK[lang] && LANGPACK[lang][key]){
            return LANGPACK[lang][key];
        }else{
            return key;
        }
    };
}
