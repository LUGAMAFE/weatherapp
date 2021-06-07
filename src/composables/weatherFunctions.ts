import dayjs from 'dayjs'

export function tempScale(value: number, scale: string) {
    return (scale == 'C') ? value : Number(((value * 9/5) + 32).toFixed(1))
}

export function dayWeek(value: string, pos: number) {
    return ((pos == 0) ? `TODAY, ${dayjs.unix(+value).format('MMM DD')}` : dayjs.unix(+value).format('ddd, MMM DD')).toUpperCase();
}

export function dayWeekFullname(value: string, pos: number) {
    return ((pos == 0) ? `TODAY, ${dayjs.unix(+value).format('MMM DD')}` : dayjs.unix(+value).format('dddd, MMM DD')).toUpperCase();
}

export function hourFromDayTime(value: string) {
    return `${dayjs.unix(+value).format('h a')}`;
}