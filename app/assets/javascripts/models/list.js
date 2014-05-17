Trellino.Models.List = Backbone.Model.extend({
  urlRoot: "/api/lists",

  url: function(){
    return this.board.url() + "/lists"
  },

  cards: function(){
    this._cards = this._cards ||
      new Trellino.Collections.ListCards([], { list: this });
      return this._cards
  },

  parse: function(resp){
    if (resp.cards){
      this.cards().set(resp.cards, { parse: true });
      delete resp.cards;
    }

    return resp;
  },
});