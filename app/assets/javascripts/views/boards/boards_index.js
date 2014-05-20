Trellino.Views.BoardsIndex = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.collection, "add", this.addBoard);
    this.listenTo(this.collection, "sync add remove", this.render);
    var boardNewView = new Trellino.Views.BoardsNew();
    this.addSubview(".board-new", boardNewView);
    this.collection.each(this.addBoard.bind(this));
  },

  template: JST['boards/index'],

  addBoard: function (board) {
    var boardsIndexShowView = new Trellino.Views.BoardsIndexShow({
      model: board
    });
    
    this.addSubview(".boards", boardsIndexShowView);
    boardsIndexShowView.render();
  },

  render: function(){
    var index = this;
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  },
})