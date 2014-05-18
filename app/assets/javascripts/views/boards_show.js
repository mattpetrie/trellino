Trellino.Views.BoardsShow = Backbone.CompositeView.extend({

  initialize: function(){
    this.listenTo(this.model.lists(), "add", this.addList);
    this.listenTo(this.model, "sync add", this.render);
    var listNewView = new Trellino.Views.ListsNew({ model: this.model});
    this.addSubview(".list-new", listNewView);
    this.model.lists().each(this.addList.bind(this));
  },

  events: {
    "click #delete-board-button": "destroyBoard",
  },

  template: JST["boards/show"],

  addList: function (list) {
    var listsShowView = new Trellino.Views.ListsShow({
      model: list
    });
    
    this.addSubview(".lists", listsShowView);
    listsShowView.render();
  },

  render: function(){
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  },

  destroyBoard: function(event){
    event.preventDefault();
    this.model.destroy({
      success: function(){
        Backbone.history.navigate("#", { trigger: true });
      },
    });
  },
});