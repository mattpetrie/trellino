Trellino.Views.CardsShow = Backbone.View.extend({
  tagName: "li",

  events: {
    "mouseenter .delete-button-wrapper": "showButton",
    "mouseleave .delete-button-wrapper": "hideButton",
    "click .card-delete-button": "destroy",
  },

  className: "card",

  destroy: function(event){
    event.preventDefault();
    this.model.destroy();
  },

  template: JST["cards/show"],

  render: function(){
    var renderedContent = this.template({
      card: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  showButton: function(event){
    $(event.target).find('button').toggleClass('hidden');
  },

  hideButton: function(event){
    $(event.target).toggleClass('hidden');
  }
});