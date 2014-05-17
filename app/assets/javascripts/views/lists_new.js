Trellino.Views.ListsNew = Backbone.View.extend({

  events: {
    "submit #add-list-form": "addList"
  },

  template: JST['lists/new'],

  render: function(){
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  },

  addList: function(event){
    event.preventDefault();
    var board = this.model;
    var formData = $(event.currentTarget).serializeJSON()["list"];
    var newList = new Trellino.Models.List(formData);
    newList.board = board;
    newList.save({}, {
      success: function(){
        board.lists().add(newList);
      }
    });
  },
});