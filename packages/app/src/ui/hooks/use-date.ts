import dayjs from 'dayjs'

export function useDate() {
  function format(date: Date) {
    return dayjs(date).format('DD/MM/YYYY HH:MM')
  }

  return {
    format,
  }
}
