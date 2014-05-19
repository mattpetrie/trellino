Trellino.Views.CardsShow = Backbone.View.extend({
  tagName: "li",

  events: {
    "mouseenter .delete-button-wrapper": "showButton",
    "mouseleave .delete-button-wrapper": "showButton"
  },

  className: "card",

  template: JST["cards/show"],

  render: function(){
    var renderedContent = this.template({
      card: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  showButton: function(event){
    $(event.target).find('button').toggle();
  }
});