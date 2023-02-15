import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function standardDate (dateString: string) {
  return dayjs(dateString).format('MMM DD, YYYY')
}
