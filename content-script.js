function analyzeStyles() {
  const styleGuide = {
    colors: new Set(),
    fonts: new Set(),
    spacing: new Set(),
    borderRadius: new Set()
  };

  // Get all elements
  const elements = document.querySelectorAll('*');
  
  elements.forEach(element => {
    const styles = window.getComputedStyle(element);
    
    // Colors
    styleGuide.colors.add(styles.color);
    styleGuide.colors.add(styles.backgroundColor);
    
    // Fonts
    styleGuide.fonts.add(styles.fontFamily);
    
    // Spacing
    styleGuide.spacing.add(styles.padding);
    styleGuide.spacing.add(styles.margin);
    
    // Border radius
    if (styles.borderRadius !== '0px') {
      styleGuide.borderRadius.add(styles.borderRadius);
    }
  });

  return {
    colors: [...styleGuide.colors].filter(color => color !== 'rgba(0, 0, 0, 0)'),
    fonts: [...styleGuide.fonts],
    spacing: [...styleGuide.spacing].filter(space => space !== '0px'),
    borderRadius: [...styleGuide.borderRadius]
  };
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeStyles') {
    const styleGuide = analyzeStyles();
    sendResponse(styleGuide);
  }
});