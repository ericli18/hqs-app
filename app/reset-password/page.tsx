import ResetForm from './passwordForm';
import { selectProfile } from '@/lib/data';
import { redirect } from 'next/navigation';

const Page = async () => {
    const user = await selectProfile();
    if (!user) {
        redirect('/login');
    }
    return (
        <div className="grid min-h-screen place-items-center">
            <ResetForm />
        </div>
    );
};

export default Page;
