/*
 * MODEL
 */

var Thumb = Backbone.Model.extend({
    defaults: {
        uri:'',
        state: ''
    },
    select: function(state){
        this.set({'state': state ? 'selected' : ''});
    }
});

var Thumbs = Backbone.Collection.extend({
    model: Thumb,
    fetch: function(){
        return _.map(urls, function(url){ return new Thumb ({uri: url})});
    },
    select: function(model){
        if (this.selectedThumb()) {
            this.selectedThumb().select(false);
        }
        this.selected = model;
        this.selected.select(true);
        this.trigger('thumbs:selected');
    },
    selectedThumb: function(){
        return this.selected;
    }
});

// VIEW

var thumbs = new Thumbs;
var FrontView = Backbone.View.extend({
    template: _.template('<img src="<%=uri %>" />'),
    
    el: $('#front'),
    
    initialize: function(){
        this.model.bind('thumbs: selected', this.render, this);
    },
    
    render: function (){
        this.el.html(this.template(this.model.selectedThumb().toJsSON()));
    }
});

var frontView = new FrontView({model: thumbs});

var ThumbView = Backbone.View.extend({
    tagName: 'li',
    template: _template('<img src="<%=uri %>" class="<%= state %>" />'),
    events: {
        "click" : "selectThumb"
    },
    initialize: function(){
        this.model.bind('change', this.render, this);
    },
    render: function(){
        console.log('rendering');
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    selectThumb: function(){
        thumbs.select(this.model);
    }
});

var AppView = Backbone.View.extend({
    el: $("#container"),
    render: function(){
        _.each(new Thumbs().fetch(),
               function t){
                $('div ul').append(new ThumbView({model: t}).render().el)
               });
    }
});

window.App = new AppView
window.App.render()