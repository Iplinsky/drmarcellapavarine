document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('formulario');
  if (!form) return;

  const toast = document.getElementById('toast');
  const spinner = form.querySelector('.spinner');
  const btnText = form.querySelector('.btn-text');

  function showToast(message, success = true) {
    toast.textContent = message;
    toast.style.backgroundColor = success ? '#28a745' : '#dc3545';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!data.nome || !data.email || !data.mensagem) {
      showToast('Por favor, preencha todos os campos.', false);
      return;
    }

    spinner.style.display = 'inline-block';
    btnText.style.display = 'none';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showToast('Mensagem enviada com sucesso!', true);
        form.reset();
      } else {
        showToast('Erro ao enviar. Tente novamente mais tarde.', false);
      }
    } catch (err) {
      showToast('Erro de conexão. Verifique sua internet.', false);
    } finally {
      spinner.style.display = 'none';
      btnText.style.display = 'inline';
    }
  });
});
