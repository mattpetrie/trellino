Trellino.Views.BoardsShow = Backbone.CompositeView.extend({

  initialize: function(){
    this.listenTo(this.model.lists(), "add", this.addList);
    this.listenTo(this.model.lists(), "remove", this.removeList);
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

  removeList: function(list){
    var listsShowView =
      _(this.subviews()[".lists"]).find(function (subview) {
    return subview.model == list;
    });

    this.removeSubview(".lists", listsShowView);
  },

  render: function(){
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    this.renderSubviews();
    this.setSortable();
    return this;
  },

  setSortable: function(){
    var that = this;
    this.$el.find('.lists').sortable({
      axis: 'x,y',
      placeholder: 'ui-sortable-placeholder',
      forcePlaceholderSize: true,
      start: function(event, ui){
        $(ui.item).toggleClass('dragged');
      },
      stop: function(event, ui){
        $(ui.item).toggleClass('dragged');
      },
      update: function (event) {
        var ids = $(event.target).sortable('toArray', { attribute: "data-id" });
        that.updateListRanks(ids);
      },
    })
  },

  destroyBoard: function(event){
    event.preventDefault();
    this.model.destroy({
      success: function(){
        Backbone.history.navigate("#", { trigger: true });
      },
    });
  },

  updateListRanks: function(ids){
    var that = this;
    var rank = 1;
    _.each(ids, function(id){
      var list = that.model.lists().get(id);
      list.save({
        'rank': rank, 
      }, { patch: true })
      rank++;
    })
  },
});