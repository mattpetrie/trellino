Trellino.Views.ListsShow = Backbone.CompositeView.extend({
  className: "col-md-3",

  template: JST["lists/show"],

  render: function(){
    renderedContent = this.template({
      list: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },
});