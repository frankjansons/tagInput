$.fn.tagInput = function() {

	return this.each(function(options) {
	
		var settings = $.extend( $.fn.tagInput.defaults, options );
	
		var tagInput = $(this);
		var hiddenInput = $(this).children('input[type=hidden]');
		var textInput = $(this).children('input[type=text]');
		
		cleanUpHiddenField();
		
		var defaultValues = hiddenInput.val().split(',');
		
		for(i=0; i<defaultValues.length; i++) {
			addLabel(defaultValues[i]);
		}
     
		textInput.keyup(function() {
			var str = $(this).val();
			if (str.indexOf(",") >= 0) {
				makeBadge();
			}
		});
		
		textInput.change(function() {
			makeBadge();
		});
		
		function makeBadge() {
			str = textInput.val();
			str = str.replace(',','');
			textInput.val("");
			addLabel(str);
			var result = textInput.next();
			result.val(result.val()+','+str);
			cleanUpHiddenField();
		}
		
		function closeLabel(id) {
			label = tagInput.children('span.tagLabel[data-badge='+id+']');
			hiddenInput.val(hiddenInput.val().replace((label.text().slice(0,-2)),''));
			cleanUpHiddenField();
			label.remove();
		}
		
		function addLabel(str) {
			if(tagInput.children('span.tagLabel').length > 0) {
				badge = textInput.prev();
				var id = badge.data('badge') + 1;
				label = $( '<span class="label '+settings.labelClass+' tagLabel" data-badge="'+id+'">'+str+' <a href="#" data-badge="'+id+'" aria-label="close" class="closelabel">&times;</a></span> ' ).insertAfter(badge);
			} else {
				label = $( '<span class="label '+settings.labelClass+' tagLabel" data-badge="1">'+str+' <a href="#" data-badge="1" aria-label="close" class="closelabel">&times;</a></span> ' ).insertBefore(textInput);
			}
			label.children('.closelabel').click(function() {				
				closeLabel($(this).data('badge'));
			});
		}
		
		function cleanUpHiddenField() {
			s = hiddenInput.val();
			s = s.replace(/^( *, *)+|(, *(?=,|$))+/g, '');
			hiddenInput.val(s);
		}
		
	});

};

$.fn.tagInput.defaults = {
    labelClass: "label-success"
};