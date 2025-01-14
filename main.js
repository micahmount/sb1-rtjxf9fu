document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Style Guide Generator</h1>
    <div class="input-group">
      <input type="url" id="urlInput" placeholder="Enter URL to analyze" />
      <button id="analyzeBtn">Analyze</button>
    </div>
    <div id="results" class="results"></div>
  </div>
`;

document.getElementById('analyzeBtn').addEventListener('click', async () => {
  // Check if we're in a Chrome extension environment
  if (typeof chrome === 'undefined' || !chrome.tabs) {
    document.getElementById('results').innerHTML = 
      'This tool is designed to work as a Chrome extension. Please load it as an extension in Chrome.';
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  try {
    const results = await chrome.tabs.sendMessage(tab.id, { action: 'analyzeStyles' });
    displayResults(results);
  } catch (error) {
    console.error('Error analyzing styles:', error);
    document.getElementById('results').innerHTML = 'Error analyzing page. Make sure you\'re on an active webpage.';
  }
});

function displayResults(styleGuide) {
  const resultsDiv = document.getElementById('results');
  
  resultsDiv.innerHTML = `
    <div class="style-section">
      <h2>Colors</h2>
      <div class="color-grid">
        ${styleGuide.colors.map(color => `
          <div class="color-sample">
            <div class="color-box" style="background-color: ${color}"></div>
            <span>${color}</span>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="style-section">
      <h2>Fonts</h2>
      <ul>
        ${styleGuide.fonts.map(font => `<li>${font}</li>`).join('')}
      </ul>
    </div>
    
    <div class="style-section">
      <h2>Spacing</h2>
      <ul>
        ${styleGuide.spacing.map(space => `<li>${space}</li>`).join('')}
      </ul>
    </div>
    
    <div class="style-section">
      <h2>Border Radius</h2>
      <ul>
        ${styleGuide.borderRadius.map(radius => `<li>${radius}</li>`).join('')}
      </ul>
    </div>
  `;
}