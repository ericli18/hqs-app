import { AvailabilityTable } from './tables/AvailabilityTable';
import AvailabilityButton from './availabilityForm/AvailabilityButton'

export default function Page() {
    return (
        <div className='flex flex-col gap-4'>
            <AvailabilityButton />
            <AvailabilityTable />
        </div>
    );
}
