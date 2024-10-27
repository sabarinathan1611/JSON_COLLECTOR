// Listener for completed web requests
chrome.webRequest.onCompleted.addListener(
  async (details) => {
    try {
      const response = await fetch(details.url);
      const contentType = response.headers.get("content-type");

      // Only proceed if the content type is JSON
      if (contentType && contentType.includes("application/json")) {
        let textData = await response.text();

        // Clean up non-standard characters at the start of the response
        if (textData.startsWith(")]}',")) {
          textData = textData.slice(5);  // Remove the initial ")]}'," characters
        }

        const jsonData = JSON.parse(textData); // Parse the cleaned-up JSON

        // Retrieve existing stored data
        chrome.storage.local.get({ responses: [] }, (result) => {
          // Check if this URL is already in the responses list
          const exists = result.responses.some((item) => item.url === details.url);

          // If it doesn't exist, add it to the storage
          if (!exists) {
            const updatedResponses = [
              ...result.responses,
              { url: details.url, data: jsonData },
            ];

            // Update storage with the new response data
            chrome.storage.local.set({ responses: updatedResponses });
          }
        });
      }
    } catch (error) {
      console.error("Error fetching JSON response:", error);
    }
  },
  { urls: ["<all_urls>"] }
);
