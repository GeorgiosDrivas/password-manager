import { redirect } from 'next/navigation';
import { auth } from '@core/auth';
import SelectedItem from '@/entities/item/ui/selectedItem';
import { prisma } from '@/shared/lib/prisma';
import DashboardComponent from '@/widgets/dashboard';

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const session = await auth();

  if (!session) {
    redirect('/');
  }

  const item = await prisma.item.findUnique({
    where: { id: Number(id), userId: Number(session.user.id) },
  });

  if (!item) {
    redirect('/dashboard');
  }

  return (
    <DashboardComponent>
      <SelectedItem item={item} />
    </DashboardComponent>
  );
}
