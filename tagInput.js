$.fn.tagInput = function(options) {

	return this.each(function() {
	
		var settings = $.extend( {}, { labelClass: "label label-success" }, options );
	
		var tagInput = $(this);
		var hiddenInput = $(this).children('input[type=hidden]');
		var textInput = $(this).children('input[type=text]');
		
		cleanUpHiddenField();
		
		var defaultValues = hiddenInput.val().split(',');
		
		for(i=0; i<defaultValues.length; i++) {
			addLabel(defaultValues[i]);
		}
     
		textInput.keyup(function(event) {
			if(event.keyCode == 8) { //Backspace
				closeLabel(-1);
			} else if( event.keyCode == 27 ) { //Escape
				textInput.val("");
				textInput.blur();
			}
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
			if(id>0) {
				label = tagInput.children('span.tagLabel[data-badge='+id+']');
			} else {
				label = tagInput.children('span.tagLabel').last();
			}
			hiddenInput.val(hiddenInput.val().replace((label.text().slice(0,-2)),''));
			cleanUpHiddenField();
			label.remove();
		}
		
		function addLabel(str) {
			if(tagInput.children('span.tagLabel').length > 0) {
				badge = textInput.prev();
				var id = badge.data('badge') + 1;
				label = $( '<span class="'+settings.labelClass+' tagLabel" data-badge="'+id+'">'+str+' <a href="#" data-badge="'+id+'" aria-label="close" class="closelabel">&times;</a></span> ' ).insertAfter(badge);
			} else {
				label = $( '<span class="'+settings.labelClass+' tagLabel" data-badge="1">'+str+' <a href="#" data-badge="1" aria-label="close" class="closelabel">&times;</a></span> ' ).insertBefore(textInput);
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