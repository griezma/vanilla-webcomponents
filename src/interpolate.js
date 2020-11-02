export default function interpolate(from, to, steps, mapfn) {
    const inc = (to - from) / steps;
    return index => {
        const res = from + (inc * index);
        return mapfn ? mapfn(res) : res;
    }
}

export function interpColor(from, to, steps) {
    return interpolate(from, to, steps, mapColor);
}

export function interpInt(from, to, steps) {
    return interpolate(from, to, steps, Math.round);
}

function mapColor(value) {
    return '#' + Math.round(value).toString(16).padStart(6, '0');
}