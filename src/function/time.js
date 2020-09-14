export function setTime(timestamp) {
    const time = new Date(timestamp * 1000);
    const Y = time.getFullYear()
    const M = (time.getMonth() + 1).toString().padStart(2, '0')
    const D = time.getDate().toString().padStart(2, '0')
    const h = time.getHours().toString().padStart(2, '0')
    const m = time.getMinutes().toString().padStart(2, '0')
    const s = time.getSeconds().toString().padStart(2, '0')
    return `${Y}-${M}-${D} ${h}:${m}:${s}`
}


