export async function handler(event) {
  try {
    const siteId = process.env.NETLIFY_SITE_ID;
    const token = process.env.NETLIFY_AUTH_TOKEN;

    if (!siteId || !token) {
      throw new Error("❌ Faltan NETLIFY_SITE_ID o NETLIFY_AUTH_TOKEN");
    }

    // Obtener los formularios
    const formsRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/forms`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!formsRes.ok) {
      throw new Error(`Error al obtener forms: ${formsRes.status} ${formsRes.statusText}`);
    }

    const forms = await formsRes.json();

    const result = {};
    for (let form of forms) {
      const subsRes = await fetch(`https://api.netlify.com/api/v1/forms/${form.id}/submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!subsRes.ok) {
        throw new Error(`Error al obtener submissions del form ${form.name}: ${subsRes.status} ${subsRes.statusText}`);
      }

      const submissions = await subsRes.json();

      // Aseguramos que sea array
      result[form.name] = Array.isArray(submissions) ? submissions : [];
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    console.error("❌ Error en get-submissions:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}

