export async function handler(event) {
  try {
    const siteId = process.env.SITE_ID; 
    const token = process.env.NETLIFY_AUTH_TOKEN; 

    // 1. Obtener todos los forms
    const formsRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/forms`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const forms = await formsRes.json();

    // 2. Submissions por form
    const result = {};
    for (let form of forms) {
      const subsRes = await fetch(`https://api.netlify.com/api/v1/forms/${form.id}/submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const submissions = await subsRes.json();
      result[form.name] = submissions;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
}