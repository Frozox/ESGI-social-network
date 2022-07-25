export const whenPatternMatches = (string: string, patterns: Array<[RegExp, Function]>) => {
    const foundPattern = patterns.find(([pattern]) => pattern.exec(string));

    if (foundPattern) {
        const [, effect] = foundPattern;
        effect();
    }
}
export const getUserNameById = (id: number, members: Array<{ id: number, firstname: string, lastname: string }>) => {
    const foundName = members.find(({ id: nameId }) => nameId === id);

    if (foundName) {
        return `${foundName.firstname} ${foundName.lastname}`;
    }

    return '';
}

export const webAnalytics = ({ dataToSend }: any) => {
    if (!navigator.sendBeacon) return true
    // URL to send the data to, e.g.
    let url = 'http://localhost:3000/chat';

    let startTime = performance.now()

    // Data to send
    let data = new FormData();
    data.append('start', startTime.toString());
    data.append('end', performance.now().toString());
    data.append('data', dataToSend);
    data.append('url', document.URL);

    // Let's go!
    navigator.sendBeacon(url, data);
}
