const formatToAMPM = (time: string | Date) => {
  if (typeof time === 'string') {
    const [hours, minutes] = time.split(':').map(Number)

    const date = new Date()
    date.setHours(hours)
    date.setMinutes(minutes)

    return date.toLocaleTimeString('en-AU', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  return time.toLocaleTimeString('en-AU', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}
