function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function summary_template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (date, summary, title) {;pug_debug_line = 1;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + "\u003Carticle class=\"card\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-4 p-1\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + "\u003Cimg class=\"card-img-top\" src=\"post\u002F2015-07-23-r-rmarkdown_files\u002Ffigure-html\u002Fpie-1.png\" style=\"object-fit: contain; display: block;\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-8 card-body\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + "\u003Ch4 class=\"card-title\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + "\u003Ca href=\"#\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fh4\u003E";
;pug_debug_line = 8;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + "\u003Ch6 class=\"card-subtitle mb-2 text-muted\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + "\u003Cspan class=\"fa fa-clock-o\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 10;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 10;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + "&nbsp; ";
;pug_debug_line = 10;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date) ? "" : pug_interp));
;pug_debug_line = 10;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + " ~ 1 Words\u003C\u002Fspan\u003E\u003C\u002Fh6\u003E";
;pug_debug_line = 11;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + "\u003Csmall class=\"card-text\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = summary) ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E";
;pug_debug_line = 12;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + "\u003C!-- footer.pull-right--\u003E";
;pug_debug_line = 13;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + "\u003C!--  a.btn.btn-primary.btn-sm href={{ .Permalink }}--\u003E";
;pug_debug_line = 14;pug_debug_filename = "layouts\u002Ftemplates\u002Fsummary.pug";
pug_html = pug_html + "\u003C!--    | Read more--\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E";}.call(this,"date" in locals_for_with?locals_for_with.date:typeof date!=="undefined"?date:undefined,"summary" in locals_for_with?locals_for_with.summary:typeof summary!=="undefined"?summary:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}