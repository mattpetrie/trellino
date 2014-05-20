Trellino.Collections.Boards = Backbone.Collection.extend({
  getOrFetchById: function(id){
    var boards = this;
    var model = this.get('id');

    if (model) {
      model.fetch();
    } else {
      model = new Trellino.Models.Board({id: id});
      model.fetch({
        success: function(){
          boards.add(model);
        }
      });
    }
    return model;
  },

  model: Trellino.Models.Board,

  url: "/api/boards",
});

Trellino.Collections.boards = new Trellino.Collections.Boards();