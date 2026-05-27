<?php
session_start();

// Simple auth — change credentials in production
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'salaryuncle@2024');

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_POST['username'] === ADMIN_USER && $_POST['password'] === ADMIN_PASS) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: dashboard.php');
        exit;
    } else {
        $error = 'Invalid credentials. Please try again.';
    }
}

if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in']) {
    header('Location: dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>SalaryUncle Admin Login</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: #0f172a; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
  .card { background: #1e293b; border: 1px solid #334155; border-radius: 24px; padding: 48px; width: 100%; max-width: 420px; }
  .logo { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; justify-content: center; }
  .logo-icon { width: 44px; height: 44px; background: #608D4B; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 18px; }
  .logo-text { font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: 700; color: white; }
  .logo-text span { color: #7aad5e; }
  h2 { text-align: center; color: #f1f5f9; font-size: 20px; margin-bottom: 8px; }
  p.sub { text-align: center; color: #94a3b8; font-size: 14px; margin-bottom: 32px; }
  .field { margin-bottom: 20px; }
  label { display: block; font-size: 13px; font-weight: 500; color: #94a3b8; margin-bottom: 8px; }
  input { width: 100%; background: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 12px 16px; color: #f1f5f9; font-size: 14px; outline: none; transition: border-color 0.2s; }
  input:focus { border-color: #608D4B; }
  .btn { width: 100%; background: #608D4B; color: white; border: none; border-radius: 12px; padding: 14px; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
  .btn:hover { background: #4a6e39; }
  .error { background: #dc262620; border: 1px solid #dc2626; border-radius: 10px; padding: 10px 14px; color: #fca5a5; font-size: 13px; margin-bottom: 20px; }
</style>
</head>
<body>
<div class="card">
  <div class="logo">
    <div class="logo-icon">SU</div>
    <div class="logo-text">Salary<span>Uncle</span></div>
  </div>
  <h2>Admin Login</h2>
  <p class="sub">Sign in to access the dashboard</p>

  <?php if ($error): ?>
    <div class="error"><?= htmlspecialchars($error) ?></div>
  <?php endif; ?>

  <form method="POST">
    <div class="field">
      <label>Username</label>
      <input type="text" name="username" placeholder="admin" required autocomplete="username" />
    </div>
    <div class="field">
      <label>Password</label>
      <input type="password" name="password" placeholder="••••••••" required autocomplete="current-password" />
    </div>
    <button type="submit" class="btn">Sign In →</button>
  </form>
</div>
</body>
</html>
