---
layout: layout.njk
title: "Blog"
---

<h1>Artículos</h1>

<div class="grid">
  {% for post in collections.articulos | reverse %}
    <div class="card">
      <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
      <p><small>{{ post.date | date: "%d/%m/%Y" }}</small></p>
      <p>{{ post.templateContent | strip_html | truncate: 160 }}</p>
      <a class="leer-mas" href="{{ post.url }}">Leer más →</a>
    </div>
  {% endfor %}
</div>
