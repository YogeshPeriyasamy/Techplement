// script.js

document.addEventListener("DOMContentLoaded", () => {
    const quoteContainer = document.getElementById("quote-container");
    const quoteText = document.getElementById("quote");
    const quoteAuthor = document.getElementById("author");
    const newQuoteButton = document.getElementById("new-quote");
    const searchInput = document.getElementById("author-search");
    const searchButton = document.getElementById("search");
    const searchResults = document.getElementById("search-results");

    const apiUrl = "https://api.quotable.io";

    const getRandomQuote = async () => {
        try {
            const response = await fetch(`${apiUrl}/random`);
            const data = await response.json();
            displayQuote(data);
        } catch (error) {
            console.error("Error fetching random quote:", error);
        }
    };

    const searchQuotes = async (author) => {
        try {
            const response = await fetch(`${apiUrl}/quotes?author=${author}`);
            const data = await response.json();
            displaySearchResults(data.results);
        } catch (error) {
            console.error("Error searching quotes:", error);
        }
    };

    const displayQuote = (quote) => {
        quoteText.textContent = `"${quote.content}"`;
        quoteAuthor.textContent = `- ${quote.author}`;
    };

    const displaySearchResults = (quotes) => {
        searchResults.innerHTML = "";
        if (quotes.length === 0) {
            searchResults.textContent = "No quotes found.";
            return;
        }
        quotes.forEach(quote => {
            const quoteElem = document.createElement("div");
            quoteElem.className = "quote-result";
            quoteElem.innerHTML = `<p>"${quote.content}"</p><p>- ${quote.author}</p>`;
            searchResults.appendChild(quoteElem);
        });
    };

    newQuoteButton.addEventListener("click", getRandomQuote);
    searchButton.addEventListener("click", () => {
        const author = searchInput.value;
        searchQuotes(author);
    });

    // Fetch a random quote on initial load
    getRandomQuote();
});
