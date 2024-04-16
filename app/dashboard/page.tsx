import { selectProfile } from '@/lib/data';

export default async function Page() {
    // const employees = await selectAllEmployees();
    const self = await selectProfile();
    console.log(self);
    return <div>{self?.first_name}</div>;
}
