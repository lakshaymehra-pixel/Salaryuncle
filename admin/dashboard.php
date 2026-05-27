<?php require_once 'auth.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>SalaryUncle Admin Dashboard</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: #f8fafc; color: #1e293b; display: flex; min-height: 100vh; }

  /* Sidebar */
  .sidebar { width: 260px; background: #0f172a; min-height: 100vh; padding: 24px 0; flex-shrink: 0; }
  .sidebar-logo { display: flex; align-items: center; gap: 10px; padding: 0 24px 24px; border-bottom: 1px solid #1e293b; margin-bottom: 24px; }
  .logo-icon { width: 38px; height: 38px; background: #608D4B; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-family: 'Poppins'; font-weight: 700; font-size: 15px; }
  .logo-text { font-family: 'Poppins'; font-size: 18px; font-weight: 700; color: white; }
  .logo-text span { color: #7aad5e; }
  .nav-section { padding: 0 16px; margin-bottom: 8px; }
  .nav-label { font-size: 10px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.08em; padding: 0 8px 8px; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; color: #94a3b8; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; text-decoration: none; margin-bottom: 2px; }
  .nav-item:hover, .nav-item.active { background: #1e293b; color: white; }
  .nav-item.active { color: #7aad5e; }
  .nav-icon { width: 18px; text-align: center; }

  /* Main */
  .main { flex: 1; display: flex; flex-direction: column; }
  .topbar { background: white; border-bottom: 1px solid #e2e8f0; padding: 16px 28px; display: flex; align-items: center; justify-content: space-between; }
  .topbar-title { font-size: 20px; font-weight: 700; color: #0f172a; font-family: 'Poppins'; }
  .topbar-right { display: flex; align-items: center; gap: 12px; }
  .avatar { width: 38px; height: 38px; background: #608D4B; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; }
  .logout-btn { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; border-radius: 8px; padding: 7px 14px; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; }

  .content { padding: 28px; flex: 1; }

  /* Stats Cards */
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 28px; }
  .stat-card { background: white; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0; }
  .stat-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .stat-label { font-size: 13px; color: #64748b; font-weight: 500; }
  .stat-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .stat-value { font-size: 28px; font-weight: 700; font-family: 'Poppins'; color: #0f172a; }
  .stat-change { font-size: 12px; color: #16a34a; margin-top: 4px; }

  /* Table */
  .panel { background: white; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; margin-bottom: 24px; }
  .panel-header { padding: 18px 24px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; }
  .panel-title { font-size: 16px; font-weight: 700; color: #0f172a; font-family: 'Poppins'; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; padding: 12px 20px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
  td { padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: #f8fafc; }
  .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 500; }
  .badge-pending { background: #fef9c3; color: #854d0e; }
  .badge-approved { background: #dcfce7; color: #166534; }
  .badge-rejected { background: #fee2e2; color: #991b1b; }
  .badge-disbursed { background: #dbeafe; color: #1e40af; }
  .action-btn { padding: 5px 12px; border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer; border: none; }
  .btn-view { background: #eff6ff; color: #2563eb; }
  .btn-approve { background: #f0fdf4; color: #15803d; }
</style>
</head>
<body>

<!-- Sidebar -->
<aside class="sidebar">
  <div class="sidebar-logo">
    <div class="logo-icon">SU</div>
    <div class="logo-text">Salary<span>Uncle</span></div>
  </div>

  <div class="nav-section">
    <div class="nav-label">Main</div>
    <a href="dashboard.php" class="nav-item active">
      <span class="nav-icon">📊</span> Dashboard
    </a>
    <a href="applications.php" class="nav-item">
      <span class="nav-icon">📋</span> Loan Applications
    </a>
    <a href="customers.php" class="nav-item">
      <span class="nav-icon">👥</span> Customers
    </a>
    <a href="disbursements.php" class="nav-item">
      <span class="nav-icon">💸</span> Disbursements
    </a>
  </div>

  <div class="nav-section">
    <div class="nav-label">Analytics</div>
    <a href="reports.php" class="nav-item">
      <span class="nav-icon">📈</span> Reports
    </a>
    <a href="blog.php" class="nav-item">
      <span class="nav-icon">✍️</span> Blog Manager
    </a>
  </div>

  <div class="nav-section">
    <div class="nav-label">Settings</div>
    <a href="settings.php" class="nav-item">
      <span class="nav-icon">⚙️</span> Settings
    </a>
    <a href="logout.php" class="nav-item">
      <span class="nav-icon">🚪</span> Logout
    </a>
  </div>
</aside>

<!-- Main -->
<div class="main">
  <div class="topbar">
    <div class="topbar-title">Dashboard Overview</div>
    <div class="topbar-right">
      <span style="font-size:13px;color:#64748b;"><?= date('D, d M Y') ?></span>
      <div class="avatar">A</div>
      <a href="logout.php" class="logout-btn">Logout</a>
    </div>
  </div>

  <div class="content">
    <!-- Stats -->
    <div class="stats-grid">
      <?php
      $stats = [
        ['label' => 'Total Applications', 'value' => '1,248', 'icon' => '📋', 'color' => '#eff6ff', 'change' => '↑ 12% this month'],
        ['label' => 'Pending Review', 'value' => '87', 'icon' => '⏳', 'color' => '#fef9c3', 'change' => '23 new today'],
        ['label' => 'Approved Loans', 'value' => '943', 'icon' => '✅', 'color' => '#f0fdf4', 'change' => '↑ 8% this month'],
        ['label' => 'Total Disbursed', 'value' => '₹4.2Cr', 'icon' => '💰', 'color' => '#fdf4ff', 'change' => '↑ 15% this month'],
        ['label' => 'Active Customers', 'value' => '2,341', 'icon' => '👥', 'color' => '#fff7ed', 'change' => '+156 this week'],
        ['label' => 'Avg. Loan Amount', 'value' => '₹1.8L', 'icon' => '📊', 'color' => '#f0fdf4', 'change' => 'Stable'],
      ];
      foreach ($stats as $s): ?>
      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-label"><?= $s['label'] ?></span>
          <div class="stat-icon" style="background:<?= $s['color'] ?>;"><?= $s['icon'] ?></div>
        </div>
        <div class="stat-value"><?= $s['value'] ?></div>
        <div class="stat-change"><?= $s['change'] ?></div>
      </div>
      <?php endforeach; ?>
    </div>

    <!-- Recent Applications -->
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title">Recent Loan Applications</span>
        <a href="applications.php" style="font-size:13px;color:#608D4B;font-weight:500;">View All →</a>
      </div>
      <table>
        <thead>
          <tr>
            <th>App. ID</th>
            <th>Customer</th>
            <th>Loan Type</th>
            <th>Amount</th>
            <th>Applied On</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php
          $applications = [
            ['SU-20240101', 'Rajesh Kumar', 'Salary Advance', '₹2,00,000', '27 May 2026', 'pending'],
            ['SU-20240102', 'Priya Sharma', 'Medical Loan', '₹1,50,000', '27 May 2026', 'approved'],
            ['SU-20240103', 'Amit Patel', 'Personal Loan', '₹3,00,000', '26 May 2026', 'disbursed'],
            ['SU-20240104', 'Sunita Rao', 'Education Loan', '₹5,00,000', '26 May 2026', 'pending'],
            ['SU-20240105', 'Vikram Singh', 'Home Renovation', '₹2,50,000', '25 May 2026', 'approved'],
            ['SU-20240106', 'Meena Joshi', 'Travel Loan', '₹75,000', '25 May 2026', 'rejected'],
            ['SU-20240107', 'Rohit Bansal', 'Salary Advance', '₹1,00,000', '24 May 2026', 'disbursed'],
          ];
          $badge_map = [
            'pending' => 'badge-pending',
            'approved' => 'badge-approved',
            'rejected' => 'badge-rejected',
            'disbursed' => 'badge-disbursed',
          ];
          foreach ($applications as $app): ?>
          <tr>
            <td><strong><?= $app[0] ?></strong></td>
            <td><?= htmlspecialchars($app[1]) ?></td>
            <td><?= $app[2] ?></td>
            <td><strong><?= $app[3] ?></strong></td>
            <td><?= $app[4] ?></td>
            <td><span class="badge <?= $badge_map[$app[5]] ?>"><?= ucfirst($app[5]) ?></span></td>
            <td>
              <button class="action-btn btn-view" onclick="alert('View details for <?= $app[0] ?>')">View</button>
              <?php if ($app[5] === 'pending'): ?>
              <button class="action-btn btn-approve" onclick="alert('Approve <?= $app[0] ?>')" style="margin-left:4px;">Approve</button>
              <?php endif; ?>
            </td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>

    <!-- Quick Actions -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
      <div class="panel">
        <div class="panel-header"><span class="panel-title">Pending Actions</span></div>
        <div style="padding:20px;">
          <?php
          $actions = [
            ['Documents pending verification', '12 applications', '#fef9c3'],
            ['EMI defaulters follow-up', '5 customers', '#fee2e2'],
            ['New blog posts to review', '2 drafts', '#eff6ff'],
            ['Interest rate update pending', 'Admin approval', '#f0fdf4'],
          ];
          foreach ($actions as $a): ?>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:<?= $a[2] ?>;border-radius:10px;margin-bottom:8px;">
            <span style="font-size:13px;color:#334155;"><?= $a[0] ?></span>
            <span style="font-size:12px;font-weight:600;color:#0f172a;"><?= $a[1] ?></span>
          </div>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header"><span class="panel-title">Today's Summary</span></div>
        <div style="padding:20px;">
          <?php
          $summary = [
            ['New Applications', '23'],
            ['Approved Today', '18'],
            ['Disbursed Today', '₹42 Lakhs'],
            ['Calls Resolved', '67'],
            ['New Customers', '31'],
          ];
          foreach ($summary as $s): ?>
          <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f1f5f9;">
            <span style="font-size:13px;color:#64748b;"><?= $s[0] ?></span>
            <span style="font-size:14px;font-weight:600;color:#0f172a;"><?= $s[1] ?></span>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</div>

</body>
</html>
