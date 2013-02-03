// My Form View
var MyForm = Backbone.View.extend({
  tagName: "fieldset"
  , initialize: function(){
    this.collection.on('add', this.render, this);
    this.collection.on('remove', this.render, this);
    this.collection.on('change', this.render, this);
    pubsub.on("tempMove", this.handleTempMove, this);
    pubsub.on("tempDrop", this.handleTempDrop, this);
    this.render();
  }
  , render: function(){
    //Render Snippet Views
    this.$el.empty();
    var that = this;
    _.each(this.collection.renderAll(), function(snippet){
      that.$el.append(snippet);
    });
    this.$el.appendTo("#build form");
    this.delegateEvents();
  }
  , getBottomAbove: function(eventY, height){
      var myFormBits = $(this.$el.find(".control-group"));
      var topelement = _.find(myFormBits, function(renderedSnippet) {
        if (($(renderedSnippet).position().top + $(renderedSnippet).height()) > eventY - height - 20) {
          return true;
        }
        else {
          return false;
      }
    });
    if (topelement){
    return topelement;
    } else {                                  
      return myFormBits[0];
    }
  }
  , handleTempMove: function(mouseEvent, height){
    $(".target").removeClass("target");
    if(mouseEvent.pageX >= $build.position().left && 
       mouseEvent.pageX < ($build.width() + $build.position().left) &&
       mouseEvent.pageY >= $build.position().top && 
       mouseEvent.pageY < ($build.height() + $build.position().top)){
      $(this.getBottomAbove(mouseEvent.pageY, height)).addClass("target");
    }
  }
  , handleTempDrop: function(mouseEvent, model){
    $(".target").removeClass("target");
    this.collection.add(model)
    console.log("Drop:" +mouseEvent.pageX + " - " + mouseEvent.pageY);
  }
})
