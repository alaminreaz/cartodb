var cdb = require('cartodb.js');
var TemplatedWorkflowsFormView = require('./templated_workflows_form_view');


/**
 *
 *
 *
 *
 *
 */

module.exports = cdb.core.View.extend({

  className: '',

  initialize: function() {
    this._initBinds();
  },

  render: function() {
    this.clearSubViews();
    this._initViews();
    return this;
  },

  _initBinds: function() {
    this.model.bind('change:stepNumber', this.render, this);
  },

  _initViews: function() {
    var step = this.model.get('stepNumber');

    // No step, no form
    if (step === null) {
      return false;
    }

    var step = this.model.getStep(step);
    var formModel = this.model.getStepModel();

    var form = new TemplatedWorkflowsFormView({
      form_data: step.forms,
      model: formModel
    });
    
    this.$el.append(form.render().el);
    this.addView(form);
  }

});