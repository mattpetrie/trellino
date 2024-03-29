Trellino.Views.ListsShow = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCard)
    this.listenTo(this.model, "sync add", this.render);
    this.model.cards().each(this.addCard.bind(this));
    var cardNewView = new Trellino.Views.CardsNew({ model: this.model});
    this.addSubview(".cards-new", cardNewView);
  },

  addCard: function(card){
    var cardsShowView = new Trellino.Views.CardsShow({
      model: card
    });
    this.addSubview(".cards", cardsShowView);
    cardsShowView.render();
  },

  attributes: function () {
    return {
      "data-id": this.model.id
    }
  },

  className: 'list-wrapper col-md-3',

  destroy: function(event){
    event.preventDefault();
    this.model.destroy();
  },

  events: {
    "click .delete-list": "destroy"
  },

  removeCard: function(card){
    var cardsShowView =
      _(this.subviews()[".cards"]).find(function (subview) {
    return subview.model == card;
    });

    this.removeSubview(".card", cardsShowView);
  },

  render: function(){
    renderedContent = this.template({
      list: this.model
    });
    this.$el.html(renderedContent);
    this.renderSubviews();
    this.setSortable();
    return this;
  },

  setSortable: function(){
    var that = this;
    this.$el.find('.cards').sortable({
      axis: 'x,y',
      connectWith: '.cards',
      start: function(event, ui){
        $(ui.item).toggleClass('dragged');
      },
      stop: function(event, ui){
        $(ui.item).toggleClass('dragged');
      },
      update: function (event) {
        var ids = $(event.target).sortable('toArray', { attribute: "data-id" });
        that.updateCardRanks(ids);
      },
    })
  },

  tagName: 'li',

  template: JST["lists/show"],

  updateCardRanks: function(ids){
    var that = this;
    var rank = 1
    _.each(ids, function(id){
      var card = that.model.cards().get(id);
      if(!card){
        card = new Trellino.Models.Card({ id: id });
      }
      card.fetch();
      card.save({
        'rank': rank,
        'list_id': that.model.id,
      }, { patch: true });
      rank++;
    });
  },
});