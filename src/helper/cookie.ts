const cookie = {
  read: function(key: string): string | null {
    const reg = new RegExp('(^|;\\s*)(' + key + ')=([^;]*)')
    const match = document.cookie.match(reg)
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
