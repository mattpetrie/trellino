Trellino.Views.ListsShow = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCard)
    this.listenTo(this.model, "sync add", this.render);
    this.model.cards().each(this.addCard.bind(this));
    var cardNewView = new Trellino.Views.CardsNew({ model: this.model});
    this.addSubview(".cards-new", cardNewView);
  },

  events: {
    "click .delete-list": "destroy"
  },

  destroy: function(event){
    event.preventDefault();
    this.model.destroy();
  },

  addCard: function(card){
    var cardsShowView = new Trellino.Views.CardsShow({
      model: card
    });
    this.addSubview(".cards", cardsShowView);
    cardsShowView.render();
  },

  removeCard: function(card){
    var cardsShowView =
      _(this.subviews()[".cards"]).find(function (subview) {
    return subview.model == card;
    });

    this.removeSubview(".card", cardsShowView);
  },


  className: "col-md-3",

  template: JST["lists/show"],

  render: function(){
    renderedContent = this.template({
      list: this.model
    });
    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  },
});