// Based on https://www.josephearl.co.uk/post/static-sites-search-hugo/
// Last modified by Matt Piekenbrock 2017

// Create the lunr search index
function searchIndex() {
	// return lunr(function() {
	// 	this.field("title",{boost:10}),
	// 		this.field("tags",{boost:5}),
	// 		this.ref("ref")
	// });
	var index = elasticlunr(function () {
		this.addField('title');
		this.addField('tags');
		this.setRef('ref');
	});
	return(index);
}

// AJAX request to load the index
// function loadIndexJson(indexJsonLoadedFunction) {
// 	var x = new XMLHttpRequest;
// 	x.overrideMimeType("application/json");
// 	x.open("GET", "/search_index.json", true);
// 	x.onreadystatechange = function () {
// 		if (4 == x.readyState && "200" == x.status) {
// 			indexJsonLoadedFunction(
// 				JSON.parse(x.responseText)
// 			);
// 		}
// 	};
// 	x.send(null)
// }

function search(renderFactoryFunction) {
	return function (lunrIndex, titles) {
		var renderFunction = renderFactoryFunction(titles);
		return function (query) {
			var results = lunrIndex.search(query);
			renderFunction(results);
		}
	}
}


// Render the search results as html markup
function renderSearchResults(searchResultsNode) {
	return function (titles) {
		return function (results) {
			// Create a list of results
			var ul = document.createElement('ul');
			results.forEach(function (result) {
				var li = document.createElement('li');
				// Create an item with the title
				li.appendChild(document.createTextNode(
					titles[result.ref]
				));
				ul.appendChild(li);
			});
			// Remove any existing content
			while (searchResultsNode.hasChildNodes()) {
				searchResultsNode.removeChild(
					searchResultsNode.lastChild
				);
			}
			// Render the list
			searchResultsNode.appendChild(ul);
		}
	}
}

//
// function registerSearchHandler(searchInputNode, searchFactoryFunction) {
//     return function(lunrIndex, titles) {
//         var searchFunction = searchFactoryFunction(lunrIndex, titles);
//         // Register an oninput event handler
//         searchInputNode.oninput = function(event) {
//             var query = event.target.value;
//             searchFunction(query);
//         }
//     }
// }