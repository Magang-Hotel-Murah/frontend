export const meetingLayout = {
    calculateMeetingColumns: (dayMeetings) => {
        if (dayMeetings.length === 0) return [];

        const sorted = [...dayMeetings].sort((a, b) => a.startTime - b.startTime);
        const result = [];
        let group = [];
        let currentEnd = null;

        sorted.forEach((meeting) => {
            if (!currentEnd || meeting.startTime < currentEnd) {
                group.push(meeting);
                currentEnd = currentEnd
                    ? new Date(Math.max(currentEnd, meeting.endTime))
                    : meeting.endTime;
            } else {
                meetingLayout.assignColumnsToGroup(group);
                result.push(...group);
                group = [meeting];
                currentEnd = meeting.endTime;
            }
        });

        if (group.length > 0) {
            meetingLayout.assignColumnsToGroup(group);
            result.push(...group);
        }

        return result;
    },

    assignColumnsToGroup: (group) => {
        const columns = [];

        group.forEach((meeting) => {
            let columnIndex = 0;
            let placed = false;

            while (!placed) {
                const conflict = columns[columnIndex]?.some((existing) => {
                    return !(
                        meeting.endTime <= existing.startTime ||
                        meeting.startTime >= existing.endTime
                    );
                });

                if (!conflict) {
                    if (!columns[columnIndex]) columns[columnIndex] = [];
                    columns[columnIndex].push(meeting);
                    meeting.column = columnIndex;
                    placed = true;
                } else {
                    columnIndex++;
                }
            }
        });

        group.forEach((m) => (m.totalColumns = columns.length));
    },

    calculateMeetingPosition: (meeting) => {
        const startHour = meeting.startTime.getHours();
        const startMinute = meeting.startTime.getMinutes();
        const endHour = meeting.endTime.getHours();
        const endMinute = meeting.endTime.getMinutes();

        const top = ((startHour - 0) * 60 + startMinute);
        const duration = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute));

        return { top, height: duration };
    }
};