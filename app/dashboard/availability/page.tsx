import { AvailabilityTable } from './tables/AvailabilityTable';
import AvailabilityButton from './availabilityForm/AvailabilityButton'

export default function Page() {
    return (
        <div>
            <AvailabilityButton />
            <AvailabilityTable />
        </div>
    );
}
