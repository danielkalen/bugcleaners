!function(e){return e(".form_boxed").each(function(){var n;return n=e(this),n.hasClass("standard")?(new Form(n,{dontDisableFields:!0}),console.log("standard initted")):(new Form(n),console.log("stepped initted"))})}(jQuery);