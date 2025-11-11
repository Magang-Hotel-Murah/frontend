export const dateUtils = {
    formatTime: (date) => {
        return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
    },

    formatDate: (date) => {
        return date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    },

    getDayName: (date) => {
        const days = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];
        return days[date.getDay()];
    },

    getFullDayName: (date) => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        return days[date.getDay()];
    },

    getMonthName: (date) => {
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        return months[date.getMonth()];
    },

    isToday: (date) => {
        if (!date) return false;
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    },

    isTomorrow: (date) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return date.getDate() === tomorrow.getDate() &&
            date.getMonth() === tomorrow.getMonth() &&
            date.getFullYear() === tomorrow.getFullYear();
    },

    isSameDay: (date1, date2) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    },

    getWeekDays: (baseDate) => {
        const dayOfWeek = baseDate.getDay();
        const monday = new Date(baseDate);
        monday.setDate(baseDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            days.push({
                day: dateUtils.getDayName(date),
                fullDay: dateUtils.getFullDayName(date),
                date: date.getDate(),
                fullDate: date,
                isToday: dateUtils.isToday(date)
            });
        }
        return days;
    },

    getCalendarDays: (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    }
};