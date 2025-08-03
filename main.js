// Cargar lista de artículos
fetch('posts/index.json')
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById("lista-articulos");
    posts.forEach(post => {
      const div = document.createElement("div");
      div.innerHTML = `<a href="articulo.html#posts/${post.file}"><h3>${post.title}</h3><p>${post.date}</p></a>`;
      container.appendChild(div);
    });
  });
