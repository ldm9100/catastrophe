export const DateTime = (() => {

    function getRelativeTimeString(isoString?: string): string {
        if (!isoString) return ''

        const now = new Date();
        const past = new Date(isoString);
        const diffMs = now.getTime() - past.getTime();

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (seconds < 60) return `${seconds}초 전`;
        if (minutes < 60) return `${minutes}분 전`;
        if (hours < 24) return `${hours}시간 전`;
        if (days < 30) return `${days}일 전`;
        if (months < 12) return `${months}달 전`;
        return `${years}년 전`;
    }

    function getColorByTime(isoString: string): string {
        const now = new Date();
        const past = new Date(isoString);
        const diffMs = now.getTime() - past.getTime();

        const oneHour = 1000 * 60 * 60;
        const oneDay = 1000 * 60 * 60 * 24;

        if (diffMs < oneHour) return 'red';
        if (diffMs < oneDay) return 'orange';
        return 'gray';
    }

    return Object.freeze({
        getRelativeTimeString,
        getColorByTime,
    })
})()
