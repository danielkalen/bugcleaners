var ExitIntent = function($form, name){
	this.form = new Form( $form );
	this.popup = new Popup( $form, name );
    this.name = name;
	this.disabled = false;

    var category = $$('.article-meta-category').data('category');
    this.form.form.find('input[name="source"]').val(window.location.href);
    this.form.form.find('input[name="subscriptionType"]').val( (category === 'hide' ? 'all':category) );

	var $this = this,
		isIE = document.all && !window.atob,
		isIE11 = window.navigator.msPointerEnabled,
		isMobile = $$('html').hasClass('mobile');

        if ( !isMobile ) {
            $(window).on('mouseleave', function(e) {
                
                if (!$this.disabled && !popupOpen && e.pageY - window.pageYOffset <= 1) {    
                    $this.disabled = true;

                      $this.popup.Open();
                      // $.cookie('exit-bu', 'off', {path:'/'});
                }
            });
        }   


        if ( !$form.hasClass('exit-subscribe') && !$form.hasClass('exit-pdf') ) {
            if ( !isIE && !isIE11 && !isMobile && !$this.disabled ) {
                window.history.replaceState({id: 'gv_exit-init'}, '', '');
                window.history.pushState({id: 'gv_exit-control'}, '', '');
                   
                $(window).on('popstate', function(e) {
                    if (!$this.disabled && 'state' in window.history && window.history.state !== null && window.history.state.id !== 'gv_exit-control') {    
                        $this.disabled = true;

    					$this.popup.Open();          
    					// $.cookie('exit-bu', 'off', {path:'/'});
                    }
                });
            }
        }

        $form.find('.no').on('click', function(){
        	$this.popup.Close();
        });
};


function disableExitIntents(){
    ExitIntent.disabled = true;;
}