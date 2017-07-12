const gallery = (() => {

  const init = (search) => {
    let data = { "tags": search, "format": "json" };

    $("#gallery").empty();
    $("#search-flickr").val(search);

    getFeed(data);
  };

  const getFeed = (data) => {
    $.ajax({
      url: 'https://api.flickr.com/services/feeds/photos_public.gne',
      dataType: 'jsonp',
      data: data
    });
  };

  const formatDate = published => {
    const date = new Date(published);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${day} ${monthNames[monthIndex]} ${year} at ${hour}:${minutes}`;
  };
  
  return {
    init,
    getFeed,
    formatDate
  };

})();

const jsonFlickrFeed = json => {

  const flickrAuthorURL = 'https://www.flickr.com/people/';

  $.each(json.items, (i, item) => {

    let formatPublished = gallery.formatDate(item.published);

    let flickrItemHTML = `
      <div class="entry">
        <div class="picture"><a href="#appLink"><img src="${item.media.m}" /></a></div>
        <div class="info">
          <div class="details">
            <h2><a href="#appLink">${item.title}</a></h2> 
            <span>Published: ${formatPublished}</span>
            <span class="links">
              <a href="${flickrAuthorURL}${item.author_id}" target="_blank" class="link-author">Post author</a>
              <a href="${item.link}" target="_blank">View on Flickr</a>
            </span>
            <div class="plusone"><div class="g-plusone" data-annotation="inline" data-width="300" data-href="${item.link}"></div></div>
          </div>
        </div>
      </div>`;

    $(flickrItemHTML).appendTo("#gallery");
  });

  gapi.plusone.go("gallery");

}

const searchFlickr = () => {
  let search = $("#search-flickr").val();
  gallery.init(search);
}

$(document).ready(() => {
   gallery.init('space');
});