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
import { SignupForm } from './SignupForm';

export function InviteButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="bg-green-600 hover:bg-green-700">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Employee
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Employee</DialogTitle>
                    <DialogDescription>
                        Enter employee information here. Click invite when you are done.
                    </DialogDescription>
                </DialogHeader>
                <SignupForm />
            </DialogContent>
        </Dialog>
    );
}
