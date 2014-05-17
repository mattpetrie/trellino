Trellino.Views.BoardsIndexShow = Backbone.View.extend({
  className: "col-md-3",

  template: JST['boards/index_show'],

  render: function(){
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  }
});