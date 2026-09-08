const axios = require('axios');
const DrawResult = require('../models/DrawResult');

async function syncMagnumResults() {
  try {
    // 1. Get today's date in YYYY-MM-DD format for Magnum's API
    const today = new Date().toISOString().split('T')[0];
    const apiUrl = `https://www.magnum4d.my/results/past/between-dates/null/${today}/5`;

    // 2. Fetch data from Magnum
    const response = await axios.get(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      }
    });

    const latestDraw = response.data[0];

    if (!latestDraw) {
      throw new Error('No draw data returned from API.');
    }

    // 3. Update or Insert into MongoDB using the fixed singleton key
    const updatedRecord = await DrawResult.findOneAndUpdate(
      { singletonKey: 'LATEST_MAGNUM' }, // Fixed key ensures ONLY 1 record exists in DB
      {
        singletonKey: 'LATEST_MAGNUM',
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
        ],
        updatedAt: new Date()
      },
      { upsert: true, returnDocument: 'after' } // upsert = Insert if missing, Update if exists
    );

    console.log(`[DB Sync] Updated record for Draw ${latestDraw.DrawID}`);
    return updatedRecord;

  } catch (error) {
    console.error('[DB Sync Error]:', error.message);
    throw error;
  }
}

// Export the function so server.js can call it
module.exports = syncMagnumResults;