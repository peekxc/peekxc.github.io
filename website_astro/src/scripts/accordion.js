document.addEventListener('DOMContentLoaded', function() {
	const cards = document.querySelectorAll('.cursor-context-menu');
	console.log(cards);
	cards.forEach(function(card) {
		card.addEventListener('click', function() {
			console.log(card);
			var parent = card.parentElement;
			console.log(parent);
			parent.querySelector(".accordion-header").classList.toggle("active");
			parent.querySelector(".text-ellipsis").classList.toggle("hidden");
			parent.querySelector(".accordion-body").classList.toggle("hidden");
			parent.querySelector('svg').classList.toggle("hidden");
		});
	});
});