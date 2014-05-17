Trellino.Views.BoardsIndex = Backbone.View.extend({
  initialize: function(){
    listenTo(this.collection, "sync add remove", this.render);
  },

  initialize: function(){
    this.listenTo(this.collection, "sync", this.render)
  },

  template: JST['boards/index'],

  render: function(){
    var index = this;
    this.$el.html("");
    this.collection.each(function(board){
      var boardView = new Trellino.Views.BoardsIndexShow({ model: board });
      index.$el.append(boardView.render().$el)
    });
    this.$el.prepend(new Trellino.Views.BoardsNew().render().$el);
    return this;
  },
})