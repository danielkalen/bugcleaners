var appendPopup=function(p){var o='<div class="popup-overlay"></div>';$$("body").prepend(o),$$(".popup-overlay").on("click",function(){jQuery(this).removeClass("show"),jQuery(".popup.show").removeClass("show"),$$("body").removeClass("opened-popup"),popupOpen=!1})};appendPopup();var popupOpen=!1,Popup=function(p,o){var e=this,s=-1!==o.indexOf("exit-intent");$$(".popup-overlay").after('<div class="popup" id="'+o+'"><div class="popup-close"></div><div class="popup-content"></div></div>'),this.Popup=jQuery("#"+o),this.Close=function(){this.Popup.removeClass("show"),$$(".popup-overlay").removeClass("show"),$$("body").removeClass("opened-popup"),popupOpen=!1,this.Popup.trigger("closed")},this.Open=function(){(!popupOpen||s)&&($$(".popup-overlay").addClass("show"),s&&jQuery(".popup").removeClass("show"),this.Popup.find(".results").hasClass("show")?this.Popup.addClass("show"):this.Popup.addClass("show").find(".step").first().addClass("show"),$$("body").addClass("opened-popup")),popupOpen&&!s&&log("Another popup is open."),"undefined"!=typeof disableExitIntents&&disableExitIntents(),popupOpen=!0,this.Popup.trigger("opened")},this.Reset=function(){var p=this.Popup.find(".fieldset");this.Popup.find(".step.show, .results.show").removeClass("show"),p.removeClass("filled valid error blur focus").find(".input").not('input[type="checkbox"]').not('input[type="radio"]').val(""),p.find(".input-button").removeClass("checked").find("input").prop("checked",!1),this.Popup.trigger("reset")},this.Destroy=function(){this.Popup.remove()},1===p.length?p.appendTo(this.Popup.find(".popup-content")):p.first().appendTo(this.Popup.find(".popup-content")),this.Popup.children(".popup-close").on("click",function(){e.Close()})};