/**
 * @license Angulartics v0.17.2
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * Snowplow analytics update contributed by http://github.com/lhache
 * License: MIT
 */
(function(angular) {
'use strict';

/**
 * @ngdoc overview
 * @name angulartics.snowplow
 * Enables analytics support for Snowplow (http://snowplowanalytics.com/)
 */
angular.module('angulartics.snowplow', ['angulartics'])
.config(['$analyticsProvider', function ($analyticsProvider) {

  //$analyticsProvider.settings.trackRelativePath = true;

  $analyticsProvider.registerPageTrack(function (path, title, context) {
    window._snaq && _snaq.push('trackPageView', title, context);
  });

  /**
   * Track Event in Snowplow
   * @name eventTrack
   *
   * @param {string} eventType Required 
   * @param {object} data 
   */
  $analyticsProvider.registerEventTrack(function (eventType, data) {

    if (window._snaq) {

      // StructEvents: https://github.com/snowplow/snowplow/wiki/2-Specific-event-tracking-with-the-Javascript-tracker#custom-structured-events
      /**
       * Structured Events
       * Doc: https://github.com/snowplow/snowplow/wiki/2-Specific-event-tracking-with-the-Javascript-tracker#custom-structured-events
       * Format: _snaq.push('trackStructEvent', 'category','action','label','property','value');
       */
      if (eventType === 'trackStructEvent') {
        _snaq.push('trackStructEvent', data.category, data.action, data.label, data.property, data.value);
      }
      /**
       * Unstructured Events
       * Doc: https://github.com/snowplow/snowplow/wiki/2-Specific-event-tracking-with-the-Javascript-tracker#custom-unstructured-events
       * Format: _snaq.push('trackUnstructEvent', <<SELF-DESCRIBING EVENT JSON>>);
       */
      else if (eventType === 'trackUnstructEvent') {
        _snaq.push('trackUnstructEvent', data);
      }

  });


}]);
})(angular);
