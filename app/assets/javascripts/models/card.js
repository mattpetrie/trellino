Trellino.Models.Card = Backbone.Model.extend({

  urlRoot: "api/cards",

  url: function(){
    if (this.isNew()){
      return "api/lists/" + this.get("list_id") + "/cards"
    } else{
      return this.urlRoot + "/" + this.id;
    }
  },
});