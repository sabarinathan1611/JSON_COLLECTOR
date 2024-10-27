document.addEventListener("DOMContentLoaded", () => {
  const jsonList = document.getElementById("jsonList");
  const downloadAllBtn = document.getElementById("downloadAll");
  const resetListBtn = document.getElementById("resetList"); // Reference to the reset button

  // Retrieve responses from storage and display them
  chrome.storage.local.get({ responses: [] }, (result) => {
    result.responses.forEach((response, index) => {
      const item = document.createElement("div");
      item.classList.add("jsonItem");
      item.textContent = `URL: ${response.url}`;

      // Create a button for individual download
      const downloadBtn = document.createElement("button");
      downloadBtn.textContent = "Download JSON";
      downloadBtn.onclick = () => downloadJSON(response.data, `response_${index + 1}.json`);

      item.appendChild(downloadBtn);
      jsonList.appendChild(item);
    });
  });

  // Download all responses as a single JSON file
  downloadAllBtn.onclick = () => {
    chrome.storage.local.get({ responses: [] }, (result) => {
      const allData = result.responses.map((res) => ({
        url: res.url,
        data: res.data
      }));

      downloadJSON(allData, `all_responses_${Date.now()}.json`);
    });
  };

  // Reset list by clearing storage and refreshing the popup
  resetListBtn.onclick = () => {
    chrome.storage.local.set({ responses: [] }, () => {
      jsonList.innerHTML = ""; // Clear displayed list
    });
  };
});

// Function to create a downloadable JSON file
function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  chrome.downloads.download({
    url: url,
    filename: filename
  });
}
