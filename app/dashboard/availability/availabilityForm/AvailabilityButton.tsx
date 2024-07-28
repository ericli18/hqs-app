import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { UserPlus } from 'lucide-react';
import AvailabilityForm  from './AvailabilityForm';

export default async function AvailabilityButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="bg-green-600 hover:bg-green-700">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Event
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
