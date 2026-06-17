/* ==========================================================================
   ReviewPulse AI - Application Logic
   ========================================================================== */

// 1. Core State & Mock Data
let currentPlatform = 'All';
let searchQuery = '';

// Sample reviews data representing actual items in the feed
const mockReviews = [
  {
    id: "REV-108",
    author: "Elena Rostova",
    platform: "Amazon",
    rating: 5,
    sentiment: "positive",
    category: "Product Quality",
    text: "The audio quality is absolutely crystal clear, and the battery life has exceeded my expectations! Easy to connect, snug fit, and doesn't fall out during morning runs. Highly recommend this brand.",
    date: "2026-06-17"
  },
  {
    id: "REV-107",
    author: "Rohan Sharma",
    platform: "Flipkart",
    rating: 2,
    sentiment: "negative",
    category: "Packaging Damage",
    text: "Extremely disappointed with the delivery. The outer cardboard box was completely torn open, and there were visible scuffs on the charging case. The packaging needs massive improvement.",
    date: "2026-06-17"
  },
  {
    id: "REV-106",
    author: "Claire Dubois",
    platform: "Shopify",
    rating: 5,
    sentiment: "positive",
    category: "Customer Service",
    text: "Had a small issue with discount code application at checkout. I reached out via Shopify chat and the support agent resolved it in under 3 minutes, issuing a partial refund. Outstanding customer service!",
    date: "2026-06-16"
  },
  {
    id: "REV-105",
    author: "Marcus Vance",
    platform: "Google Reviews",
    rating: 3,
    sentiment: "neutral",
    category: "Shipping Delays",
    text: "Product is fairly decent for the price. However, standard shipping took almost 12 days to arrive. Communication from the logistics provider was lacking. Average experience overall.",
    date: "2026-06-15"
  },
  {
    id: "REV-104",
    author: "Aisha Patel",
    platform: "Instagram",
    rating: 5,
    sentiment: "positive",
    category: "Product Quality",
    text: "Saw this on an Instagram influencer's page and bought it on impulse. Zero regrets! The design is stunning, premium finish, and the sound is phenomenal. Exceeded my high expectations.",
    date: "2026-06-15"
  },
  {
    id: "REV-103",
    author: "Liam Neilsen",
    platform: "Shopify",
    rating: 1,
    sentiment: "negative",
    category: "Product Defect",
    text: "Defective item. Left earbud stopped charging completely after only four days of use. I have sent multiple emails to support but haven't received a response. Frustrating experience.",
    date: "2026-06-14"
  },
  {
    id: "REV-102",
    author: "Vikram Malhotra",
    platform: "Flipkart",
    rating: 2,
    sentiment: "negative",
    category: "Sizing Mismatch",
    text: "The product description says 'Standard Size' but it is way too tight. It starts hurting my ears after just 15 minutes of wearing. They need to publish exact dimensions or sizing charts.",
    date: "2026-06-14"
  },
  {
    id: "REV-101",
    author: "Chloe Bennett",
    platform: "Amazon",
    rating: 4,
    sentiment: "positive",
    category: "Product Quality",
    text: "Great value product. The noise cancellation works better than some higher-end brands I have tried. Deducting one star because the included charging cable is extremely short.",
    date: "2026-06-13"
  },
  {
    id: "REV-100",
    author: "Arjun Mehta",
    platform: "Amazon",
    rating: 5,
    sentiment: "positive",
    category: "Product Quality",
    text: "Exceptional build quality. Feels rugged, water-resistant coating actually works, and the physical buttons are tactile and responsive. Very happy with this purchase.",
    date: "2026-06-12"
  },
  {
    id: "REV-099",
    author: "Sophia Garcia",
    platform: "Google Reviews",
    rating: 4,
    sentiment: "positive",
    category: "Pricing",
    text: "Clean, elegant design and simple controls. For a budget-friendly option, you get an premium experience. App integration was simple on iOS.",
    date: "2026-06-11"
  },
  {
    id: "REV-098",
    author: "Tanvi Rao",
    platform: "Instagram",
    rating: 2,
    sentiment: "negative",
    category: "Sizing Mismatch",
    text: "Love the aesthetic color options, but it fits very loosely. Kept falling out of my ears while working out. Will have to return these unfortunately.",
    date: "2026-06-10"
  },
  {
    id: "REV-097",
    author: "Hans Mueller",
    platform: "Shopify",
    rating: 4,
    sentiment: "positive",
    category: "Customer Service",
    text: "Arrived with a small scratch. Reached out and support immediately dispatched a replacement unit. Appreciate the hassle-free response.",
    date: "2026-06-09"
  }
];

// Simulated aggregate data for realistic dashboard view updating
const platformAggregates = {
  All: {
    total: 8452,
    positive: 6626,
    negative: 1022,
    neutral: 804,
    rating: 4.3,
    positivePct: "78.4%",
    negativePct: "12.1%",
    sentimentData: [6626, 1022, 804],
    platformsData: [3420, 2150, 1480, 980, 422],
    complaints: [
      { category: "Shipping Delays", count: 347, pct: "34%", sample: "Ordered 2 weeks ago, still not arrived." },
      { category: "Packaging Damage", count: 286, pct: "28%", sample: "Outer box torn, contents scuffed." },
      { category: "Product Defect", count: 225, pct: "22%", sample: "Left earbud stopped charging." },
      { category: "Sizing Mismatch", count: 164, pct: "16%", sample: "Fits too tightly, hurts ears." }
    ],
    positives: [
      { category: "Product Quality", count: 2981, pct: "45%", sample: "Audio quality is absolutely crystal clear." },
      { category: "Customer Service", count: 2120, pct: "32%", sample: "Support agent resolved it in under 3 minutes." },
      { category: "Fast Shipping", count: 994, pct: "15%", sample: "Arrived next day in perfect order." },
      { category: "Pricing", count: 531, pct: "8%", sample: "Clean design and great budget value." }
    ],
    insights: [
      { label: "high-impact", title: "Address Transit Package Crushing on Flipkart", desc: "28% of Flipkart complaints cite damaged outer boxes. Consider upgrading to thick, double-walled shipping sleeves for Flipkart distribution centers.", action: "View Shipping Logs" },
      { label: "opportunity", title: "Promote Customer Support Response in Marketing", desc: "Customer service references in Shopify reviews are 32% positive, highlighting 'instant resolution'. Feature this key differentiator on landing pages.", action: "Copy Promo Text" },
      { label: "success-insight", title: "High Retention on Product Quality", desc: "Comfort and audio quality metrics are up 14% month-over-month. Excellent product reliability is driving repeat organic traffic.", action: "Export Quality Data" }
    ]
  },
  Amazon: {
    total: 3420,
    positive: 2702,
    negative: 410,
    neutral: 308,
    rating: 4.4,
    positivePct: "79.0%",
    negativePct: "12.0%",
    sentimentData: [2702, 410, 308],
    platformsData: [3420, 0, 0, 0, 0],
    complaints: [
      { category: "Shipping Delays", count: 172, pct: "42%", sample: "Courier delays on Prime shipment." },
      { category: "Product Defect", count: 123, pct: "30%", sample: "Charging wire was missing from box." },
      { category: "Packaging Damage", count: 115, pct: "28%", sample: "Crushed box corners." }
    ],
    positives: [
      { category: "Product Quality", count: 1297, pct: "48%", sample: "Excellent audio range and deep bass." },
      { category: "Fast Shipping", count: 945, pct: "35%", sample: "Ordered at night, delivered by noon." },
      { category: "Pricing", count: 460, pct: "17%", sample: "Unbeatable price point for features." }
    ],
    insights: [
      { label: "high-impact", title: "Optimize Amazon FBA Stock Volumes", desc: "Shipping delays account for 42% of Amazon complaints. Restocking FBA inventory closer to regional metros will mitigate late shipments.", action: "FBA Dashboard" },
      { label: "opportunity", title: "Bundle Spare Cables as Add-on", desc: "Reviewers mention charging cables are short. Offering an cheap premium cable accessory will raise average basket size.", action: "Configure Bundles" }
    ]
  },
  Flipkart: {
    total: 2150,
    positive: 1591,
    negative: 344,
    neutral: 215,
    rating: 4.0,
    positivePct: "74.0%",
    negativePct: "16.0%",
    sentimentData: [1591, 344, 215],
    platformsData: [0, 2150, 0, 0, 0],
    complaints: [
      { category: "Packaging Damage", count: 130, pct: "38%", sample: "Box ripped, scratches on charging case." },
      { category: "Shipping Delays", count: 117, pct: "34%", sample: "Delivery driver delayed three times." },
      { category: "Sizing Mismatch", count: 97, pct: "28%", sample: "Sizing is very tight, not standard." }
    ],
    positives: [
      { category: "Pricing", count: 636, pct: "40%", sample: "Incredible value during Big Billion Days." },
      { category: "Product Quality", count: 477, pct: "30%", sample: "Tough materials, feels very solid." },
      { category: "Customer Service", count: 478, pct: "30%", sample: "Flipkart returns handled quickly." }
    ],
    insights: [
      { label: "high-impact", title: "Enforce Flipkart Packing Compliance", desc: "Packaging damage is the leading driver of 1-star ratings on Flipkart. Verify fulfillment center packing guidelines.", action: "Review Guidelines" }
    ]
  },
  Shopify: {
    total: 1480,
    positive: 1214,
    negative: 118,
    neutral: 148,
    rating: 4.6,
    positivePct: "82.0%",
    negativePct: "8.0%",
    sentimentData: [1214, 118, 148],
    platformsData: [0, 0, 1480, 0, 0],
    complaints: [
      { category: "Product Defect", count: 59, pct: "50%", sample: "Left bud stopped charging in 4 days." },
      { category: "Shipping Delays", count: 35, pct: "30%", sample: "No tracking details updated for 3 days." },
      { category: "Checkout Glitches", count: 24, pct: "20%", sample: "Discount code didn't apply instantly." }
    ],
    positives: [
      { category: "Customer Service", count: 668, pct: "55%", sample: "Support agent resolved it in under 3 minutes." },
      { category: "Product Quality", count: 364, pct: "30%", sample: "Sounds much richer than premium brands." },
      { category: "Fast Shipping", count: 182, pct: "15%", sample: "Direct shipping was very secure and fast." }
    ],
    insights: [
      { label: "success-insight", title: "Outstanding Shopify Chat Resolution", desc: "55% of Shopify promoters highlight live chat help. Consider giving support staff additional credits to issue loyalty discounts.", action: "Manage Support Incentives" },
      { label: "opportunity", title: "Fix Stripe/Shopify Checkout Glitches", desc: "Minor customer reviews call out discount code errors. Update checkout scripts to prevent dropoffs.", action: "Inspect Checkout Scripts" }
    ]
  },
  "Google Reviews": {
    total: 980,
    positive: 764,
    negative: 98,
    neutral: 118,
    rating: 4.2,
    positivePct: "78.0%",
    negativePct: "10.0%",
    sentimentData: [764, 98, 118],
    platformsData: [0, 0, 0, 980, 0],
    complaints: [
      { category: "Shipping Delays", count: 49, pct: "50%", sample: "Took over 12 days to arrive locally." },
      { category: "Product Defect", count: 29, pct: "30%", sample: "Audio drops connection occasionally." },
      { category: "Pricing Confusion", count: 20, pct: "20%", sample: "Store price differed from website." }
    ],
    positives: [
      { category: "Customer Service", count: 306, pct: "40%", sample: "In-store staff resolved product issue." },
      { category: "Product Quality", count: 267, pct: "35%", sample: "Clear sound profile and premium texture." },
      { category: "Pricing", count: 191, pct: "25%", sample: "Reasonably priced compared to competitors." }
    ],
    insights: [
      { label: "opportunity", title: "Drive In-Store Review Program", desc: "Local store customer service ratings are exceptionally high. Introduce QR codes at registers to capture more Google Reviews.", action: "Get QR Assets" }
    ]
  },
  Instagram: {
    total: 422,
    positive: 355,
    negative: 52,
    neutral: 15,
    rating: 4.7,
    positivePct: "84.0%",
    negativePct: "12.3%",
    sentimentData: [355, 52, 15],
    platformsData: [0, 0, 0, 0, 422],
    complaints: [
      { category: "Sizing Mismatch", count: 31, pct: "60%", sample: "Fits loosely during heavy movement." },
      { category: "Shipping Delays", count: 13, pct: "25%", sample: "Took a week to get a shipping confirmation." },
      { category: "Product Defect", count: 8, pct: "15%", sample: "Charging pins dirty on delivery." }
    ],
    positives: [
      { category: "Product Quality", count: 220, pct: "62%", sample: "Design is absolutely gorgeous and fits outfit." },
      { category: "Customer Service", count: 89, pct: "25%", sample: "Support answered Instagram DM within minutes." },
      { category: "Fast Shipping", count: 46, pct: "13%", sample: "Delivery was surprisingly prompt." }
    ],
    insights: [
      { label: "high-impact", title: "Publish Earbud Sizing Guide on Social", desc: "60% of Instagram complaints center around fit. Launch an educational reel showing the proper ear-tip size selection.", action: "View Fit Analytics" },
      { label: "success-insight", title: "Leverage UGC (User Generated Content)", desc: "Social storefront buyers display 84% positive sentiment, heavily admiring product design aesthetics.", action: "Repost UGC Reviews" }
    ]
  }
};

// Mock notifications list
const notifications = [
  { id: 1, text: "New 1-star review on Flipkart: 'Case scuffed on arrival'", time: "2 mins ago", read: false },
  { id: 2, text: "Negative sentiment trend detected for 'Sizing' on Instagram", time: "1 hour ago", read: false },
  { id: 3, text: "Shopify channel synchronized: 14 new reviews fetched", time: "3 hours ago", read: true },
  { id: 4, text: "Weekly AI Digest Report for Siddhi Jadhav is ready to view", time: "1 day ago", read: true }
];

// 2. DOM Elements
const sidebarNavItems = document.querySelectorAll('.nav-item');
const globalSearch = document.getElementById('globalSearch');
const btnDownloadCsv = document.getElementById('btnDownloadCsv');
const btnExportReport = document.getElementById('btnExportReport');
const btnGenSummary = document.getElementById('btnGenSummary');
const btnNotifications = document.getElementById('btnNotifications');
const notifDot = document.getElementById('notifDot');
const notificationDropdown = document.getElementById('notificationDropdown');
const notificationList = document.getElementById('notificationList');
const btnMarkRead = document.getElementById('btnMarkRead');

const kpiTotalReviews = document.getElementById('kpiTotalReviews');
const kpiPositiveReviews = document.getElementById('kpiPositiveReviews');
const kpiPositivePct = document.getElementById('kpiPositivePct');
const kpiNegativeReviews = document.getElementById('kpiNegativeReviews');
const kpiNegativePct = document.getElementById('kpiNegativePct');
const kpiAvgRating = document.getElementById('kpiAvgRating');
const kpiPlatformsConnected = document.getElementById('kpiPlatformsConnected');

const complaintsList = document.getElementById('complaintsList');
const positivesList = document.getElementById('positivesList');
const insightsList = document.getElementById('insightsList');
const reviewsList = document.getElementById('reviewsList');
const platformChipsContainer = document.getElementById('platformChipsContainer');
const filteredCount = document.getElementById('filteredCount');

// Modal Elements
const aiModal = document.getElementById('aiModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnDoneSummary = document.getElementById('btnDoneSummary');
const aiLoader = document.getElementById('aiLoader');
const aiSummaryContent = document.getElementById('aiSummaryContent');
const btnCopyToClipboard = document.getElementById('btnCopyToClipboard');

// Mobile Responsive
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');

// Chart Global Instances
let sentimentChartInstance = null;
let platformChartInstance = null;

// 3. UI Rendering & Update Logic

// Render Toast Notification
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = '';
  if (type === 'success') {
    icon = `<svg viewBox="0 0 24 24" fill="none" stroke="${window.getComputedStyle(document.documentElement).getPropertyValue('--color-success')}" stroke-width="2" style="width:16px;height:16px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
  } else if (type === 'error') {
    icon = `<svg viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" style="width:16px;height:16px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else {
    icon = `<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" style="width:16px;height:16px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `${icon} <span>${message}</span>`;
  toastContainer.appendChild(toast);

  // Automatically remove toast after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Format Numbers with Commas
function formatNum(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Initializing/Updating Charts
function updateCharts(data) {
  const ctxSentiment = document.getElementById('sentimentChart').getContext('2d');
  const ctxPlatform = document.getElementById('platformDistributionChart').getContext('2d');

  // Sentiment Chart Configuration
  if (sentimentChartInstance) {
    sentimentChartInstance.destroy();
  }
  
  sentimentChartInstance = new Chart(ctxSentiment, {
    type: 'doughnut',
    data: {
      labels: ['Positive', 'Negative', 'Neutral'],
      datasets: [{
        data: data.sentimentData,
        backgroundColor: ['#10b981', '#ef4444', '#94a3b8'],
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { family: 'Inter', size: 12 },
            padding: 16,
            usePointStyle: true
          }
        }
      },
      cutout: '65%'
    }
  });

  // Platform Distribution Chart Configuration
  if (platformChartInstance) {
    platformChartInstance.destroy();
  }

  const activePlatforms = ['Amazon', 'Flipkart', 'Shopify', 'Google', 'Instagram'];
  platformChartInstance = new Chart(ctxPlatform, {
    type: 'bar',
    data: {
      labels: activePlatforms,
      datasets: [{
        label: 'Total Reviews',
        data: data.platformsData,
        backgroundColor: ['#ff9900', '#2874f0', '#96bf48', '#ea4335', '#e1306c'],
        borderRadius: 4,
        maxBarThickness: 32
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#f1f5f9' },
          ticks: { font: { family: 'Inter', size: 11 } }
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Inter', size: 11 } }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// Render Page Data based on Platform State
function renderDashboard() {
  const data = platformAggregates[currentPlatform];

  // Update KPI Cards
  kpiTotalReviews.textContent = formatNum(data.total);
  kpiPositiveReviews.textContent = formatNum(data.positive);
  kpiPositivePct.innerHTML = `<span>${data.positivePct} of total</span>`;
  kpiNegativeReviews.textContent = formatNum(data.negative);
  kpiNegativePct.innerHTML = `<span>${data.negativePct} of total</span>`;
  kpiAvgRating.textContent = `${data.rating} ★`;
  kpiPlatformsConnected.textContent = currentPlatform === 'All' ? '5 / 5' : '1 / 5';

  // Render Complaints List
  complaintsList.innerHTML = '';
  if (data.complaints && data.complaints.length > 0) {
    const listContainer = document.createElement('div');
    listContainer.className = 'feedback-list';
    data.complaints.forEach(issue => {
      listContainer.innerHTML += `
        <div class="feedback-item">
          <div class="feedback-item-main">
            <span class="feedback-category">${issue.category}</span>
            <span class="feedback-sample">"${issue.sample}"</span>
          </div>
          <div class="feedback-metrics">
            <span class="feedback-percentage negative">${issue.pct}</span>
            <span class="feedback-count">${formatNum(issue.count)} reviews</span>
          </div>
        </div>
      `;
    });
    complaintsList.appendChild(listContainer);
  } else {
    complaintsList.innerHTML = `<div style="color:var(--text-muted); font-size:13px; text-align:center; padding: 20px 0;">No significant complaints data.</div>`;
  }

  // Render Positives List
  positivesList.innerHTML = '';
  if (data.positives && data.positives.length > 0) {
    const listContainer = document.createElement('div');
    listContainer.className = 'feedback-list';
    data.positives.forEach(pos => {
      listContainer.innerHTML += `
        <div class="feedback-item">
          <div class="feedback-item-main">
            <span class="feedback-category">${pos.category}</span>
            <span class="feedback-sample">"${pos.sample}"</span>
          </div>
          <div class="feedback-metrics">
            <span class="feedback-percentage positive">${pos.pct}</span>
            <span class="feedback-count">${formatNum(pos.count)} reviews</span>
          </div>
        </div>
      `;
    });
    positivesList.appendChild(listContainer);
  } else {
    positivesList.innerHTML = `<div style="color:var(--text-muted); font-size:13px; text-align:center; padding: 20px 0;">No significant positive data.</div>`;
  }

  // Render AI Insights recommendations
  insightsList.innerHTML = '';
  data.insights.forEach(rec => {
    insightsList.innerHTML += `
      <div class="insight-card">
        <span class="insight-label ${rec.label}">${rec.label.replace('-', ' ')}</span>
        <h4 class="insight-title">${rec.title}</h4>
        <p class="insight-desc">${rec.desc}</p>
        <a href="#" class="insight-action" onclick="event.preventDefault(); alert('Redirecting to action details for: ${rec.title}');">
          ${rec.action}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
    `;
  });

  // Render Reviews Feed list
  renderReviewsList();

  // Draw Charts
  updateCharts(data);
}

// Render Reviews Feed list (Filtered by platform & text search)
function renderReviewsList() {
  reviewsList.innerHTML = '';
  
  // Filter reviews locally
  const filtered = mockReviews.filter(rev => {
    // Platform match
    const platformMatch = currentPlatform === 'All' || rev.platform === currentPlatform;
    // Search match (checks author, text, or category)
    const normalizedQuery = searchQuery.toLowerCase().trim();
    const searchMatch = !normalizedQuery || 
                        rev.author.toLowerCase().includes(normalizedQuery) ||
                        rev.text.toLowerCase().includes(normalizedQuery) ||
                        rev.category.toLowerCase().includes(normalizedQuery);
    return platformMatch && searchMatch;
  });

  filteredCount.textContent = `Showing ${filtered.length} of ${mockReviews.length} recent reviews`;

  if (filtered.length === 0) {
    reviewsList.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted); font-size: 14px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:40px;height:40px;margin-bottom:12px;opacity:0.5;">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <p>No reviews match your filter parameters or search query.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(rev => {
    // Star generator
    const stars = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
    
    // Platform class selection
    let platformClass = '';
    if (rev.platform === 'Amazon') platformClass = 'platform-amazon';
    else if (rev.platform === 'Flipkart') platformClass = 'platform-flipkart';
    else if (rev.platform === 'Shopify') platformClass = 'platform-shopify';
    else if (rev.platform === 'Google Reviews') platformClass = 'platform-google';
    else if (rev.platform === 'Instagram') platformClass = 'platform-instagram';

    // Sentiment class
    let sentimentClass = 'sentiment-neutral';
    if (rev.sentiment === 'positive') sentimentClass = 'sentiment-positive';
    else if (rev.sentiment === 'negative') sentimentClass = 'sentiment-negative';

    // Author Initials
    const initials = rev.author.split(' ').map(n => n[0]).join('');

    reviewsList.innerHTML += `
      <div class="review-item" id="rev-card-${rev.id}">
        <div class="review-avatar">${initials}</div>
        <div class="review-main">
          <div class="review-top-meta">
            <div class="review-author-info">
              <span class="review-author">${rev.author}</span>
              <span class="platform-badge ${platformClass}">${rev.platform}</span>
            </div>
            <div class="review-stars-date">
              <span class="review-stars">${stars}</span>
              <span class="review-date">${rev.date}</span>
            </div>
          </div>
          <p class="review-text">${highlightText(rev.text, searchQuery)}</p>
          <div class="review-badges-row">
            <span class="sentiment-badge ${sentimentClass}">
              ${rev.sentiment.charAt(0).toUpperCase() + rev.sentiment.slice(1)}
            </span>
            <span style="font-size:11px; color:var(--text-muted); background:#f1f5f9; padding: 2px 8px; border-radius: 4px;">
              Topic: ${rev.category}
            </span>
          </div>
        </div>
      </div>
    `;
  });
}

// Highlight search matches
function highlightText(text, search) {
  if (!search) return text;
  const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
  return text.replace(regex, `<mark style="background-color: #fef08a; color: var(--text-primary); border-radius: 2px; padding: 0 2px;">$1</mark>`);
}

// 4. Populating Notification Dropdown List
function renderNotifications() {
  notificationList.innerHTML = '';
  let unreadCount = 0;

  notifications.forEach(n => {
    if (!n.read) unreadCount++;
    notificationList.innerHTML += `
      <div class="notification-item" onclick="handleNotifClick(${n.id})">
        ${!n.read ? '<div class="notification-item-dot"></div>' : '<div style="width:8px;height:8px;flex-shrink:0;"></div>'}
        <div style="display:flex; flex-direction:column; gap:2px;">
          <span class="notification-item-text" style="${!n.read ? 'font-weight: 600;' : ''}">${n.text}</span>
          <span class="notification-item-time">${n.time}</span>
        </div>
      </div>
    `;
  });

  if (unreadCount > 0) {
    notifDot.style.display = 'block';
  } else {
    notifDot.style.display = 'none';
  }
}

function handleNotifClick(id) {
  const notif = notifications.find(n => n.id === id);
  if (notif) {
    notif.read = true;
    showToast(`Clicked: "${notif.text}"`);
    renderNotifications();
  }
}

// 5. Interactive Simulated AI Summary Typewriter Action
const summaryText = `### Executive Summary
Across **8,452 reviews** analyzed this month, sentiment remains highly positive at **78.4%**. However, minor distribution trends require immediate operational attention:

### Key Areas of Concern
* **Packaging Damage (Flipkart):** 38% of Flipkart complaints report damaged box arrivals. Suggest upgrading to thick, double-walled shipping envelopes.
* **Shipping Delays (Amazon):** Courier delays are impacting standard delivery timelines. Consider shifting high-volume SKUs to Prime/FBA centers.
* **Sizing Issues (Instagram Shop):** Social commerce buyers report loose sizing fit (L fitting like S).

### Notable Strengths
* **Customer Service (Shopify):** Shopify chat support reviews are overwhelmingly positive, highlighting sub-5 minute resolution times.
* **Material Quality:** Positive reviews for product longevity and material comfort are up 14% month-over-month.

### Recommendations
1. **Packaging Redesign:** Implement immediate reinforcement for Flipkart logistics.
2. **Instagram Sizing Tool:** Add a sizing quiz calculator on the social storefront.`;

function runTypewriter(targetElement, text, speed = 10) {
  targetElement.innerHTML = '';
  targetElement.style.display = 'block';
  let i = 0;
  
  // Format markdown symbols to HTML tags as we type
  let formattedText = text
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/### (.*?)(<br>|$)/g, '<h3>$1</h3>')
    .replace(/(\d\.\s)(.*?)(<br>|$)/g, '<li>$2</li>')
    .replace(/•\s(.*?)(<br>|$)/g, '<li>$1</li>');

  // Since we want to type character by character but keep tags intact,
  // we can use a step interval or type raw HTML directly with slice.
  // Using interval slicing is smoother and prevents tag breaking.
  
  let typingTimer = setInterval(() => {
    // Find if we are typing inside an HTML tag
    if (formattedText.substr(i, 1) === '<') {
      // Advance to end of tag
      i = formattedText.indexOf('>', i) + 1;
    } else {
      i++;
    }
    
    targetElement.innerHTML = formattedText.slice(0, i);
    
    if (i >= formattedText.length) {
      clearInterval(typingTimer);
    }
    
    // Auto-scroll modal body
    document.querySelector('.modal-body').scrollTop = document.querySelector('.modal-body').scrollHeight;
  }, speed);
}

// 6. Action Button Actions (Exports / Downloads)
function generateAndDownloadCsv() {
  showToast("Compiling review database to CSV...", "info");
  
  setTimeout(() => {
    // Generate CSV string from mockReviews
    const headers = ["ID", "Author", "Platform", "Rating", "Sentiment", "Date", "Category", "ReviewText"];
    const rows = mockReviews.map(r => [
      r.id,
      r.author,
      r.platform,
      r.rating,
      r.sentiment,
      r.date,
      r.category,
      r.text
    ]);
    
    let csvContent = headers.join(",") + "\n" + rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `reviewpulse_export_${new Date().toISOString().split('T')[0]}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast("CSV file successfully downloaded!", "success");
  }, 1200);
}

function exportPdfReport() {
  showToast("Generating comprehensive review report PDF...", "info");
  
  setTimeout(() => {
    showToast("Exporting metrics data to PDF format...", "info");
    setTimeout(() => {
      // Trigger a standard window print setup for modern dashboard print layout
      window.print();
      showToast("PDF report exported successfully!", "success");
    }, 1200);
  }, 1000);
}

// 7. Event Listeners Initialization
function initEventListeners() {
  // Mobile nav toggler
  mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-active');
  });

  // Sidebar navigation switching simulation
  sidebarNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      sidebarNavItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      sidebar.classList.remove('mobile-active');

      const selectedTab = item.getAttribute('data-tab');
      
      // Hide all main view sections
      document.getElementById('dashboardView').style.display = 'none';
      document.getElementById('platformsView').style.display = 'none';
      document.getElementById('settingsView').style.display = 'none';

      // Update UI title or view depending on selection
      if (selectedTab === 'dashboard') {
        document.getElementById('dashboardView').style.display = 'flex';
        document.getElementById('reviewsFeedCard').scrollIntoView({ behavior: 'smooth' });
        showToast("Switched to Dashboard view.");
      } else if (selectedTab === 'reviews') {
        document.getElementById('dashboardView').style.display = 'flex';
        document.getElementById('reviewsFeedCard').scrollIntoView({ behavior: 'smooth' });
        showToast("Filtered view: Reviews Feed");
      } else if (selectedTab === 'insights') {
        document.getElementById('dashboardView').style.display = 'flex';
        document.querySelector('.insights-panel').scrollIntoView({ behavior: 'smooth' });
        showToast("Filtered view: AI Insights");
      } else if (selectedTab === 'platforms') {
        document.getElementById('platformsView').style.display = 'flex';
        showToast("Opened Platforms Connection Manager.");
      } else if (selectedTab === 'settings') {
        document.getElementById('settingsView').style.display = 'flex';
        showToast("Opened System Settings.");
      }
    });
  });

  // Global search input
  globalSearch.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderReviewsList();
  });

  // Download CSV Action
  btnDownloadCsv.addEventListener('click', generateAndDownloadCsv);

  // Export Report Action
  btnExportReport.addEventListener('click', exportPdfReport);

  // Generate AI Summary Action
  btnGenSummary.addEventListener('click', () => {
    // Open Modal
    aiModal.classList.add('active');
    aiLoader.style.display = 'flex';
    aiSummaryContent.style.display = 'none';

    // Simulate AI computing analysis
    setTimeout(() => {
      aiLoader.style.display = 'none';
      runTypewriter(aiSummaryContent, summaryText, 8);
    }, 1500);
  });

  // Close Summary Modal
  const closeModal = () => {
    aiModal.classList.remove('active');
  };
  btnCloseModal.addEventListener('click', closeModal);
  btnDoneSummary.addEventListener('click', closeModal);

  // Copy Summary to Clipboard
  btnCopyToClipboard.addEventListener('click', () => {
    // Clean markdown styling for clipboard copy
    const textToCopy = summaryText.replace(/###/g, '').replace(/\*/g, '');
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast("Summary copied to clipboard!", "success");
    }).catch(err => {
      showToast("Failed to copy text.", "error");
    });
  });

  // Notification panel dropdown toggle
  btnNotifications.addEventListener('click', (e) => {
    e.stopPropagation();
    notificationDropdown.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!notificationDropdown.contains(e.target) && e.target !== btnNotifications) {
      notificationDropdown.classList.remove('active');
    }
  });

  // Mark all notifications read
  btnMarkRead.addEventListener('click', () => {
    notifications.forEach(n => n.read = true);
    renderNotifications();
    showToast("All notifications marked as read.", "success");
  });

  // Platform filtering chips
  const chips = platformChipsContainer.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentPlatform = chip.getAttribute('data-platform');
      
      // Update page title context
      const heading = document.getElementById('pageHeadingTitle');
      if (currentPlatform === 'All') {
        heading.textContent = "ReviewPulse AI Dashboard";
      } else {
        heading.textContent = `ReviewPulse AI: ${currentPlatform}`;
      }

      showToast(`Selected platform filter: ${currentPlatform}`);
      renderDashboard();
    });
  });
}

// 8. Bootstrap Initial State
document.addEventListener('DOMContentLoaded', () => {
  renderNotifications();
  renderDashboard();
  initEventListeners();
  
  // Simulate a new review arriving after 10 seconds to show dynamic sync
  setTimeout(() => {
    const newReview = {
      id: "REV-109",
      author: "Pranav Goel",
      platform: "Amazon",
      rating: 5,
      sentiment: "positive",
      category: "Product Quality",
      text: "Exactly what I wanted. Build quality is rock solid and fits perfectly in the pocket. ReviewPulse synced this in real-time!",
      date: "2026-06-17"
    };
    
    // Add to mockReviews array at beginning
    mockReviews.unshift(newReview);
    
    // Push a notification
    notifications.unshift({
      id: Date.now(),
      text: "New review synced: 5-stars on Amazon by Pranav Goel",
      time: "Just now",
      read: false
    });
    
    // Update notifications and feed
    renderNotifications();
    renderReviewsList();
    
    showToast("Synced 1 new review from Amazon!", "success");
  }, 10000);
});
