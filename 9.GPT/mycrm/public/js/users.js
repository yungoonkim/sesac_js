
fetch('/api/users')
  .then(r => r.json())
  .then(data => {
    const tbody = document.querySelector('tbody');
    data.forEach(u => {
      tbody.innerHTML += `<tr><td>${u.Id}</td><td>${u.Name}</td><td>${u.Gender}</td></tr>`;
    });
  });
