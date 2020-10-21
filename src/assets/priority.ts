export const Priority = {
    NORMAL: 3,
    HIGH: 5,
    VERY_HIGH: 8
};

export function priorityText(value: number): string {
    switch (value) {
        case Priority.NORMAL: return 'normal';
        case Priority.HIGH: return 'deseable';
        case Priority.VERY_HIGH: return 'muy deseable';
    }
}