Trellino.Views.CardsNew = Backbone.View.extend({ 
  events: {
    "submit #add-card-form": "addCard"
  },

  template: JST['cards/new'],

  render: function(){
    var content = this.template({ list: this.model });
    this.$el.html(content);
    return this;
  },

  addCard: function(event){
    event.preventDefault();
    var list = this.model;
    var formData = $(event.currentTarget).serializeJSON()["card"];
    var newCard = new Trellino.Models.Card(formData);
    newCard.list = list;
    newCard.save({}, {
      success: function(){
        list.cards().add(newCard);
        $(event.target).find('#card-title').val('');
      }
    });
  },
});