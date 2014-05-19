Trellino.Models.List = Backbone.Model.extend({

  urlRoot: function(){
    var boardId = this.get("board_id");
    var board = Trellino.Collections.boards.get(boardId);
    return board.url() + "/lists"
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