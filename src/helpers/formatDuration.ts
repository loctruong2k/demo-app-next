import moment from "moment";

export const formatTimeline = (timestamp: string, currentDate?: string) => {
    const now = currentDate ? moment(currentDate) : moment();
    const inputMoment = moment(timestamp);

    const duration = moment.duration(now.diff(inputMoment));
    const minutes = duration.asMinutes();
    const hours = duration.asHours();
    const days = duration.asDays();

    if (minutes < 1) {
        return 'Vừa mới';
    } else if (minutes < 60) {
        return `${Math.floor(minutes)} phút trước`;
    } else if (hours < 24) {
        return `${Math.floor(hours)} giờ trước`;
    } else if (days < 7) {
        return `${Math.floor(days)} ngày trước`;
    } else {
        return inputMoment.format('DD/MM/YYYY HH:mm');
    }
};