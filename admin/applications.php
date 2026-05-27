<?php require_once 'auth.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Loan Applications — SalaryUncle Admin</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: #f8fafc; color: #1e293b; display: flex; min-height: 100vh; }
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
  .main { flex: 1; display: flex; flex-direction: column; }
  .topbar { background: white; border-bottom: 1px solid #e2e8f0; padding: 16px 28px; display: flex; align-items: center; justify-content: space-between; }
  .topbar-title { font-size: 20px; font-weight: 700; color: #0f172a; font-family: 'Poppins'; }
  .logout-btn { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; border-radius: 8px; padding: 7px 14px; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; }
  .content { padding: 28px; }
  .filters { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
  .filter-btn { padding: 7px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; border: 1px solid #e2e8f0; background: white; cursor: pointer; color: #475569; transition: all 0.2s; }
  .filter-btn.active { background: #608D4B; color: white; border-color: #608D4B; }
  .search-bar { flex: 1; min-width: 200px; padding: 8px 16px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none; }
  .panel { background: white; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
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
  .action-btn { padding: 5px 12px; border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer; border: none; margin-right: 4px; }
  .btn-view { background: #eff6ff; color: #2563eb; }
  .btn-approve { background: #f0fdf4; color: #15803d; }
  .btn-reject { background: #fef2f2; color: #dc2626; }
</style>
</head>
<body>
<aside class="sidebar">
  <div class="sidebar-logo">
    <div class="logo-icon">SU</div>
    <div class="logo-text">Salary<span>Uncle</span></div>
  </div>
  <div class="nav-section">
    <div class="nav-label">Main</div>
    <a href="dashboard.php" class="nav-item">📊 Dashboard</a>
    <a href="applications.php" class="nav-item active">📋 Loan Applications</a>
    <a href="customers.php" class="nav-item">👥 Customers</a>
    <a href="disbursements.php" class="nav-item">💸 Disbursements</a>
  </div>
  <div class="nav-section">
    <div class="nav-label">Analytics</div>
    <a href="reports.php" class="nav-item">📈 Reports</a>
    <a href="blog.php" class="nav-item">✍️ Blog Manager</a>
  </div>
  <div class="nav-section">
    <div class="nav-label">Settings</div>
    <a href="settings.php" class="nav-item">⚙️ Settings</a>
    <a href="logout.php" class="nav-item">🚪 Logout</a>
  </div>
</aside>

<div class="main">
  <div class="topbar">
    <div class="topbar-title">Loan Applications</div>
    <a href="logout.php" class="logout-btn">Logout</a>
  </div>

  <div class="content">
    <div class="filters">
      <button class="filter-btn active">All (1,248)</button>
      <button class="filter-btn">Pending (87)</button>
      <button class="filter-btn">Approved (943)</button>
      <button class="filter-btn">Disbursed (856)</button>
      <button class="filter-btn">Rejected (218)</button>
      <input class="search-bar" type="search" placeholder="Search by name, ID, or phone..." />
    </div>

    <div class="panel">
      <table>
        <thead>
          <tr>
            <th>App. ID</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Loan Type</th>
            <th>Amount</th>
            <th>Employer</th>
            <th>Salary</th>
            <th>Applied On</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php
          $apps = [
            ['SU-20240101', 'Rajesh Kumar', '9812345678', 'Salary Advance', '₹2,00,000', 'TCS Ltd.', '₹55,000', '27 May 2026', 'pending'],
            ['SU-20240102', 'Priya Sharma', '9876543210', 'Medical Loan', '₹1,50,000', 'Infosys', '₹48,000', '27 May 2026', 'approved'],
            ['SU-20240103', 'Amit Patel', '9823456789', 'Personal Loan', '₹3,00,000', 'Wipro', '₹72,000', '26 May 2026', 'disbursed'],
            ['SU-20240104', 'Sunita Rao', '9845678901', 'Education Loan', '₹5,00,000', 'Govt. School', '₹35,000', '26 May 2026', 'pending'],
            ['SU-20240105', 'Vikram Singh', '9856789012', 'Home Renovation', '₹2,50,000', 'HDFC Bank', '₹90,000', '25 May 2026', 'approved'],
            ['SU-20240106', 'Meena Joshi', '9867890123', 'Travel Loan', '₹75,000', 'Accenture', '₹62,000', '25 May 2026', 'rejected'],
            ['SU-20240107', 'Rohit Bansal', '9878901234', 'Salary Advance', '₹1,00,000', 'Amazon', '₹1,20,000', '24 May 2026', 'disbursed'],
            ['SU-20240108', 'Deepa Nair', '9889012345', 'Wedding Loan', '₹4,00,000', 'Cognizant', '₹68,000', '24 May 2026', 'pending'],
          ];
          $bm = ['pending' => 'badge-pending', 'approved' => 'badge-approved', 'rejected' => 'badge-rejected', 'disbursed' => 'badge-disbursed'];
          foreach ($apps as $a): ?>
          <tr>
            <td><strong><?= $a[0] ?></strong></td>
            <td><?= htmlspecialchars($a[1]) ?></td>
            <td><?= $a[2] ?></td>
            <td><?= $a[3] ?></td>
            <td><strong><?= $a[4] ?></strong></td>
            <td><?= $a[5] ?></td>
            <td><?= $a[6] ?></td>
            <td><?= $a[7] ?></td>
            <td><span class="badge <?= $bm[$a[8]] ?>"><?= ucfirst($a[8]) ?></span></td>
            <td>
              <button class="action-btn btn-view">View</button>
              <?php if ($a[8] === 'pending'): ?>
              <button class="action-btn btn-approve">Approve</button>
              <button class="action-btn btn-reject">Reject</button>
              <?php endif; ?>
            </td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
</body>
</html>
