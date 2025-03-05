// SOS Button Functionality (Placeholder)
document.getElementById('sos-btn').addEventListener('click', () => {
  alert('SOS Alert sent to your emergency contacts with live location!');
  // In real app: Use Geolocation API + SMS service
});

// Police Helpline (Placeholder)
document.getElementById('police-btn').addEventListener('click', () => {
  alert('Dialing emergency number 112...');
  // In real app: Use telephony API or redirect to phone dialer
});

// Live Location Sharing (Placeholder)
document.getElementById('location-btn').addEventListener('click', () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          alert(`Sharing your location: Lat ${latitude}, Long ${longitude}`);
          // In real app: Share via SMS or app notification
      });
  } else {
      alert('Geolocation is not supported by this browser.');
  }
});

// Volunteer Form Submission
document.getElementById('volunteer-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for signing up as a volunteer!');
  e.target.reset();
});

// Simulate News Feed (Placeholder)
const newsFeed = document.getElementById('news-feed');
const sampleNews = [
  'Crime alert: Incident reported in Area X.',
  'New women’s safety law passed in State Y.',
];
newsFeed.innerHTML = sampleNews.map(item => `<p>${item}</p>`).join('');