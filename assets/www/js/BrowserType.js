function BrowserType() {
    var userAgent = navigator.userAgent.toLowerCase();

    var agentContains = function() {
        var result = true;
        for (var i = 0; i < arguments.length; i++)
        {
            var subString = arguments[i].toLowerCase();
            result = result && userAgent.indexOf(subString) >= 0
        }
        return result;
    };

    this.isMobile = function () {
        return agentContains('iphone') || agentContains('ipod') || agentContains('android', 'mobile')|| this.isMobileOpera();
    };

    this.isMobileOpera = function () {
        return agentContains('opera', 'mini')|| agentContains('opera', 'mobi');
    };

    this.isOperaMini = function () {
        return agentContains('opera', 'mini');
    };

    this.isMobileFirefox = function () {
        return agentContains('mobile', 'firefox');
    };

    this.isTablet = function () {
        return agentContains('ipad') || agentContains('android') && !this.isMobile();
    };

    this.isChrome = function () {
        return agentContains('chrome') && !agentContains('opr') && !this.isMobile() && !this.isTablet();
    };

    this.isOldIE = function () {
        return agentContains('msie 7.') || agentContains('msie 8.') ;
    };

    this.isIE = function() {
        return agentContains('msie') || agentContains('trident');
    };

    this.isIE9 = function() {
        return agentContains('msie 9.0');
    };

    this.supportsParallax = function () {
        return !this.isMobile() && !this.isTablet() && !this.isOldIE();
    };
}

var browserType =new BrowserType();