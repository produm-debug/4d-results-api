const axios = require('axios');

async function getMagnumResults() {
  try {
    // Get today's date dynamically in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    const apiUrl = `https://www.magnum4d.my/results/past/between-dates/null/${today}/5`;

    const response = await axios.get(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      }
    });

    // The API returns an array of draw objects; we take the latest one (index 0)
    const latestDraw = response.data[0];

    const structuredData = {
      drawDate: latestDraw.DrawDate,
      drawId: latestDraw.DrawID,
      drawDay: latestDraw.DrawDay,
      topPrizes: {
        first: latestDraw.FirstPrize,
        second: latestDraw.SecondPrize,
        third: latestDraw.ThirdPrize
      },
      specials: [
        latestDraw.Special1, latestDraw.Special2, latestDraw.Special3, 
        latestDraw.Special4, latestDraw.Special5, latestDraw.Special6, 
        latestDraw.Special7, latestDraw.Special8, latestDraw.Special9, 
        latestDraw.Special10
      ],
      consolations: [
        latestDraw.Console1, latestDraw.Console2, latestDraw.Console3, 
        latestDraw.Console4, latestDraw.Console5, latestDraw.Console6, 
        latestDraw.Console7, latestDraw.Console8, latestDraw.Console9, 
        latestDraw.Console10
      ]
    };

    console.log('--- LATEST MAGNUM 4D RESULTS ---');
    console.log(`Draw Date: ${structuredData.drawDate} (${structuredData.drawId})`);
    console.log(`1st Prize: ${structuredData.topPrizes.first}`);
    console.log(`2nd Prize: ${structuredData.topPrizes.second}`);
    console.log(`3rd Prize: ${structuredData.topPrizes.third}`);
    console.log('--------------------------------');

    return structuredData;

  } catch (error) {
    console.error('API Request Failed:', error.message);
  }
}

getMagnumResults();