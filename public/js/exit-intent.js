function disableExitIntents(){ExitIntent.disabled=!0}!function(t){this.ExitIntent=function(e,i){var o=this,a=document.all&&!window.atob,n=window.navigator.msPointerEnabled,s=$$("html").hasClass("mobile"),r="subscribe_email"===e.find("form").data("action"),l=!r;if(r)var d=function(){localStorage.setItem("subscribed","true")};if(l)var d=function(){localStorage.setItem("submitted","true")};this.form=new Form(e,{callbackOnResults:d}),this.popup=new Popup(e,i),this.name=i,this.disabled=!1;var u=$$(".article-meta-category").data("category");this.form.form.find('input[name="source"]').val(window.location.href),this.form.form.find('input[name="subscriptionType"]').val("hide"===u?"all":u),this.openPopup=function(){if(r){var t="true"===localStorage.getItem("subscribed");t||o.popup.Open();var e=localStorage.getItem("subscribe_exit_intent_opened"),e=e?e:"0",e=parseFloat(e);localStorage.setItem("subscribe_exit_intent_opened",e+1),e>1&&localStorage.setItem("subscribed","true")}if(l){var i="true"===localStorage.getItem("submitted");i||o.popup.Open();var e=localStorage.getItem("regular_exit_intent_opened"),e=e?e:"0",e=parseFloat(e);localStorage.setItem("regular_exit_intent_opened",e+1),e>1&&localStorage.setItem("submitted","true")}},s||t(window).on("mouseleave",function(t){!o.disabled&&!popupOpen&&t.pageY-window.pageYOffset<=1&&(o.disabled=!0,o.openPopup())}),e.hasClass("exit-subscribe")||e.hasClass("exit-pdf")||a||n||s||o.disabled||(window.history.replaceState({id:"gv_exit-init"},"",""),window.history.pushState({id:"gv_exit-control"},"",""),t(window).on("popstate",function(t){!o.disabled&&"state"in window.history&&null!==window.history.state&&"gv_exit-control"!==window.history.state.id&&(o.disabled=!0,o.openPopup())})),e.find(".no").on("click",function(){o.popup.Close(),localStorage.setItem("submitted","true")})}}(jQuery);