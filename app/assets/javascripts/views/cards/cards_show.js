Trellino.Views.CardsShow = Backbone.View.extend({
  tagName: "li",

  events: {
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
    this.$el.attr("data-id", this.model.get('id'));
    return this;
  },
});