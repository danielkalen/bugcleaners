(function($){
	// ==== Define global object that tracks form objects =================================================================================
	if (window.forms === undefined) {
		window.forms = {};
	}
	var $currentStep,
		$previousStep,
		$lastField;

	this.Form = function($form, options){ // Attached to 'this', which is the global window object.
		this.action = $form.data('action');
		if ( this.action ) { // Checks if the element has a data-action attr, which indicated it is form elemnt. 
			this.form = $form;
		} else {
			this.form = $form.find('form').first();
			this.action = this.form.data('action');
		}
		var $this = this;
			this.multiStep = this.form.find('.step').length > 1;
		
		// ==== Set options =================================================================================
		var	defaultOptions = {
								'heightTransitions': false,
								'validateOnTyping': false,
								'callbackOnPrepare': function(){},
								'callbackOnResults': function(){},
								'callbackOnValidate': function(){},
								'callbackOnNextStep': function(){},
								'callbackOnBackStep': function(){},
								'callbackOnEventAttachment': function(){},
							 };
			this.options = $.extend(defaultOptions, options);


		// ==== Init Form =================================================================================
		this.Prepare();

		
		// ==== Button event attachments =================================================================================
		this.form.find('.next').on('click', function($form){    		$this.Next();    	});
		this.form.find('.back').on('click', function($form){    		$this.Back();    	});
		this.form.find('.submit').on('click', function($form){    		$this.Submit();    	});
		this.form.find('.next, .submit').on('focusin', function(){
			var $button = $(this);
			$$(window).on('keypress.button_focused', function(e){
				var keyPressed = util.getKeycode(e),
					explicitKey = util.getKeycode(e, true);

				var isTabKey 	= 	(!explicitKey ? keyPressed === 9 : keyPressed === 'Tab'),
					isEnterKey 	= 	(!explicitKey ? keyPressed === 13 : keyPressed === 'Enter'),
					isSpaceKey 	= 	(!explicitKey ? keyPressed === 32 : keyPressed === ' ' || keyPressed === 'Spacebar');

				if (isTabKey) $button.trigger('focusout');
				if (isEnterKey || isSpaceKey) {
					$button.trigger('focusout').trigger('click');
				}
			});
		});
		this.form.find('.next, .submit').on('focusout', function(){
			$$(window).off('keypress.button_focused');
		});



		this.form.find('input[name="referrer"]').val(document.referrer);
		this.form.find('input[name="url"]').val(document.URL);
		
		if ( this.options.heightTransitions && this.multiStep ) {
			$window.on('resize', function(){
				if ( window.innerWidth <= 920 ) {
					FormUtils.saveSectionHeights( $form.find('.step') );
				}
			});
		}
	};












	/* ==========================================================================
	   Initial Preparation
	   ========================================================================== */
	
	Form.prototype.Prepare = function() {	
		var $thisForm = this.form,
			$this = this,
			thisObject = this;

		if ( this.options.heightTransitions && this.multiStep ) {
			FormUtils.saveSectionHeights( $thisForm.find('.step') );
			
			// Initial height set
			$thisForm.find('.step').first().addClass('show').each(function(){
				var $this = $(this);
				$this.height( $this.data('height') );

				$this.siblings().height(39);
			});
		}

		$thisForm.on('submit', function(e){
			e.preventDefault();
		});

		$thisForm.on('submit_form', function(){
			var $activeStep = $thisForm.find('.step.show'),
				$activeStep = ($activeStep.length ? $activeStep : $thisForm),
				$button = $activeStep.find('.next'),
				$button = ($button.length ? $button : $activeStep.find('.submit'));
			$button.trigger('click');
		});

		if (this.options.validateOnTyping){
			$thisForm.on('field_filled', function(){
				var allFieldsAreValid = thisObject.Validate(false, false);

				if ( allFieldsAreValid ) {
					$thisForm.addClass('form_filled');
				} else {
					$thisForm.removeClass('form_filled');
				}
			});
		}

		$thisForm.find('.fieldset').not('.radio, .checkbox').each(function(){
			$this.Prepare.inputField($(this));
		});

		$thisForm.find('.fieldset.checkbox').each(function(){
			$this.Prepare.checkboxField($(this));
		});

		$thisForm.find('.fieldset.radio').each(function(){
			$this.Prepare.radioField($(this));
		});


		$thisForm.find('.phone, .zip, .cardnumber, .cardcvc, .carddate').each(function(){
			$this.Prepare.numberField($(this));
		});

		$thisForm.find('.email').each(function(){
			$this.Prepare.emailField($(this));
		});

		// Prevent tab switch to the next (invisible) field
		$thisForm.find('.step').each(function(){
			var $this = $(this),
				$lastField = $this.find('.fieldset').not('.checkbox').last(),
				$button = $this.find('.next').last(),
				$button = ($button.length ? $button : $this.find('.submit'));

			$lastField.on('keydown', function(e){
				if (!e.shiftKey){
					var isTabKey = e.keyCode === 9;
					if ( isTabKey ) {
						e.preventDefault(); 
						$lastField.find('input').blur();
						$button.trigger('focusin');
					}
				}
			});
		});

		$thisForm.find('.input').each(function(){
			$this.attachEvents( $(this) );
		});

		$thisForm.find('.conditional').each(function(){
			var $conditionalWrap = $(this),
				$conditionalDepInput = $conditionalWrap.children('.conditional-secondary').find('.input');

			$conditionalDepInput.prop('disabled', true);
			$conditionalWrap.find('.conditional-primary .input').on('change', function(){
				var $this = $(this);
				if ( $this.val() === 'other' ) {
					$conditionalWrap.addClass('show');
					$conditionalDepInput.prop('disabled', false);
				} else {
					$conditionalWrap.removeClass('show');
					$conditionalDepInput.prop('disabled', true);
				}
			});
		});

		if ( $thisForm.find('.state').length ) {
			FormUtils.appendStateList();
		}
		if ( $thisForm.find('.country').length ) {
			FormUtils.appendCountryList();
		}
	};






	/* ==========================================================================
	   Form Actions
	   ========================================================================== */
	Form.prototype.Next = function() {
		var $thisForm = this.form,
			$this = this;

		$currentStep = $thisForm.find('.step.show');
		$currentStep = ($currentStep.length ? $currentStep : $thisForm);

		var proceed = this.Validate();
		if ( proceed ) {
			FormUtils.revealSection( $currentStep.next(), this.options.heightTransitions );
		} else {
			$currentStep.find('.fieldset.input_text.error').first().find('input').trigger('focus');
		}
		this.options.callbackOnNextStep();
	};





	Form.prototype.Back = function() {
		var $thisForm = this.form,
			$this = this;

		$currentStep = $thisForm.find('.step.show');
		$currentStep = ($currentStep.length ? $currentStep : $thisForm);
		$previousStep = $currentStep.prev();

		FormUtils.revealSection( $previousStep, this.options.heightTransitions );
		this.options.callbackOnBackStep();
	};





	Form.prototype.Submit = function() {
		var $thisForm = this.form,
			$this = this;

		var proceed = this.Validate(true);
		if ( proceed ) {
			var $currentStep = $thisForm.find('.step.show'),
				$currentStep = ($currentStep.length ? $currentStep : $thisForm),
				$results = $thisForm.find('.results'),
				loading = '<div class="loading"><div class="loading-title">Processing your information...</div><div class="loading-gif"></div></div>',
				data = util.convertFormToObject($thisForm);
			

			data.action = $this.action;
			if (!data.url) data.url = window.location.href;
			if (!data.referrer) data.referrer = document.referrer;

			$thisForm.addClass('final');
			if ($results.length) $results.html( loading ).addClass('show');
			$currentStep.removeClass('show');

			$.post('/ajax', data, function(response){
				var type = response.success;
				if (type == true) type = 'success';
				if (type == false || !type) type = 'error';

				$this.options.callbackOnResults();
				$thisForm.trigger('submitted');
				if ($results.length) $results.html('<div class="results-message '+type+'">' + response.message + '</div>');
			}, 'json')
					.fail(function(){
						$this.options.callbackOnResults();
						if ($results.length) $results.html('<div class="results-message error">An unknown error has occured on the server, please contact customer support for help.</div>');
					});

		} else {
			var $currentStep = $thisForm.find('.step.show'),
				$currentStep = ($currentStep.length ? $currentStep : $thisForm);
			$currentStep.find('.fieldset.input_text.error').first().find('input').trigger('focus');
		}

	};












	// @codekit-append 'form-engine-fields.js'

	/* ==========================================================================
	   Validation
	   ========================================================================== */
	/**
	 * Validation Engine Main Function.
	 * 
	 * @param {bool} forSubmission Indicator that tells if a stricter validation method is to be used.
	 * @param {bool} showErrors    Indicates if fields should be marked/classed if they don't pass the validation.
	 */
	Form.prototype.Validate = function(forSubmission, showErrors) {
		showErrors = (showErrors === undefined ? true : false);

		var $thisForm = this.form,
			thisObject = this,
			$activeStep = $thisForm.find('.step.show'),
			$activeStep = ($activeStep.length ? $activeStep : $thisForm),
			$required = $activeStep.find('.fieldset.required'),
			proceed = false,
			problem = false;

		$required.each(function(){
			var $requiredFieldset = $(this),
				validateByClass = $requiredFieldset.hasClass('validate_by_class'),
				isValid;
			
			if (forSubmission && !validateByClass) { // Better but more expensive validation
				isValid = thisObject.Validate.Check($requiredFieldset, thisObject, true);

			} else { // Standard, 'easy' validation
				isValid = thisObject.Validate.Check($requiredFieldset, thisObject);
			}

			if ( isValid ) {
				if (showErrors) $requiredFieldset.removeClass('error');
			} else {
				problem = true;
				if (showErrors) $requiredFieldset.addClass('error');
			}
		});
		
		this.options.callbackOnValidate();

		if ( problem ) {
			$activeStep.trigger('notvalid');
			return false;
		} else {
			$activeStep.trigger('valid');
			return true;
		}
	};



	/**
	 * Validation Check Helper - routes fields to their proper validation function and returns a boolean on success/failure.
	 * 
	 * @param {object} $fieldset     The jQuery fieldset object to test against.
	 * @param {object} thisObject    The main form's object.
	 * @param {bool} forSubmission 	 Indicator that tells if a stricter validation method is to be used.
	 */
	Form.prototype.Validate.Check = function($fieldset, thisObject, forSubmission) {
		var isValid;
		if (forSubmission) { // Better but more expensive validation (usually used for submit step).
			var isSelect = $fieldset.hasClass('select'),
				isCheckbox = $fieldset.hasClass('checkbox'),
				isRadio = $fieldset.hasClass('radio'),
				isPhone = $fieldset.find('.input').hasClass('phone'),
				isEmail = $fieldset.find('.input').hasClass('email'),
				isRating = $fieldset.hasClass('rating'),
				isInput = !isSelect && !isCheckbox && !isRadio && !isPhone && !isEmail && !isRating;
		
			if ( isSelect || isInput ) {
				isValid = thisObject.Validate.inputField($fieldset.find('.input'));
			} else if ( isEmail ) {
				isValid = thisObject.Validate.emailField($fieldset.find('.input'));
			} else if ( isPhone ) {
				isValid = thisObject.Validate.phoneField($fieldset.find('.input'));
			} else if ( isCheckbox || isRadio ) {
				isValid = thisObject.Validate.hasChecked($fieldset);
			}


		} else { // Standard, 'easy' validation
			isValid = $fieldset.hasClass('valid');
		}

		if ( isValid ) {
			return true;
		} else {
			return false;
		}
	};














	/* ==========================================================================
	   Field Event Attachment
	   ========================================================================== */
	/**
	 * Function which attaches all of the required events to an input field.
	 * 
	 * @param  {object} $inputField jQuery object for an <input>, <select>, or <textarea> field.
	 * @param  {string} $onEvents   Events that should be listened for to indicate the field value has changed.
	 */
	Form.prototype.attachEvents = function($inputField, $onEvents){
		$onEvents = $onEvents ? $onEvents : 'keyup';
		var thisObject = this,
			$thisForm = this.form,
			isSelect = $inputField.parents('.fieldset').hasClass('select'),
			isCheckbox = $inputField.attr('type') === 'checkbox',
			isRadio = $inputField.attr('type') === 'radio',
			isPhone = $inputField.hasClass('phone'),
			isEmail = $inputField.hasClass('email'),
			isRating = $inputField.hasClass('rating'),
			isInput = !isSelect && !isCheckbox && !isRadio && !isPhone && !isEmail && !isRating;

		// Trim whitespace
		(function(){
			if (!isCheckbox && !isRadio){
				var value = $inputField.val(),
					newValue = value.replace(util.regEx.whiteSpace, '');
				$inputField.val( newValue );
			}
		})();

		$inputField.focus(function(){
			$(this).parent().addClass('focus');
			$$(window).on('keypress', function(event){
				event.keyCode === 13 ? $inputField.parents('form').trigger('submit_form') : null;
			});
		});
		$inputField.blur(function(){
			$(this).parent().removeClass('focus');
			$$(window).off('keypress');
		});

		$inputField.on($onEvents, function(){
			if ( $(this).val() === '' ) {
				$(this).parent().removeClass('filled animate');
			} else {
				$(this).parent().addClass('filled animate');

				if (thisObject.options.validateOnTyping){
					$thisForm.trigger('field_filled');
				}
			}
		});

		if ( $inputField.parent().hasClass('select') ) {
			$inputField.change(function(){
				if ( $(this).val() !== '' ) {
					$(this).parent().addClass('filled');
				} else {
					$(this).parent().removeClass('filled');
				}

				if (thisObject.validateOnTyping){
					$thisForm.trigger('field_filled');
				}
			});
		}

		// Make fields that already have a value valid.
		if ( isSelect || isInput ) {
			var isValid = this.Validate.inputField($inputField);

		} else if ( isEmail ) {
			var isValid = this.Validate.emailField($inputField);

		} else if ( isPhone ) {
			var isValid = this.Validate.phoneField($inputField);

		} else if ( isCheckbox || isRadio ) {
			var isValid = this.Validate.hasChecked($inputField);
			
			if (isValid) {
				var checkedFields = $inputField.parents('.fieldset').find('input:checked');
				if (isCheckbox) {
					checkedFields.each(function(){
						var $this = jQuery(this);
						$this.parents('.input-button').addClass('checked')
							 .parents('.fieldset').addClass('valid');
					});	
				} else if (isRadio) {
					checkedFields.parents('.input-button').addClass('checked')
								 .parents('.fieldset').addClass('valid');
				}
			}
		}

		if ( isValid ) {
			$inputField.parents('.fieldset').addClass('filled valid animate');
		} else if ($inputField.val() !== '') {
			$inputField.parents('.fieldset').addClass('filled animate');
		}
		this.options.callbackOnEventAttachment();
	};






















	/*==================================
	=            Form Utils            =
	==================================*/
	
	this.FormUtils = {};
	FormUtils.makeValid = function($field) {
		$field.addClass('valid').removeClass('invalid error');
	};


	FormUtils.makeInvalid = function($field, error) {
		$field.addClass('invalid').removeClass('valid');

		if (error) {
			$field.addClass('invalid error');
		}
	};






	FormUtils.scrollUpIfNeeded = function($openSection){
		if ( window.pageYOffset > $openSection.offset().top ) {
			$("html, body").animate({ scrollTop: ($openSection.offset().top - 70) }, 300);
		}
	};



	FormUtils.saveSectionHeights = function($steps){

		$steps.each(function(){
			var $this = $(this),
				$thisHeight = $this.children('div').height() + 90;

			$this.data('height', $thisHeight);
		});
	};



	FormUtils.revealSection = function($section, manageHeight){
		$section.addClass('show')
					.siblings('.show').removeClass('show');

		FormUtils.scrollUpIfNeeded($section);
		if (manageHeight) {
			FormUtils.showSection($section);
		}
	};
	FormUtils.showSection = function($section){
		$section.height( $section.data('height') );
	};



	FormUtils.numberKeycodes = function(event){
		var keyPressed = util.getKeycode(event),
			explicitKey = util.getKeycode(event, true);

		var isTab 		= 	(!explicitKey ? keyPressed === 9 : keyPressed === 'Tab'),
			isEnter 	= 	(!explicitKey ? keyPressed === 13 : keyPressed === 'Enter'),
			isBackspace = 	(!explicitKey ? keyPressed === 8 : keyPressed === 'Backspace'),
			isShift 	= 	(!explicitKey ? keyPressed === 16 : keyPressed === 'Shift'),
			isCtrl	 	= 	(!explicitKey ? keyPressed === 17 : keyPressed === 'Control' || keyPressed === 'Meta'),
			isAlt	 	= 	(!explicitKey ? keyPressed === 18 : keyPressed === 'Alt'),
			isHome 		= 	(!explicitKey ? keyPressed === 36 : keyPressed === 'Home'),
			isEnd 		= 	(!explicitKey ? keyPressed === 35 : keyPressed === 'End'),
			isDot		= 	(!explicitKey ? keyPressed === 190 : keyPressed === 'Decimal' || keyPressed === '.'),
			isSpace 	= 	(!explicitKey ? keyPressed === 32 : keyPressed === ' ' || keyPressed === 'Spacebar');
			isDash		= 	(!explicitKey ? (keyPressed === 189 || keyPressed === 173) : keyPressed === 'Subtract' || keyPressed === '-'),
			isNumber	= 	(!explicitKey ? (keyPressed >= 48 && keyPressed <= 57) : (parseInt(keyPressed) >= 0 && parseInt(keyPressed) <= 9)),
			isNumberAlt	= 	(!explicitKey ? (keyPressed >= 96 && keyPressed <= 105) : (parseInt(keyPressed) >= 0 && parseInt(keyPressed) <= 9)),
			isDelete 	= 	(!explicitKey ? keyPressed === 46 : keyPressed === 'Del' || keyPressed === 'Delete'),
			isArrowLeft = 	(!explicitKey ? keyPressed === 37 : keyPressed === 'Left' || keyPressed === 'ArrowLeft'),
			isArrowRight= 	(!explicitKey ? keyPressed === 39 : keyPressed === 'Right' || keyPressed === 'ArrowRight'),
			isArrowUp 	= 	(!explicitKey ? keyPressed === 38 : keyPressed === 'Up' || keyPressed === 'ArrowUp'),
			isArrowDown	= 	(!explicitKey ? keyPressed === 40 : keyPressed === 'Down' || keyPressed === 'ArrowDown'),
			isArrow 	= 	(isArrowLeft || isArrowRight || isArrowUp || isArrowDown || isHome || isEnd);

		if (isTab || isEnter || isBackspace || isShift || isCtrl || isAlt || isHome || isEnd || isDot || isSpace || isDash || isNumber || isNumberAlt || isDelete || isArrow) {
			return true;
		} else {
			return false;
		}
	};


	FormUtils.appendStateList = function(){
		$window.one('scroll', function(){
			$.getJSON('/js/_parts-form/state.json', '', function(data){
				var items = [];
				$.each(data, function(key, val){
					items.push('<option value="' + key + '">' + val + '</option>');
				});
				$$('.fieldset.state').find('select').append(items);
			});
		});
	};

	FormUtils.appendCountryList = function(){
		$window.one('scroll', function(){
			$.getJSON('/js/_parts-form/country.json', '', function(data){
				var items = [];
				$.each(data, function(key, val){
					items.push('<option value="' + key + '">' + val + '</option>');
				});
				$$('.fieldset.country').find('select').append(items);
			});
		});
	};

})(jQuery);