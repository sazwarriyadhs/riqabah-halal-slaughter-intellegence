export async function fetchDashboardData() {
  const token = localStorage.getItem("riqabah_access_token");
  const response = await fetch("http://localhost:8094/api/v1/dashboard/summary", {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    },
    cache: "no-store"
  });
  if (!response.ok) throw new Error("HTTP " + response.status);
  return response.json();
}
