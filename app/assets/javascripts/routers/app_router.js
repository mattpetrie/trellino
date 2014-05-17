Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "boardsIndex",
    "boards/new": "boardsNew",
    "boards/:id": "boardsShow"
  },

  boardsIndex: function(){
    Trellino.Collections.boards.fetch();
    var boardsIndexView = new Trellino.Views.BoardsIndex({
      collection: Trellino.Collections.boards
    });
    this._swapView(boardsIndexView);
  },

  boardsNew: function(){
    Trellino.Collections.boards.fetch();
    var boardsNewView = new Trellino.Views.BoardsNew();
    this._swapView(boardsNewView);
  },

  boardsShow: function(id){
    Trellino.Collections.boards.fetch();
    var board = Trellino.Collections.boards.getOrFetchById(id);
    var boardsShowView = new Trellino.Views.BoardsShow({
      model: board
    });
    this._swapView(boardsShowView);
  },

  _swapView: function(newView){
    if(this.currentView){
      this.currentView.remove();
    }
    $('#content').html(newView.render().$el);
    this.currentView = newView;
  },
});