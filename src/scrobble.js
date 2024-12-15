const apiKey = '100ef39a2373fb82830e075325bebef7'; // Replace with your Last.fm API key
const username = 'nishi-miya'; // Replace with your Last.fm username

const fetchRecentTracks = async () => {
  const songStatusElement = document.getElementById('song-status');

  try {
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json`);
    const { recenttracks: { track = [] } = {} } = await response.json();

    if (track.length > 0) {
      const { name: songName, artist, album } = track[0];
      songStatusElement.innerHTML = `
        🎧 Last Played: <span>${songName}</span> by ${artist['#text']} (Album: ${album?.['#text'] || 'Unknown Album'})
      `;
    } else {
      songStatusElement.innerText = "No recent tracks found.";
    }
  } catch (error) {
    console.error("Error fetching Last.fm data:", error);
    songStatusElement.innerText = "Failed to fetch song data.";
  }
};

// Fetch recent track on page load
fetchRecentTracks();

// Poll every 30 seconds to keep the status up to date
setInterval(fetchRecentTracks, 30000);
