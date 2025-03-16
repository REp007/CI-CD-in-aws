// API URL - change this to your deployed backend URL when in production
const API_URL = "http://localhost:3000/api";

// Fetch all items
async function fetchItems() {
  try {
    const response = await fetch(`${API_URL}/items`);
    const data = await response.json();
    displayItems(data);
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

// Display items in the UI
function displayItems(items) {
  const container = document.getElementById("items-container");
  container.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card item-card";
    card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
            </div>
        `;
    container.appendChild(card);
  });
}

// Add a new item
async function addItem(name, description) {
  try {
    const response = await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });

    if (response.ok) {
      fetchItems(); // Refresh the list
    }
  } catch (error) {
    console.error("Error adding item:", error);
  }
}

// Event listeners
document
  .getElementById("add-item-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    addItem(name, description);

    // Reset form
    this.reset();
  });

// Initial fetch
document.addEventListener("DOMContentLoaded", fetchItems);
