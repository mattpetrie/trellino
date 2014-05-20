Trellino.Views.CardsShow = Backbone.View.extend({
  attributes: function(){
    return {
      "data-id": this.model.id
    }
  },

  className: "card",

  destroy: function(event){
    event.preventDefault();
    this.model.destroy();
  },

  events: {
    "click .card-delete-button": "destroy",
  },

  render: function(){
    var renderedContent = this.template({
      card: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  tagName: "li",

  template: JST["cards/show"],
});