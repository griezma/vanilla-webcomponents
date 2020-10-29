export default function html(strings, ...keys) {
    return function(dict) {    
        const result = [strings[0]];
        keys.forEach((k, i) => result.push(dict[k], strings[i + 1]))
        return result.join('');
    }
}
