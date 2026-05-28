// src/lib/fetchReadme.ts
export async function fetchReadme(owner: string, repo: string): Promise<string> {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return ''
    return res.text()
  } catch {
    return ''
  }
}
