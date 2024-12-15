// Truncate Titles Function
function truncateTitles() {
  const titles = document.querySelectorAll('.rss-feed-item h3');
  titles.forEach(function(title) {
    const words = title.textContent.split(' ');
    if (words.length > 6) {
      const truncatedTitle = words.slice(0, 6).join(' ') + '...';
      title.textContent = truncatedTitle;
    }
  });
}

// Fetch the RSS feed XML and display titles and content
async function loadRSSFeed() {
  try {
    const response = await fetch('https://blog.nishimiya.my.id/index.xml');
    const xmlText = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const items = xmlDoc.getElementsByTagName("item");
    const rssContainer = document.getElementById("rss-feed");
    rssContainer.innerHTML = '';

    for (let i = 0; i < Math.min(items.length, 5); i++) {
      const titleElement = items[i].getElementsByTagName("title")[0];
      const titleText = titleElement.textContent;
      const pubDateElement = items[i].getElementsByTagName("pubDate")[0];
      const pubDateText = new Date(pubDateElement.textContent).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });

      const linkElement = items[i].getElementsByTagName("link")[0];
      const linkUrl = linkElement.textContent;

      const rssItem = document.createElement("div");
      rssItem.className = "rss-feed-item";

      const linkTag = document.createElement("a");
      linkTag.href = linkUrl;
      linkTag.target = "_blank";
      linkTag.innerHTML = `
  <h3>${titleText}</h3>
  <p>${pubDateText}</p>
`;
      rssItem.appendChild(linkTag);
      rssContainer.appendChild(rssItem);
    }
  } catch (error) {
    console.error("Failed to load RSS feed:", error);
  }
}

// Load RSS feed on page load
loadRSSFeed().then(function() {
  truncateTitles();
});
