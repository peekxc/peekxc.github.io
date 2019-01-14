// $('#navbar').affix({
//     offset: { top: $('#banner').height() }
// });

// $('#page_content').scrollspy({ target: '#page_toc' });
//
// $('[data-spy="scroll"]').each(function () {
// 	var $spy = $(this).scrollspy('refresh')
// });
//
// $('[data-spy="scroll"]').on('activate.bs.scrollspy', function () {
// 	console.log("switching contexts...")
// });
//
// $('body').scrollspy({ target: '#page_toc' })

jQuery(document).ready(function() {
	setTimeout(updateScrollSpy, 1000);
});
function updateScrollSpy() {
	jQuery('[data-spy="scroll"]').each(function () {
		var $spy = jQuery(this).scrollspy('refresh')
	});
}