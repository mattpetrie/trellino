Trellino.Views.BoardsNew = Backbone.View.extend({
  className: "row",

  events: {
    "submit #add-board-form": "addBoard"
  },

  template: JST['boards/new'],

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  addBoard: function(event){
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var newBoard = new Trellino.Models.Board(formData);
    newBoard.save({}, {
      success: function(){
        Trellino.Collections.boards.add(newBoard);
        Backbone.history.navigate("/boards/" + newBoard.id, {trigger: true});
      }
    });
  },
});