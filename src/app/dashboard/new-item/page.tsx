import { redirect } from 'next/navigation';
import NewItem from '@/entities/item/ui/newItem';
import { auth } from '@core/auth';
import DashboardComponent from '@/components/dashboard';

export default async function NewItemPage() {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <DashboardComponent>
      <NewItem userId={session.user.id} />
    </DashboardComponent>
  );
}
