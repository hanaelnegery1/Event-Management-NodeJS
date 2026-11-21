async function main() {
  const publicUrl = (process.argv[2] || "").replace(/\/$/, "");
  if (!publicUrl) {
    console.error("Usage: npm run race -- <public-event-url>");
    console.error("Example: npm run race -- http://localhost:3000/e/my-event-123456");
    process.exit(1);
  }

  console.log(`Sending 20 registrations at the same moment to ${publicUrl}`);

  const requests = Array.from({ length: 20 }, (_, index) => {
    const body = new URLSearchParams({
      name: `Race User ${index + 1}`,
      email: `race${Date.now()}-${index + 1}@example.com`,
    });

    return fetch(`${publicUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      redirect: "manual",
    }).then(async (response) => ({
      status: response.status,
      location: response.headers.get("location"),
    }));
  });

  const results = await Promise.all(requests);
  const confirmed = results.filter((result) => result.status === 302 && result.location?.endsWith("/confirmed")).length;
  const full = results.filter((result) => result.status === 409).length;

  console.log(`Confirmed: ${confirmed}`);
  console.log(`Full/duplicate rejected: ${full}`);
  console.log(`Other responses: ${results.length - confirmed - full}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
