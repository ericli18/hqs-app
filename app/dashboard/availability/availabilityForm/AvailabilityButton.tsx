import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import AvailabilityForm  from './AvailabilityForm';

export default async function AvailabilityButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className='max-w-64'>
                    Block out time
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:min-w-max">
                <DialogHeader>
                    <DialogTitle>Add Event</DialogTitle>
                    <DialogDescription>
                        Add a timeslot where you are not available
                    </DialogDescription>
                </DialogHeader>
                <AvailabilityForm />
            </DialogContent>
        </Dialog>
    );
}
