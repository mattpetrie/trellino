Trellino.Models.Card = Backbone.Model.extend({

  urlRoot: function(){
    return this.list.url() + "/cards"
  },
});