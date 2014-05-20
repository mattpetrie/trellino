Trellino.Models.Board = Backbone.Model.extend({
  lists: function(){
    this._lists = this._lists ||
      new Trellino.Collections.BoardLists([], { board: this });
      return this._lists
  },

  parse: function(resp){
    if (resp.lists){
      this.lists().set(resp.lists, { parse: true });
      delete resp.lists;
    }

    return resp;
  },
    
  urlRoot: "/api/boards",
});