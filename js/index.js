const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm_password');
const passwordStatus = document.getElementById('stats-password');
const passwordStrengthBar = document.getElementById('force-password');
const submitBtn = document.getElementById('submitBtn');
const birthInput = document.getElementById('birth');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');

passwordInput.addEventListener('input', () => {
  updatePasswordStrength();
  checkPasswordMatch();
});

confirmPasswordInput.addEventListener('input', checkPasswordMatch);

function togglePasswordVisibility(event) {
  event.preventDefault();

  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  togglePasswordBtn.innerHTML = isHidden ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>';
}

// Mostrar/esconder senha de confirmação
function toggleConfirmPasswordVisibility(event) {
  event.preventDefault();

  const btn = event.currentTarget;
  const isHidden = confirmPasswordInput.type === 'password';
  confirmPasswordInput.type = isHidden ? 'text' : 'password';
  btn.innerHTML = isHidden ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>';
}

function updatePasswordStrength() {
  const password = passwordInput.value;
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[@$!%*?&]/.test(password)) strength++;

  const colors = ['red', 'red', 'orange', 'gold', 'green'];
  const widths = ['25%', '25%', '50%', '75%', '100%'];

  passwordStrengthBar.innerHTML = '';

  if (strength > 0) {
    const bar = document.createElement('div');
    bar.style.width = widths[strength - 1];
    bar.style.height = '8px';
    bar.style.backgroundColor = colors[strength - 1];
    bar.style.borderRadius = '4px';
    passwordStrengthBar.appendChild(bar);
  }
}

function checkPasswordMatch() {
  const match = passwordInput.value === confirmPasswordInput.value && confirmPasswordInput.value.length > 0;

  passwordStatus.textContent = match ? '✔ Senhas conferem' : '✖ Senhas não conferem';
  passwordStatus.style.color = match ? 'green' : 'red';
}

function validatePassword(password) {
  const lengthOk = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return lengthOk && hasUpper && hasLower && hasNumber && hasSymbol;
}

function handleSubmit(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const birth = birthInput.value;

  const message = document.getElementById('message');

  if (!name || !email || !password || !confirmPassword || !birth) {
    message.textContent = 'Por favor, preencha todos os campos.';
    message.style.color = 'red';
    return;
  }

  if (password.length < 8 || !validatePassword(password)) {
    message.textContent =
      'A senha deve ter no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e símbolo.';
    message.style.color = 'red';
    return;
  }

  if (password !== confirmPassword) {
    message.textContent = 'As senhas não conferem.';
    message.style.color = 'red';
    return;
  }

  // Salva no sessionStorage
  const userData = { name, email, birth };
  sessionStorage.setItem('registration', JSON.stringify(userData));

  // Redireciona
  window.location.href = 'perfil.html';
  resetForm()
}

function resetForm() {
  nameInput.value = '';
  emailInput.value = '';
  birthInput.value = '';
  passwordInput.value = '';
  confirmPasswordInput.value = '';
  passwordStrengthBar.innerHTML = '';
  passwordStatus.textContent = '';
  passwordStatus.style.color = '';
  togglePasswordBtn.textContent = 'Mostrar';
  passwordInput.type = 'password';
  confirmPasswordInput.type = 'password';
  btn.textContent = 'Mostrar';
}
