Trellino.Views.BoardsShow = Backbone.View.extend({

  initialize: function(){
    this.listenTo(this.model, "sync add", this.render);
    this.listenTo(this.model.lists(), "add", this.render);   
  },

  events: {
    "click #delete-board-button": "destroyBoard",
  },

  template: JST["boards/show"],

  render: function(){
    var content = this.template({ board: this.model });
    this.$el.html(content);
    if (this.model.lists()) {
      this.model.lists().each(function(list){
        this.$('ul.lists').append("<li>" + list.get("title") + "</li>");
      }, this);
    }
    var addNew = new Trellino.Views.ListsNew({ model: this.model });
    this.$el.append(addNew.render().$el);
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