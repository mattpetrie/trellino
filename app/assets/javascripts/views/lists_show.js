Trellino.Views.ListsShow = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model, "sync add", this.render);
    // var listNewView = new Trellino.Views.ListsNew({ model: this.model});
    // this.addSubview(".list-new", listNewView);
    this.model.cards().each(this.addCard.bind(this));
  },

  addCard: function(card){
    var cardsShowView = new Trellino.Views.CardsShow({
      model: card
    });
    this.addSubview(".cards", cardsShowView);
    cardsShowView.render();
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