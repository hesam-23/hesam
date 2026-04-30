// داده اصلی
const data = { users: 125, comments: 342, orders: 87 };

// داده‌های فیک برای فیلتر
const fakeData = {
  day: { users: 5, comments: 12, orders: 3 },
  week: { users: 35, comments: 78, orders: 21 },
  month: { users: 125, comments: 342, orders: 87 }
};

// المان‌ها
const loading = document.getElementById('loading');
const dashboard = document.querySelector('.dashboard');
const usersCount = document.querySelector('#users-card .count');
const commentsCount = document.querySelector('#comments-card .count');
const ordersCount = document.querySelector('#orders-card .count');
const buttons = document.querySelectorAll('.controls button[data-period]');
const refreshBtn = document.getElementById('refresh');
const darkModeBtn = document.getElementById('darkmode');

// شبیه‌سازی Loading
dashboard.style.display = 'none';
setTimeout(() => {
  loading.style.display = 'none';
  dashboard.style.display = 'grid';
}, 1000);

// نمودار اولیه
const chartData = {
  labels: ['Users', 'Comments', 'Orders'],
  datasets: [{
    label: 'Statistics',
    data: [data.users, data.comments, data.orders],
    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc']
  }]
};

const config = { type: 'bar', data: chartData, options: { responsive: true, plugins: { legend: { display: false } } } };
const myChart = new Chart(document.getElementById('myChart'), config);

// به‌روز کردن داشبورد
function updateDashboard(period = 'month') {
  const d = fakeData[period];

  // انیمیشن ملایم
  [usersCount, commentsCount, ordersCount].forEach(el => {
    el.style.transform = 'scale(1.2)';
    setTimeout(() => { el.style.transform = 'scale(1)'; }, 300);
  });

  usersCount.textContent = d.users;
  commentsCount.textContent = d.comments;
  ordersCount.textContent = d.orders;

  // نمودار
  myChart.data.datasets[0].data = [d.users, d.comments, d.orders];
  myChart.update();
}

// Event دکمه‌ها
buttons.forEach(btn => btn.addEventListener('click', () => updateDashboard(btn.getAttribute('data-period'))));

// Refresh
refreshBtn.addEventListener('click', () => {
  const currentPeriod = document.querySelector('.controls button.active')?.getAttribute('data-period') || 'month';
  updateDashboard(currentPeriod);
});

// Dark Mode
darkModeBtn.addEventListener('click', () => document.body.classList.toggle('dark-mode'));

// بارگذاری اولیه
updateDashboard('month');