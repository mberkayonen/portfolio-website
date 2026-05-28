import { describe, it, expect, vi, afterEach } from 'vitest'
import { fetchReadme } from '../fetchReadme'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('fetchReadme', () => {
  it('returns the README text when fetch succeeds', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('# My Project\n\nThis is the readme.'),
    }))

    const result = await fetchReadme('mberkayonen', 'some-repo')

    expect(result).toBe('# My Project\n\nThis is the readme.')
    expect(fetch).toHaveBeenCalledWith(
      'https://raw.githubusercontent.com/mberkayonen/some-repo/main/README.md',
      { next: { revalidate: 86400 } }
    )
  })

  it('returns empty string when the response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      text: () => Promise.resolve(''),
    }))

    const result = await fetchReadme('mberkayonen', 'missing-repo')

    expect(result).toBe('')
  })

  it('returns empty string when fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))

    const result = await fetchReadme('mberkayonen', 'some-repo')

    expect(result).toBe('')
  })
})
