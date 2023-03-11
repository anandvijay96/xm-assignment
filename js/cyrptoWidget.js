async function fetchCryptoData() {
  try {
    const response = await fetch("https://api.coinlore.net/api/tickers/");
    const { data } = await response.json();

    const symbols = ["BTC", "ETH", "XRP", "LTC", "BCH"];
    const filteredData = data
      .filter(({ symbol }) => symbols.includes(symbol))
      .map(({ symbol, name, price_usd, percent_change_24h }) => ({
        symbol,
        name,
        price_usd,
        percent_change_24h,
      }));

    const cardsContainer = document.querySelector(
      "#crypto__cards .cards__container"
    );

    filteredData.forEach(({ symbol, name, price_usd, percent_change_24h }) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
          <div class="card__header">
            <div class="card__icon">
              <img src="/images/${symbol}.png" alt="${name}" />
            </div>
            <h3 class="card__symbol">${symbol}</h3>
            <div class="card__name">
              <h4>${name}</h4>
            </div>
          </div>
          <hr class="card__line" />
          <div class="card__body">
          <div class="card__price">$${
            price_usd !== null
              ? Number(price_usd).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "N/A"
          }</div>
            <div class="card__percent ${
              percent_change_24h >= 0 ? "up" : "down"
            }">
              <span><i class="fas fa-chevron-circle-${
                percent_change_24h >= 0 ? "up" : "down"
              }"></i></span>${Math.abs(percent_change_24h).toFixed(2)}%
            </div>
          </div>
        `;
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error)
    const cardsContainer = document.querySelector(
      "#crypto__cards .cards__container"
    );
    cardsContainer.innerHTML = `<p class="error__message">There was an error fetching the data. Please refresh the page and try again.</p>`;
  }
}

fetchCryptoData();
