Trellino.Models.Card = Backbone.Model.extend({
  rootUrl: "api/cards",

  url: function(){
    return this.list.url() + "/cards"
  },
});