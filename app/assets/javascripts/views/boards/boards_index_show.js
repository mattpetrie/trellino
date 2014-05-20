Trellino.Views.BoardsIndexShow = Backbone.CompositeView.extend({
  className: "col-md-3",

  render: function(){
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  },

  template: JST['boards/index_show'],
});