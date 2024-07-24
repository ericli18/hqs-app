import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';


type ShiftTimeTemplate = {
    startTime: string;
    endTime: string;
};

type ShiftDataStructure = {
    [location: string]: ShiftTimeTemplate[];
};

export const timeTemplate: ShiftDataStructure = {
    Fremont: [
        { startTime: '05:30', endTime: '14:00' },
        { startTime: '13:30', endTime: '22:00' },
        { startTime: '21:30', endTime: '06:00' },
        { startTime: '18:00', endTime: '00:30' },
        { startTime: '00:00', endTime: '06:00' },
    ],
    Livermore: [
        { startTime: '06:00', endTime: '14:30' },
        { startTime: '14:00', endTime: '22:30' },
        { startTime: '22:00', endTime: '06:30' },
    ],
    Lathrop: [
        { startTime: '06:00', endTime: '14:30' },
        { startTime: '14:00', endTime: '22:30' },
        { startTime: '22:00', endTime: '06:30' },
    ],
    GFTX: [
        { startTime: '03:00', endTime: '15:00' },
        { startTime: '05:30', endTime: '15:30' },
        { startTime: '17:45', endTime: '05:45' },
        { startTime: '18:00', endTime: '06:00' },
    ],
    Kyle: [
        { startTime: '06:00', endTime: '17:30' },
        { startTime: '18:00', endTime: '05:30' },
    ],
};

export default function Templates({
    locations,
    watchLocation,
    setValue,
}: {
    locations: { label: string; value: number }[];
    watchLocation: number;
    setValue: (name: 'startTime' | 'endTime', value: string, config?: object) => void;
}) {
    const { label: locationName }: { label?: string; value?: number } =
        locations.find((location) => location.value === watchLocation) || {};

    let shiftsForLocation: Array<{ startTime: string; endTime: string }> = [];

    if (locationName && locationName in timeTemplate) {
        shiftsForLocation = timeTemplate[locationName];
    } else {
        console.log('No shifts found for the selected location');
    }
    return (
        <ul>
            <h2 className="text-lg">Use a template to fill in the time</h2>
            {shiftsForLocation.map((template) => {
                const startDate = dayjs('1970-01-01T' + template.startTime);
                const endDate = dayjs('1970-01-01T' + template.endTime);
                return (
                    <li
                        className="mt-4 grid grid-cols-2 items-center gap-4 text-sm"
                        key={startDate.format() + endDate.format()}
                    >
                        <p>
                            {dayjs(startDate).format('hh:mm A')} - {dayjs(endDate).format('hh:mm A')}
                        </p>
                        <Button
                            onClick={() => {
                                setValue('startTime', template.startTime);
                                setValue('endTime', template.endTime);
                            }}
                            variant="outline"
                        >
                            Use this template
                        </Button>
                    </li>
                );
            })}
        </ul>
    );
}
