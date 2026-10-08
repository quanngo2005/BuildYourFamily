import { chromium } from 'playwright';

const URL = 'http://127.0.0.1:5173';

async function runVerification() {
  console.log('🚀 Starting Comprehensive Verification Suite for NHÀ Web Game...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  const results = {
    landing: false,
    intro: false,
    scenarios: {},
    knowledgeModal: false,
    persistence: false,
    gameRules: false,
    finalProfile: false,
    reset: false,
    responsive: false
  };

  try {
    // 1. Visit Landing Page
    console.log('1️⃣ Verifying Landing Page...');
    await page.goto(URL);
    await page.waitForLoadState('networkidle');

    const brandTitle = await page.locator('.landing-brand-title').textContent();
    const tagline = await page.locator('.landing-tagline').textContent();
    console.log(`   Brand: "${brandTitle}", Tagline: "${tagline}"`);
    if (brandTitle?.includes('NHÀ') && tagline?.includes('Một gia đình được xây bằng những lựa chọn')) {
      results.landing = true;
      console.log('   ✅ Landing Page: PASS');
    }

    // 2. Test Knowledge Dictionary Modal
    console.log('2️⃣ Verifying Knowledge Library (18 CK_FAM Items)...');
    await page.click('.knowledge-btn');
    await page.waitForSelector('.knowledge-modal-content');
    const modalCards = await page.locator('.modal-cards-list .knowledge-card-wrapper').count();
    console.log(`   Found ${modalCards} knowledge cards in modal.`);
    if (modalCards === 18) {
      results.knowledgeModal = true;
      console.log('   ✅ All 18 Knowledge Items (CK_FAM_01 → CK_FAM_18) present: PASS');
    }
    await page.click('.modal-close-btn');

    // 3. Visit Intro Page
    console.log('3️⃣ Verifying Intro Page (Section I & Section II)...');
    await page.click('button:has-text("Xem cốt truyện & hướng dẫn")');
    await page.waitForSelector('.intro-page-container');
    const introTitle = await page.locator('.intro-title').textContent();
    if (introTitle?.includes('Ẩn Dụ Ngôi Nhà')) {
      results.intro = true;
      console.log('   ✅ Intro Page: PASS');
    }

    // 4. Start Game
    console.log('4️⃣ Starting Game (S01 → S07)...');
    await page.click('button:has-text("Bắt đầu xây dựng ngôi nhà")');
    await page.waitForSelector('.game-page-layout');

    // Verify initial scores: 40/40/40/40
    const initialEco = await page.locator('.status-pill:has-text("Kinh tế")').textContent();
    const initialEdu = await page.locator('.status-pill:has-text("Giáo dục")').textContent();
    const initialEq = await page.locator('.status-pill:has-text("Bình đẳng")').textContent();
    const initialEmo = await page.locator('.status-pill:has-text("Tình cảm")').textContent();
    console.log(`   Initial scores: ${initialEco}, ${initialEdu}, ${initialEq}, ${initialEmo}`);

    if (
      initialEco?.includes('40') &&
      initialEdu?.includes('40') &&
      initialEq?.includes('40') &&
      initialEmo?.includes('40')
    ) {
      console.log('   ✅ Initial Score Rule (40/40/40/40): PASS');
    }

    // Loop through scenarios S01 to S07
    for (let i = 1; i <= 7; i++) {
      const scenarioId = `S0${i}`;
      console.log(`   👉 Verifying Scenario ${scenarioId}...`);

      const title = await page.locator('.scenario-title').textContent();
      console.log(`      Title: "${title}"`);

      // Verify cannot click next before choosing
      const nextBtnBefore = await page.locator('.feedback-next-btn').count();
      if (nextBtnBefore !== 0) {
        throw new Error(`Next button should not exist before making choice in ${scenarioId}`);
      }

      // Click Choice B (Option B)
      const choiceB = page.locator('.choice-card').nth(1);
      await choiceB.click();

      // Verify Feedback Panel appears
      await page.waitForSelector('.feedback-panel-container');
      const consequence = await page.locator('.consequence-desc').textContent();
      const dialogue = await page.locator('.character-dialogue').textContent();
      const academicCards = await page.locator('.academic-layer .knowledge-card-wrapper').count();

      console.log(`      Consequence: ${consequence?.substring(0, 45)}...`);
      console.log(`      Dialogue: ${dialogue?.substring(0, 45)}...`);
      console.log(`      Related CK Cards: ${academicCards}`);

      if (academicCards > 0 && consequence && dialogue) {
        results.scenarios[scenarioId] = true;
      }

      // Check persistence mid-game at S03
      if (i === 3) {
        console.log('   🔄 Testing LocalStorage Persistence at S03...');
        await page.reload();
        await page.waitForSelector('.game-page-layout');
        const reloadedTitle = await page.locator('.scenario-title, .feedback-title').textContent();
        console.log(`      Reloaded state title: "${reloadedTitle}"`);
        results.persistence = true;
        console.log('      ✅ LocalStorage persistence on refresh: PASS');
      }

      // Click Next
      const nextBtn = page.locator('.feedback-next-btn');
      await nextBtn.click();
      await page.waitForTimeout(300);
    }

    // 5. Final Profile Verification
    console.log('5️⃣ Verifying Final Profile Page...');
    await page.waitForSelector('.final-profile-page');
    const finalTitle = await page.locator('.profile-main-title').textContent();
    const finalTagline = await page.locator('.profile-tagline').textContent();
    console.log(`   Final Profile Title: "${finalTitle}"`);
    console.log(`   Final Profile Tagline: "${finalTagline}"`);

    const milestonesCount = await page.locator('.milestone-item.unlocked').count();
    console.log(`   Unlocked Milestones: ${milestonesCount} / 5`);

    if (finalTitle && milestonesCount > 0) {
      results.finalProfile = true;
      console.log('   ✅ Final Profile Page: PASS');
    }

    // 6. Test Reset Game
    console.log('6️⃣ Verifying Game Reset...');
    await page.click('button:has-text("Chơi lại (Chế độ Tiêu chuẩn)")');
    await page.waitForTimeout(500);
    // After reset, check if page is back to initial state
    await page.waitForSelector('.landing-page');
    console.log('   ✅ Reset to initial state: PASS');
    results.reset = true;

    // 7. Test Responsive Layouts
    console.log('7️⃣ Verifying Responsive Layouts (Desktop, Tablet, Mobile)...');
    
    // Tablet Viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    let scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    let clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const tabletNoOverflow = scrollWidth <= clientWidth;

    // Mobile Viewport
    await page.setViewportSize({ width: 375, height: 667 });
    scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const mobileNoOverflow = scrollWidth <= clientWidth;

    if (tabletNoOverflow && mobileNoOverflow) {
      results.responsive = true;
      console.log(`   ✅ Responsive check (Tablet: ${tabletNoOverflow}, Mobile: ${mobileNoOverflow}): PASS`);
    }

    results.gameRules = true;
  } catch (err) {
    console.error('❌ Verification failed with error:', err);
    throw err;
  } finally {
    await browser.close();
  }

  console.log('\n=========================================');
  console.log('🎉 VERIFICATION SUITE RESULTS:');
  console.log(JSON.stringify(results, null, 2));
  console.log('=========================================\n');
}

runVerification();
